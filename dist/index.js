"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_router_1 = __importDefault(require("koa-router"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function getAllDirs(rootPath, target = []) {
    const files = fs_1.default.readdirSync(rootPath);
    for (let i = 0; i < files.length; i++) {
        const fullPath = path_1.default.join(rootPath, files[i]);
        const stat = fs_1.default.statSync(fullPath);
        if (stat.isDirectory() && !fullPath.includes('node_module')) {
            target.push(fullPath);
            getAllDirs(fullPath, target);
        }
    }
    return target;
}
function default_1(app) {
    const rootPath = process.cwd();
    const allDirPath = getAllDirs(rootPath);
    const routerPath = allDirPath.find((item, index) => {
        return /router\b/.test(item);
    });
    const routerDirs = fs_1.default.readdirSync(routerPath, { encoding: 'utf-8' });
    routerDirs.forEach((dir) => {
        const _router = new koa_router_1.default({ prefix: `/${dir}` });
        const routers = fs_1.default.readdirSync(`${routerPath}/${dir}`, { encoding: 'utf-8' });
        routers.forEach(async (router) => {
            const fn = await Promise.resolve().then(() => __importStar(require(`${routerPath}/${dir}/${router}`)));
            router = router.replace(/.ts/, '');
            if (Array.isArray(fn.default)) {
                _router[router]('/', ...fn.default);
            }
            else if (typeof fn.default === 'function') {
                _router[router]('/', fn.default);
            }
        });
        app.use(_router.routes());
    });
}
exports.default = default_1;
//# sourceMappingURL=index.js.map