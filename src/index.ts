import Koa from 'koa';
import KoaRouter from 'koa-router';

import fs from 'fs';
import path from 'path';

function getAllDirs(rootPath: string, target: any = []): any {
  // root dirs&files
  const files = fs.readdirSync(rootPath);

  // each find all dir
  for (let i = 0; i < files.length; i++) {
    const fullPath = path.join(rootPath, files[i]);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory() && !fullPath.includes('node_module')) {
      target.push(fullPath);
      getAllDirs(fullPath, target);
    }
  }

  // root dirs
  return target;
}

export default function (app: Koa) {
  const rootPath = process.cwd();

  const allDirPath: [] = getAllDirs(rootPath);

  //find roter dir
  const routerPath: any = allDirPath.find((item: any, index: number) => {
    return /router\b/.test(item);
  });

  const routerDirs = fs.readdirSync(routerPath, { encoding: 'utf-8' });

  // init router
  routerDirs.forEach((dir) => {
    const _router: any = new KoaRouter({ prefix: `/${dir}` });

    const routers = fs.readdirSync(`${routerPath}/${dir}`, { encoding: 'utf-8' });

    routers.forEach(async (router) => {
      const fn = await import(`${routerPath}/${dir}/${router}`);

      router = router.replace(/.ts/, '');
      if (Array.isArray(fn.default)) {
        _router[router]('/', ...fn.default);
      } else if (typeof fn.default === 'function') {
        _router[router]('/', fn.default);
      }
    });

    app.use(_router.routes());
  });
}
