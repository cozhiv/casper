

//console.log('woooooooooooo!');
function log(){
    return $('#one').attr('href');
}
var url = 'https://coinmarketcap.com/currencies/bitcoin/#charts';
url = 'https://coinmarketcap.com/currencies/ethereum/';
var casper = require('casper').create();
//var casper = require('casper').create({viewportSize : { width: 1280, height: 5000 }});
casper.start(url);
casper.then(function() {
    this.echo('Page: ' + this.getTitle());
    this.page.injectJs('./jquery-3.3.1.min.js');
    this.echo(this.evaluate(function(){
        var trun = $($('.h2.text-semi-bold.details-panel-item--price__value')[0]).text();
        return trun;
    }));
    this.waitForSelector(".highcharts-yaxis-grid",
    function pass () {
        //test.pass("Found {myElement}");
        var dim = this.evaluate(dimensions);
        //this.echo(dim.x);
       // this.echo(dim.y);

       this.echo(dim.left);
       this.echo(dim.top);
       this.echo(dim.width);
       this.echo(dim.height);
        casper.mouse.move(dim.left+dim.width, dim.top+100);       
       // casper.mouse.move('.highcharts-yaxis-grid');
        this.echo(this.evaluate(function(){ 
            var el = document.getElementById('highcharts-graph').innerText;
            return el; 
        }));  
        
        //this.captureSelector('current.png','.highcharts-yaxis-grid');
        //this.echo(this.evaluate(dimensions));
    },
    function fail () {
        test.fail("Did not load element {myElement}");
    },
    30000 // timeout limit in milliseconds
);
    //this.echo(el);
    //this.echo(this.evaluate(dimensions));
    //this.echo(this.evaluate(log));
    //this.captureSelector('current.png','#one');
    //casper.mouse.move(dimensions().top + 30, dimensions().left + dimensions().width);
});
casper.then(function(){
   
    //var coordinates = dimentions();
    //casper.mouse.move(coordinates.y, coordinates.x);
   
    //this.echo(this.evaluate(document.getElementById('highcharts-graph').innerText));
    //this.echo(this.capture('clouds.png', this.evaluate(dimensions)));
    //this.captureSelector('cloud.png','#two');
});
casper.run();
function dimensions(){
    var element = document.getElementsByClassName('highcharts-yaxis-grid')[0];
    var rect = element.getBoundingClientRect();
    return{
        left: + rect.left,
        top: + rect.top,
        width: + rect.width,
        height: + rect.height
        //y: + rect.top + 20,
        //x: + rect.left + + rect.width - 1,
    };
}


function doTheSh(){
    var output = 'jaaa';

    return JSON.stringify(output);
        
}