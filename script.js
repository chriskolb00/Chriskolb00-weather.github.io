/* fetch("https://api.openweathermap.org/data/2.5/weather?q="
        +city+ "&units=imperial&appid=" +this.apiKey)*/
/*fetch("https://api.openweathermap.org/data/2.5/forecast?q=" +
        city+"&units=imperial&appid="+this.apiKey)*/
let weather ={
    "apiKey":"0515874ab047b33baf2d52f13472e5c5",
    
    fetchWeather: function (city){
        fetch("https://api.openweathermap.org/data/2.5/forecast?q=" +
        city+"&units=imperial&appid="+this.apiKey)
        .then((response)=>response.json())
        .then((data)=>this.displayWeather(data));
    },
    displayWeather: function(data){
        const {name} =data.city;
        const {icon, description}=data.list[0].weather[0];
        const {temp, temp_min, temp_max, humidity}=data.list[0].main;
        const {speed} = data.list[0].wind;
        document.querySelector(".city").innerText=name + " Weather";
        document.querySelector(".icon").src = 
        "https://openweathermap.org/img/wn/"+ icon+".png";
        document.querySelector(".description").innerText=description;
        document.querySelector(".temp").innerText=temp + "°F";
        document.querySelector(".dayTemp").innerText="Low: " +temp_min + "°F, high: "+
        temp_max+"°F";
        document.querySelector(".humidity").innerText="Humidity: "+ humidity+"%";
        document.querySelector(".wind").innerText="Wind speed: "+speed + " km/h";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage="url('https://source.unsplash.com/1600x900/?"+ name + "')";
       
        for(i=1; i<3;i++){
            document.querySelector(".icon"+(i+1)).src=
                "https://openweathermap.org/img/wn/"+ data.list[i].weather[0].icon+".png";
            document.querySelector(".description"+(i+1)).innerText=
                ""+data.list[i].weather[0].description;
            document.querySelector(".temp"+(i+1)).innerText=
                ""+data.list[i].main.temp+"°F";
            document.querySelector(".dayTemp"+(i+1)+"").innerText=
                "Low: " +data.list[i].main.temp_min + 
                "°F, high: "+ data.list[i].main.temp_max+"°F";
        }
        for(i=4; i<=7;i++){
            document.querySelector(".icon"+(i)).src=
                "https://openweathermap.org/img/wn/"+ data.list[i].weather[0].icon+".png";
            document.querySelector(".description"+(i)).innerText=
                ""+data.list[i].weather[0].description;
            document.querySelector(".temp"+(i)).innerText=
                ""+data.list[i].main.temp+"°F";
        }

    },
   search: function(){
    this.fetchWeather(document.querySelector(".search-bar").value);
   }
};

document.querySelector(".search button")
    .addEventListener("click", function(){
        weather.search();
    });
document.querySelector(".search-bar").addEventListener("keyup",function(event){
    if(event.key=="Enter"){
        weather.search();
    }
});
weather.fetchWeather("Omaha");