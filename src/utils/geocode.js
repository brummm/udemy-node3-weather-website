const request = require('request');


const DEFAULT_LANGUAGE = 'en';
const DEFAULT_LIMIT = 1;

const resolveMapboxURL = (address, language, limit) => { 
    const MAPBOX_URL_PREFIX = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
    const MAPBOX_URL_SUFIX = '.json?access_token=pk.eyJ1IjoiYnJ1bW1tIiwiYSI6ImNqdmN4a2RvOTBrZXUzeXJ2YWJuZ3ZyZHEifQ.Dm2331k1DQl6sSjdGoPv3w';
    let resolvedUrl = MAPBOX_URL_PREFIX;

    resolvedUrl += address + MAPBOX_URL_SUFIX;

    if(language !== undefined) {
        resolvedUrl += '&language=' + language;
    }

    resolvedUrl += '&limit='+ limit;
    return resolvedUrl;
};

const getGeocode = ({address, limit = DEFAULT_LIMIT, language=DEFAULT_LANGUAGE}, callback) => {
    request({
        url: resolveMapboxURL(address, language, limit),
        json: true,
    }, (error, response) => {
        if(error || !response.body.features) {
            console.log(response);
            callback('Error fetching your place temperature.', undefined);
            return;
        } else if(response.body.features.length == 0) {
            callback('No location found.', undefined);
            return;
        }
        let place = response.body.features[0];
        callback(undefined, {
            name: place.place_name,
            latitude: place.center[1],
            longitude: place.center[0]
        });
        return;
    });
};

module.exports = getGeocode;