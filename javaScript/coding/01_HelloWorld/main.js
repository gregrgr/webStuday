var greet = require('./hello');
var fs = require('fs');
var str = 'You Father';
greet(str);

fs.readFile("test.txt","utf-8",function(err,data){
    if(err){
        global.console.log(err);
    }else{
        global.console.log(data);
    }
});

try{
    var data = fs.readFileSync("test2.txt","utf-8");
}catch(err){
    global.console.log(err);
}