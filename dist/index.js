"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  default: () => src_default
});
module.exports = __toCommonJS(src_exports);
var import_koa_router = __toESM(require("koa-router"));
var import_fs = __toESM(require("fs"));
var import_path = __toESM(require("path"));
function getAllDirs(rootPath, target = []) {
  const files = import_fs.default.readdirSync(rootPath);
  for (let i = 0; i < files.length; i++) {
    const fullPath = import_path.default.join(rootPath, files[i]);
    const stat = import_fs.default.statSync(fullPath);
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
  const routerDirs = import_fs.default.readdirSync(routerPath, { encoding: "utf-8" });
  routerDirs.forEach((dir) => {
    const _router = new import_koa_router.default({ prefix: `/${dir}` });
    const routers = import_fs.default.readdirSync(`${routerPath}/${dir}`, { encoding: "utf-8" });
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
