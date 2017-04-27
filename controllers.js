'use strict';

const fs = require('fs');
//const router = require('koa-router')();

function addControllers(router, dir) {
    //console.log("here");
    let files = fs.readdirSync(__dirname + '/' + dir);
    var js_files = files.filter((file) => {
        return file.endsWith('.js')
    })
    
    for(var file of js_files){
        console.log(`process controller:${file}`);
        let mapping =require(__dirname + '/' + dir + '/' + file)
        addMapping(router,mapping);
    }
}

function addMapping(router,mapping){
    for(var url in mapping){
        if(url.startsWith('GET ')){
            router.get(url.substring(4), mapping[url]);
        }else if(url.startsWith('POST ')){
            router.post(url.substring(5), mapping[url]);
        }else if(url.startsWith('UPDATE ')){
            router.update(url.substring(5), mapping[url]);
        }else if(url.startsWith('DELETE ')){
            router.delete(url.substring(5), mapping[url]);
        }
    }
}

module.exports = function (dir) {
    let controllers_dir = dir || 'controllers';
    let router = require('koa-router')();
    addControllers(router, controllers_dir);
    return router.routes();
}