const request = require('request')

const geoCode = (address, callback) =>{
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiZGVhbm1vcnJhIiwiYSI6ImNrOXR5bzFjOTFpcWczaW4xOG5wOXg4cDMifQ.wMJXZn3EjsNiDOJu_HyEeg&limit=2'

  request({url, json: true}, (error, {body})=>{
    if(error){
      callback('There is a connection issue', undefined)
    }else if(!body.features[0]){
      callback('Invalid location, try something else',undefined)
    }else{
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      })
    }   
  })
}

module.exports = geoCode