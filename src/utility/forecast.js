const request = require ('request')

const weather=(long,lat,callback)=>
{
    const url = 'http://api.weatherstack.com/current?access_key=b9fef1cda3bb348204716136230ff8fb&query='+long+','+lat+''
    request({url:url,json:true},(error,response)=>
    {
        if(error)
        {
            callback('FAILED TO CONNECT TO SERVER, PLEASE CHECK YOUR INTERNET CONNECTION',undefined)
        }
        else if(response.body.error)
        {
            callback('NOT VALID LONGITUDE AND LATITUDE, PLEASE TRY ANOTHER SEARCH',undefined)
        }
        else
        {
            callback(undefined,response.body.current.weather_descriptions[0]+'.\nIt is currently '+response.body.current.temperature+' degree out there\nThere is a '+response.body.current.precip+' percent chance of rain')
        }
    })
}

module.exports = weather