const request = require('request');


const resolveDarkskyURL = (latitude, longitude) => { 
    const DARKSKY_URL_PREFIX = 'https://api.darksky.net/forecast/1431c95fa056a3726acb2f699d076ba3/';
    const DARKSKY_URL_SUFIX = '?units=si';

    return DARKSKY_URL_PREFIX + latitude +','+ longitude + DARKSKY_URL_SUFIX;
};

const getForecast = ({latitude, longitude}, callback) => {
    request({
        url: resolveDarkskyURL(latitude, longitude),
        json: true
    }, (error, response) => {
        if(error || response.body.error) {
            callback(error, undefined);
            return;
        }
        let temperature = response.body.currently.temperature
        let chanceDeChuva = response.body.currently.precipProbability
        let summary = response.body.daily.data[0].summary
        let precipType = response.body.currently.precipType;
        let icon = response.body.currently.icon;
        
        callback(undefined, {
            temperature,
            chanceDeChuva,
            summary,
            precipType,
            icon
        })
        
    });
}


module.exports = getForecast;