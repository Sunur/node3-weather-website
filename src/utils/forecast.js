const request = require('request')

const forecast =(latitude, longitude, callback)=>{
  const url = 'http://api.weatherstack.com/current?access_key=be9ee7c598087d49a3f686186881dfb4&query=' + latitude+ ',' + longitude
  request({url, json: true}, (error, {body})=>{
    if(error){
      callback('There is connection issue',undefined)
    }else if(body.error){
      callback('Invalid location, try something else',undefined)
    }else{
      callback(undefined,"Humidity is "+ body.current.humidity +" "+ body.current.weather_descriptions+ '. It is currently '+body.current.temperature+' but it feels like '+body.current.feelslike)
    }
  })
}
module.exports= forecast
