'use strict'
var s = "Hello World";
function greet(name){
    if((typeof window)==='undefined'){
        global.console.log('node.js\n'+s+','+name+'!');
    }else{
        global.console.log('windows');
    }
}

module.exports = greet;