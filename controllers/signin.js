module.exports = {
    'GET /signin':async (ctx,next) => {
        var hello = 'hello';
        ctx.render('signin.html',{
            title:hello
        });
    }
}