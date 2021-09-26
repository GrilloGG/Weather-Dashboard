const searchBtn = document.getElementById("search-btn")
let inputSearch = document.getElementById("input-search")
let citySearched = document.getElementById("input-search")
let weatherDisplay = document.getElementById("weather-display")
let currentCityList = document.getElementById("current-city-list")
let headerCurrentCity = document.getElementById("header-current-city")
let futureWeather = document.getElementById("future-weather")

searchBtn.addEventListener("click", getCurrentWeather);


function getCurrentWeather (){
    cleanScreen()
    city = citySearched.value.trim()
    inputSearch.value = ""
    console.log(city)
    let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=f8ed10bf86bf8687536af3bbc547d2af";
    fetch(apiUrl)
    .then(response => response.json())
    .then(function (data){
        console.log(data)
        weatherDisplay.setAttribute("class", "d-flex flex-column col-9 show")
        let currentCityTitle = document.createElement("h3");
        currentCityTitle.textContent = data.name + ", " + data.sys.country +"  ";
        currentCityTitle.setAttribute("class", "m-2")
        headerCurrentCity.appendChild(currentCityTitle)
        
        let dateUnix = data.dt
        let dateCalendar = new Date(dateUnix*1000);
        console.log(dateCalendar.toLocaleDateString())

        let dateDisplay = document.createElement("h3")
        dateDisplay.textContent = "(" + dateCalendar.toLocaleDateString("en-GB") + ")"
        dateDisplay.setAttribute("class", "m-2")
        headerCurrentCity.appendChild(dateDisplay)

        let iconCode = data.weather[0].icon
        let iconUrl = "http://openweathermap.org/img/wn/" + iconCode + ".png"
        let weatherIcon = document.createElement("img")
        weatherIcon.setAttribute("src", iconUrl)
        weatherIcon.setAttribute("class", "img-icon")
        headerCurrentCity.appendChild(weatherIcon)


        let tempValue = document.createElement("li")
        tempValue.textContent = "Temperature: " + data.main.temp + "°C";
        tempValue.setAttribute("class", "list-group-item bg-secondary")
        currentCityList.appendChild(tempValue)

        let windValue = document.createElement("li")
        windValue.textContent = "Wind: " + data.wind.speed + "KM/H"
        windValue.setAttribute("class", "list-group-item bg-secondary")
        currentCityList.appendChild(windValue)

        let humidityValue = document.createElement("li")
        humidityValue.textContent = "Humidity: " + data.main.humidity + "%"
        humidityValue.setAttribute("class", "list-group-item bg-secondary")
        currentCityList.appendChild(humidityValue)

        let latitude = data.coord.lat
        let longitude = data.coord.lon
        return fetch('https://api.openweathermap.org/data/2.5/onecall?lat='+latitude+'&units=metric&exclude=minutely,hourly&lon='+longitude+'&appid=f8ed10bf86bf8687536af3bbc547d2af')
    })
    .then(response => response.json())
    .then(function (data){
        console.log(data)

        let uvValue = document.createElement("li")
        uvValue.setAttribute("class", "list-group-item bg-secondary")
        uvValue.textContent = "UV Index: " 
        
        let uvValueBackground = document.createElement("span")
        uvValueBackground.textContent = data.current.uvi
        uvValue.append(uvValueBackground)
        
        if (data.current.uvi >= 0 && data.current.uvi < 2){
            uvValueBackground.setAttribute("class", "uv-green uv-value-text")
        }
        else if (data.current.uvi > 2 && data.current.uvi < 5){
            uvValueBackground.setAttribute("class", "uv-yellow uv-value-text")
        }
        else if (data.current.uvi > 5 && data.current.uvi < 7){
            uvValueBackground.setAttribute("class", "uv-orange uv-value-text")
        }
        else if (data.current.uvi > 7 && data.current.uvi < 10){
            uvValueBackground.setAttribute("class", "uv-red uv-value-text")
        }
        else if (data.current.uvi > 10 && data.current.uvi < 50){
            uvValueBackground.setAttribute("class", "uv-purple uv-value-text")
        }
     
        currentCityList.appendChild(uvValue)
        getFutureWeather(data)
    })
}


function getFutureWeather(data){
console.log(data)
    for (var  i=0; i<5; i++){
        
        let containerForecast = document.createElement("div")
        containerForecast.setAttribute("class", " m-3 p-4 bg-info text-white rounded ")
        futureWeather.appendChild(containerForecast)

        let dateCalendarForecast = new Date(data.daily[i+1].dt*1000);
        let dateDisplayForecast = document.createElement("h3")
        dateDisplayForecast.textContent = dateCalendarForecast.toLocaleDateString("en-GB")
        dateDisplayForecast.setAttribute("class", "")
        containerForecast.appendChild(dateDisplayForecast)

        let iconCodeForecast = data.daily[i+1].weather[0].icon
        let iconUrlForecast = "http://openweathermap.org/img/wn/" + iconCodeForecast + ".png"
        let weatherIconForecast = document.createElement("img")
        weatherIconForecast.setAttribute("src", iconUrlForecast)
        weatherIconForecast.setAttribute("class", "img-icon")
        containerForecast.appendChild(weatherIconForecast)


        let tempValueForecast = document.createElement("p")
        tempValueForecast.textContent = "Temp: " + data.daily[i+1].temp.day + "°C";
        tempValueForecast.setAttribute("class", "")
        containerForecast.appendChild(tempValueForecast)

        let windValueForecast = document.createElement("p")
        windValueForecast.textContent = "Wind: " + data.daily[i+1].wind_speed + "KM/H"
        windValueForecast.setAttribute("class", "")
        containerForecast.appendChild(windValueForecast)

        let humidityValueForecast = document.createElement("p")
        humidityValueForecast.textContent = "Humidity: " + data.daily[i+1].humidity + "%"
        humidityValueForecast.setAttribute("class", "")
        containerForecast.appendChild(humidityValueForecast)
    }
}


function cleanScreen(){
    if(!headerCurrentCity.firstChild){
        return
    }
    else{
        while(headerCurrentCity.firstChild){
            headerCurrentCity.removeChild(headerCurrentCity.firstChild)
        }
    }
    if(!currentCityList.firstChild){
        return
    }
    else{
        while(currentCityList.firstChild){
            currentCityList.removeChild(currentCityList.firstChild)
        }
    }
    if(!futureWeather.firstChild){
        return
    }
    else{
        while(futureWeather.firstChild){
            futureWeather.removeChild(futureWeather.firstChild)
        }
    }
}
