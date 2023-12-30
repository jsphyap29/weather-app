import React, {useState} from 'react'
import './WeatherApp.css'

import search_icon from '/src/assets/images/search.png'
import clear_icon from '/src/assets/images/clear.png'
import cloud_icon from '/src/assets/images/cloud.png'
import drizzle_icon from '/src/assets/images/drizzle.png'
import rain_icon from '/src/assets/images/rain.png'
import snow_icon from '/src/assets/images/snow.png'
import wind_icon from '/src/assets/images/wind.png'
import humidity_icon from '/src/assets/images/humidity.png'



const WeatherApp = () => {

    let api_key = "eae01cb6a6caa0deda5792f5b47c68ba";

    const [icon, setIcon] = useState(cloud_icon);

    // const search = async () => {
    //     const element = document.getElementsByClassName("cityInput");
    //     if(element[0].value === ""){
    //         return 0;
    //     }
    //     let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;
        
    //     let response = await fetch(url);
    //     let data = await response.json();
        
    //     const humidity = document.getElementsByClassName("humidity-percent");
    //     const wind = document.getElementsByClassName("wind-rate");
    //     const temperature = document.getElementsByClassName("weather-temp");
    //     const location = document.getElementsByClassName("weather-location");

    //     humidity[0].innerHTML = data.main.humidity;
    //     wind[0].innerHTML = data.wind.speed;
    //     temperature[0].innerHTML = data.main.temp;
    //     location[0].innerHTML = data.name;

    //     console.log({data})
    // }

    const search = async () => {
        try {
            const element = document.getElementsByClassName("cityInput");
    
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;
    
            let response = await fetch(url);
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            let data = await response.json();
    
            const humidity = document.getElementsByClassName("humidity-percentage");
            const wind = document.getElementsByClassName("wind-rate");
            const temperature = document.getElementsByClassName("weather-temp");
            const location = document.getElementsByClassName("weather-location");
    
            humidity[0].innerHTML = data.main.humidity+ "%";
            wind[0].innerHTML = Math.floor(data.wind.speed)+ " km/h";
            temperature[0].innerHTML = Math.floor(data.main.temp)+ "°c";
            location[0].innerHTML = data.name;

            if(data.weather[0].icon === "01d" || data.weather[0].icon === "01n") 
            {
                setIcon(clear_icon);
            }
            else if (data.weather[0].icon === "02d" || data.weather[0].icon === "02n")
            {
                setIcon(cloud_icon)
            }
            else if (data.weather[0].icon === "03d" || data.weather[0].icon === "03n")
            {
                setIcon(drizzle_icon)
            }
            else if (data.weather[0].icon === "04d" || data.weather[0].icon === "04n")
            {
                setIcon(drizzle_icon)
            }
            else if (data.weather[0].icon === "09d" || data.weather[0].icon === "09n")
            {
                setIcon(rain_icon)
            }
            else if (data.weather[0].icon === "10d" || data.weather[0].icon === "10n")
            {
                setIcon(rain_icon)
            }
            else if (data.weather[0].icon === "13d" || data.weather[0].icon === "13n")
            {
                setIcon(snow_icon)
            }
            else {
                setIcon(clear_icon)
            }
    
            console.log({ data });
        } catch (error) {
            console.error("Error during API request:", error);
        }
    };
    

  return (
    <div className="container">
        <div className="top-bar">
            <input type="text" className='cityInput' placeholder='Search'/>
            <div className="search-icon" onClick={() => {
                search()
            }}>
                <img src={search_icon}/>
                
            </div>
        </div>
        <div className="weather-image">
            <img src={icon} alt="" />
        </div>
        <div className="weather-temp">24°c</div>
        <div className="weather-location">London</div>
        <div className="data-container">
            <div className="element">
                <img src={humidity_icon} alt="" className="icon" />
                <div className="data">
                    <div className="humidity-percentage">64%</div>
                    <div className="text">Humidity</div>
                </div>
            </div>
            <div className="element">
                <img src={wind_icon} alt="" className="icon" />
                <div className="data">
                    <div className="wind-rate">18 km/h</div>
                    <div className="text">Wind Speed</div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default WeatherApp
