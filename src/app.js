const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

//setting up port for heroku
const port=process.env.PORT || 3000;

const app =express();
//to get public directory path
const publicStaticDirectory= path.join(__dirname,"../public");
const viewDirectory = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,"../templates/partials");

//to set up  template view engine path, partials path & views path
app.set('view engine','hbs');
app.set('views',viewDirectory);
hbs.registerPartials(partialsPath); //to register all partials

//to serve static files
app.use(express.static(publicStaticDirectory));

//app.get("/route",calback(req,res))---res is used to send the response to client
//to render dynamic page
app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Aditya Wazir'
    });
});

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'Aditya Wazir'
    });
});

app.get('/help',(req,res)=>{
    res.render('help',{
        message:'This is help page',
        title:"Help",
        name:"Aditya Wazir"
    });
});

// json endpoint for weather app
app.get('/weather',(req,res)=>{
    //using query string passed along url
    if(!req.query.address)
    {
        return res.send({
            error:"No address given"
        })
    }

    geocode(req.query.address,(error,geoData)=>{
        if(error)
        {
            return  res.send({
                error : error
            });
        }
        
        //no error then we call forecast
        forecast(geoData.latitude,geoData.longitude,(error,forecastData)=>{
            if(error)
            {
                return res.send({
                    error: error
                })
            }

            res.send({
                forecast: forecastData,
                location: geoData.location
            })

        })
    });

});

//404 page for /help/* page
app.get('/help/*',(req,res)=>{
    res.render('err404',{
        message:'Help article not found',
        title: 'Error:404',
        name:'Aditya Wazir'
    });
});

//404 page for all not found routes
app.get('*',(req,res) => {
    res.render('err404',{
        message:"Page not found",
        title:'Error:404',
        name:"Aditya Wazir"
    });
});


//app starts a server and listen at port 3000 for connections
app.listen(port,() =>{
    console.log("server working at port "+port);
})

