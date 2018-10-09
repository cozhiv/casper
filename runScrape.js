/**
 * runghost.js
 */

var spawn = require('child_process').spawn;
var args = ["./scrapeGod.js"];
// In case you want to customize the process, modify the options object
var options = {};
// If phantom is in the path use 'phantomjs', otherwise provide the path to the phantom phantomExecutable
// e.g for windows:
// var executable = 'E:\\Programs\\PhantomJS\\bin\\phantomjs.exe';
//same is valid for casper
var executable = 'casperjs';

/**
 * This method converts a Uint8Array to its string representation
 */
function Uint8ArrToString(myUint8Arr){
    return String.fromCharCode.apply(null, myUint8Arr);
};
//setInterval(function(){
    
    var child = spawn(executable, args, options);
    // Receive output of the child process
    child.stdout.on('data', function(data) {
        var textData = Uint8ArrToString(data);
        console.log(textData);
        /*checkPrice(textData).then(function(herr){
            console.log(herr);
        });*/
    });
    // Receive error output of the child process
    child.stderr.on('data', function(err) {
        var textErr = Uint8ArrToString(err);
        console.log(textErr);
    });
    
    // Triggered when the process closes

    child.on('close', function(code) {
        console.log('Process closed with status code: ' + code);
    });
//}, 60000);
function checkPrice(jsonObj){
    return new Promise(function(resolve, reject){
        let obj = JSON.parse(jsonObj);
        let rRate = null;
        let http = require("https");
        var options = {
            host: 'api.coindesk.com',

            path:'/v1/bpi/currentprice/USD.json',
            method: 'GET'
        };
        let request = http.request(options, function (response) { 
            let buffer = "", 
                data,
                rate;

            response.on("data", function (chunk) {
                buffer += chunk;
            }); 

            response.on("end", function (err) {
                // finished transferring data
                // dump the raw data
                data = JSON.parse(buffer);
                rate = data.bpi.USD.rate.replace(',','');
                //console.log('rate usd/btc: ' + rate);
                rRate = + rate;
                obj.price = rRate;
                resolve(obj);
            }); 
            
        });
        //request.write();
        request.end();
    });
}