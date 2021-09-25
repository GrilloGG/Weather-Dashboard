const searchBtn = document.getElementById("search-btn")
let inputSearch = document.getElementById("input-search")
let currentWeather = document.getElementById("current-weather")
let citySearched = document.getElementById("input-search")
let currentCityList = document.getElementById("current-city-list")
let headerCurrentCity = document.getElementById("header-current-city")
let iconWeather = document.getElementById("icon-weather")
let city = 
searchBtn.addEventListener("click", getCurrentWeather);


function getCurrentWeather (city){
    city = citySearched.value.trim()
    inputSearch.value = ""
    console.log(city)
    let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=f8ed10bf86bf8687536af3bbc547d2af";
    fetch(apiUrl)
    .then(response => response.json())
    .then(function (data){
        console.log(data)
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
        tempValue.setAttribute("class", "list-group-item")
        currentCityList.appendChild(tempValue)

        let windValue = document.createElement("li")
        windValue.textContent = "Wind: " + data.wind.speed + "KM/H"
        windValue.setAttribute("class", "list-group-item")
        currentCityList.appendChild(windValue)

        let humidityValue = document.createElement("li")
        humidityValue.textContent = "Humidity: " + data.main.humidity + "%"
        humidityValue.setAttribute("class", "list-group-item")
        currentCityList.appendChild(humidityValue)

        let latitude = data.coord.lat
        let longitude = data.coord.lon
        return fetch('https://api.openweathermap.org/data/2.5/onecall?lat='+latitude+'&units=metric&exclude=minutely,hourly,daily&lon='+longitude+'&appid=f8ed10bf86bf8687536af3bbc547d2af')
    })
    .then(response => response.json())
    .then(function (data){
        console.log(data)

        let uvValue = document.createElement("li")
        uvValue.setAttribute("class", "list-group-item")
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
    })
}



