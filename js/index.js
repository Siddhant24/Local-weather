$(document).ready(function(){
  var longitude, latitude, location, woeid;
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0
  var yyyy = today.getFullYear();
  var date_today = yyyy + '/' + mm + '/' + dd;
  var weather_description = '';
  var temperature = '';
  var abbr = '';
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition  (function(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    $.getJSON(`https://crossorigin.me/https://www.metaweather.com/api/location/search/?lattlong=${latitude},${longitude}`,function(json){
    location = json[0].location_type;
    woeid = json[0].woeid;
    $.getJSON(`https://crossorigin.me/https://www.metaweather.com/api/location/${woeid}/${date_today}/`,function(json){
      weather_description = json[0].weather_state_name;	
      temperature = json[0].the_temp;
      abbr = json[0].weather_state_abbr;
      $("#weather-type").html(weather_description);
      $("#weather-icon").prop("src",`https://www.metaweather.com//static/img/weather/png/64/${abbr}.png`);
      $("#temperature").html(temperature.toFixed(1) + '&#176C');
    });
   });
 });
  }
});

$(".slider").on("click", function(){
  text = $("#temperature").text();
  newtext = "";
  if(text){
    if(text.charAt(text.length-1)=='C')
    {
      newtext += (parseFloat(text)*9/5 + 32).toFixed(1) + '&#176F';
    }
    else if(text.charAt(text.length-1)=='F')
    {
      newtext += ((parseFloat(text)-32)*5/9).toFixed(1) + '&#176C';
    }
    $("#temperature").html(newtext);
  }
});
