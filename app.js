// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require('koa');
// 创建一个Koa对象表示web app本身:
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const templating = require('./templating');
const router = require('koa-router')();

const isProduction = process.env.NODE_ENV ==='production'

app.use(async (ctx,next) =>{
    //console.log(`Process $`)
    var 
        start = new Date().getTime(),
        execTime;
        await next();
        execTime = new Date().getTime() - start;
        ctx.response.set('X-Response-Time',`${execTime}ms`);
})
if(!isProduction){
    
}
app.use(bodyParser());
app.use(templating('views',{
    noCache: !isProduction,
    watch: !isProduction
}))
router.get('/', async (ctx,next) =>{
    console.log('log');
    ctx.render('index.html',{
        title:'Welcome'
    })
})
router.get('/index', async (ctx,next) =>{
    console.log('log');
    ctx.render('index.html',{
        title:'Welcome'
    })
})
app.use(router.routes());
app.listen(8088);
console.log('app started at port 8088...');