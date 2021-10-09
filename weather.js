const express = require('express');
const app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:true}));

const https =require('https');
app.listen(3000, function(){
console.log('The server is good to go')
})

//Navigation
app.get('/',function(request,response){
  response.sendFile(__dirname +'/index.html')
})

app.post('/',function(request,response){
    let city = request.body.cityName;
    const apiKey = '30df332a4b0e2ec43385cf929d5dd6f1';
const url = 'https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid='+apiKey+'&units=metric';
    https.get(url,function(res){
        res.on('data',function(data){
    let weatherInfo = JSON.parse(data)
    let weather = weatherInfo.weather[0].main
    let temperature = Math.round(weatherInfo.main.temp);
    let windSpeed = Math.round(weatherInfo.wind.speed)
    let nation = weatherInfo.sys.country
    let place = weatherInfo.name;
    let icon = weatherInfo.weather[0].icon
    let imgUrl = 'http://openweathermap.org/img/wn/'+icon+'@2x.png'


 response.write('<h1>'+'The weather in  '+ place +' is '+ weather+ '</h1>')
response.write('<h1>'+'while the temperature is ' + temperature +'<sup>0</sup>'+'C'+ '</h1>'+'<br>');
response.write('<img src='+imgUrl+'>')
response.write('<h1>'+'The wind speed in '+ place +' is '+ windSpeed+' knots '+'</h1>')
if(nation == 'NG'){
    response.write('<h1>'+place+' is a city in Nigeria...Self acclaimed giants of Africa'+'</h1>')
}else if(place == nation){
    response.write('<h1>'+' This is a country not a city' +'</h1>')
}
response.send()



        });
        
    
    })
})




