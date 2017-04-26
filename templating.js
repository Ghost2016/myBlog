'use strict';

const nunjucks = require('nunjucks');

function createEnv() {
    var
        //是否全局开启模板转义
        autoescape = opts.autoescape && true,
        //是否不使用缓存，每次都重新编译
        noCache = opts.noCache || false,
        //当模板变化时重新加载。使用前请确保已安装可选依赖 chokidar
        watch = opts.watch || false,
        //当输出为 null 或 undefined 会抛出异常
        throwOnUndefined = opts.throwOnUndefined || false,
        env = new nunjucks.Environment(
            new nunjucks.FileSystemLoader('views', {
                noCache: noCache,
                watch: watch
            }), {
                autoescape: autoescape,
                throwOnUndefined: throwOnUndefined
            });
    if (opts.filters) {
        for (var f in opts.filters) {
            env.addFilter(f, opts.filters[f]);
        }
    }
    return env;
}
function templating(path, opts) {
    var env = createEnv(path, opts);
    return async (ctx,next) => {
        // 给ctx绑定render函数,方便在controller里面调用
        ctx.render = function(){
            // 把render后的内容赋值给response.body:
            ctx.response.body = env.render(view,Object.assign({},
            ctx.state || {},model || {}));
            // 设置Content-Type:
            ctx.response.type ='text/html';
        };
        // 继续处理请求:
        await next();
    }
}

module.exports = templating;