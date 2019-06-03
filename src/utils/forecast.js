let request =require('request');

let forecast = function(latitude,longitude,callback){
	const url = 'https://api.darksky.net/forecast/ec0780d4f80d108fae2a2cfb0b6aa469/'+latitude+','+longitude+'?units=si';

	request({url,json:true},(error,{body})=>{
			if(error)	
			{
				callback("Unable to connect to weather services",undefined);
			}else if(body.error)
			{
				callback(body.error);
			}else{
				callback(undefined,body.daily.data[0].summary+" it is currently "+body.currently.temperature+" degrees out." +' With maximum temperature as '+body.daily.data[0].temperatureHigh+' and minimum temperature as '+body.daily.data[0].temperatureLow+" .There is a "+body.currently.precipProbability*100+" % chance of rain.");
		}
	});
}

module.exports=forecast;