const request=require('request')
const chalk = require('chalk')

const geocode=(address,callback) =>
{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/ '+ address +' .json?access_token=pk.eyJ1IjoibWFuaXNoY2hhbmRhbiIsImEiOiJjazlwYTUzenQwOGY2M2VydDQ3cXAyem43In0.DrMdbBIB3FIrmpTSdfDZDw'
    request({url:url,json:true},(error,response)=>
 {
    if(error)
    {
        callback('UNABLE TO CONNECT TO NETWORK PLEASE CHECK YOUR CONNECTION', undefined)
    }
    else if(response.body.message || response.body.features.length === 0)
    {
        callback('UNABLE TO FIND LOCATION PLEASE SEARCH VALID LOCATION', undefined)
    }
    else
    {
        callback(undefined,
       {
        longitude:response.body.features[0].center[1],
        latitude:response.body.features[0].center[0],
        place:response.body.features[0].place_name
       })
    }
 })
}

module.exports = geocode