// src/index.ts
import KoaRouter from "koa-router";
import fs from "fs";
import path from "path";
function getAllDirs(rootPath, target = []) {
  const files = fs.readdirSync(rootPath);
  for (let i = 0; i < files.length; i++) {
    const fullPath = path.join(rootPath, files[i]);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory() && !fullPath.includes("node_module")) {
      target.push(fullPath);
      getAllDirs(fullPath, target);
    }
  }
  return target;
}
function src_default(app) {
  const rootPath = process.cwd();
  const allDirPath = getAllDirs(rootPath);
  const routerPath = allDirPath.find((item, index) => {
    return /router\b/.test(item);
  });
  const routerDirs = fs.readdirSync(routerPath, { encoding: "utf-8" });
  routerDirs.forEach((dir) => {
    const _router = new KoaRouter({ prefix: `/${dir}` });
    const routers = fs.readdirSync(`${routerPath}/${dir}`, { encoding: "utf-8" });
    routers.forEach(async (router) => {
      const fn = await import(`${routerPath}/${dir}/${router}`);
      router = router.replace(/.ts/, "");
      if (Array.isArray(fn.default)) {
        _router[router]("/", ...fn.default);
      } else if (typeof fn.default === "function") {
        _router[router]("/", fn.default);
      }
    });
    app.use(_router.routes());
  });
}
export {
  src_default as default
};
