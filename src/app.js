const path = require('path')
const express = require('express')
const app = express()
const hbs = require('hbs')

const port = process.env.PORT || 3000

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res)=>{
  res.render('index',{
    title: 'Weather App',
    name: 'Dean Morra'
  })
})
app.get('/about',(req,res)=>{
  res.render('about',{
    title: 'About me',
    name: 'Dean Morra'
  })
})

app.get('/help', (req,res)=>{
  res.render('help',{
    info: 'contacts',
    title: 'Help',
    name: 'Dean Morra'
  })
})

app.get('/weather', (req, res)=>{
  if(!req.query.address){
    return res.send({
      error: 'No address is provided'
    })
  }
  geocode(req.query.address, (error,{latitude, longitude, location}={})=>{
    if(error){
      return res.send({error})
    }
    forecast(latitude, longitude, (error, forecast)=>{
      if(error){
        return res.send({error})
      }
      res.send({
        forecast,
        location,
        address: req.query.address
      })
    })
  })
})

app.get('/products', (req, res)=>{
  if(!req.query.search){
    return res.send({
      error: 'You must provide search term!'
    })
  }
  res.send({
    products: []
  })
})

app.get('/help/*', (req,res)=>{
  res.render('etc',{
    title: '404',
    info: 'Help article not found',
    name: 'Dean Morra'
  })
})

app.get('*', (req,res) => {
  res.render('etc',{
    title: '404',
    info: 'My 404 page',
    name: 'Dean Morra'
  })
})

app.listen(port,()=>{
  console.log('Server is up on port '+port)
})
