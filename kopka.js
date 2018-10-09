

//console.log('woooooooooooo!');
function log(){
    return $('#one').attr('href');
}
//var url = 'http://weather.bg/0index.php';
var url = 'https://data.bitcoinity.org/markets/bidask_sum/10m/USD/bitfinex?bp=10&bu=c&t=m';
var casper = require('casper').create();
casper.start(url);
casper.then(function() {
    //this.echo('Page: ' + this.getTitle());
    this.page.injectJs('jquery-3.3.1.min.js');
    this.echo(this.evaluate(doTheSh));
});
casper.run();

function doTheSh(){
    function getSubstr(da){
        da = da.split(',')[1];
        da = da.substr(0,da.length-1);
        return da;
    }
    function calcAmount(iVal){
        return ((Math.abs(iVal-min)/min)*dPrice) + lPrice;
    }
    
        var green = $($($($('.lines1Wrap').find('.nvd3.nv-wrap.nv-scatter')).find('.nv-group.nv-series-1'))[0]).find('path').last().attr('transform');
        var grey = $($($($('.lines2Wrap').find('.nvd3.nv-wrap.nv-scatter')).find('.nv-group.nv-series-0'))[0]).find('path').last().attr('transform');
        var red = $($($($('.lines1Wrap').find('.nvd3.nv-wrap.nv-scatter')).find('.nv-group.nv-series-0'))[0]).find('path').last().attr('transform');
        var min = $('.nv-axisMin-y').attr('transform');
        var max = $('.nv-axisMax-y').attr('transform');

        //var upper = $('.tick')[2];
        var upper = $('.nv-axisMaxMin.nv-axisMaxMin-y.nv-axisMax-y')[0];
        var uPrice = $(upper).find('text').text();
        var uPosition = $(upper).attr('transform');
        //var lower = $('.tick')[1];
        var lower = $('.nv-axisMaxMin.nv-axisMaxMin-y.nv-axisMin-y')[0];
        var lPrice = $(lower).text();
        var lPosition = $(lower).attr('transform');
        var cMin = $($('.nv-axisMaxMin.nv-axisMaxMin-y.nv-axisMin-y')[1]).text();
        var cMax = $($('.nv-axisMaxMin.nv-axisMaxMin-y.nv-axisMax-y')[1]).text();

        var time = $('.nv-axisMaxMin.nv-axisMaxMin-x.nv-axisMax-x').text();
        
        green = + getSubstr(green);
        red = + getSubstr(red);
        grey = + getSubstr(grey);
        min = + getSubstr(min);
        max = + getSubstr(max);
        lPosition = + getSubstr(lPosition);
        uPosition = + getSubstr(uPosition);
        lPrice = + lPrice.substr(0, lPrice.length-1);
        uPrice = + uPrice.substr(0, uPrice.length-1);
        var dPrice = uPrice - lPrice
        var rRed = calcAmount(red);
        var rGreen = calcAmount(green);
        cMin = + cMin.substr(0, cMin.length-1);
        cMax = + cMax.substr(0, cMax.length-1);
        var dCurrency = cMax - cMin;
        var price = (Math.abs(grey-min)/min)*dCurrency + cMin;
        //var output = {};
        var output = {
            green: green,
            grey: grey,
            red:red,
            min: min,
            max: max,
            uPrice: uPrice,
            uPosition: uPosition,
            lPrice: lPrice,
            lPosition: lPosition,
            cMin: cMin,
            cMax: cMax,
            time: time,
            ask: rRed,
            bid: rGreen,
            price: price
        };

       return JSON.stringify(output);
        
}