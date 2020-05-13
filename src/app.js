const geocode = require('./utility/mapbox')
const weather = require('./utility/forecast')
const address = process.argv[2]

const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request= require('request')


const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

//Setting up all routers
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Manish Kumar'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Manish Kumar'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Manish Kumar'
    })
})

app.get('/weather',(req, res)=>
{
    if(!req.query.address)
    {
       return res.send({
             error:'Please Enter Your Address'
       }) 
    }
geocode(req.query.address,(error,data)=>
  {
   if(error)
    {
      return res.send({error})  
    }
 
   weather(data.longitude, data.latitude, (error, weatherdata) =>
   {
       if(error)
       {
           return res.send({error})
       }
    res.send({   
        location:data.place,
        forecast:weatherdata
     })
   })
 })
}) 


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Manish Kumar',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Manish Kumar',
        errorMessage: 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('Server is up and running on port 3000.')
})