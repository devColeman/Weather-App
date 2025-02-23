import {
    apiKey
} from "./api-keys.js"

document.querySelector('button').addEventListener('click', getData)
let input = document.getElementById('search')
const image = document.getElementById('myImage');


// todo:
// add city names, temperature hunidity wind speed and add weather icons
// watch the yt videon and look up some weather apps to use ideas from

getData()



async function getData() {
  
    let url = ``
    if(input.value === ''){
         url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=London`
        

    } else {
         url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${input.value}`
        
    }

    
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log(data)
      let currentTemp = Math.round(data.current.temp_f)
      let feelsLike = Math.round(data.current.feelslike_f)
      let imgHeader = data.current.condition.text
      let img = data.current.condition.icon

      image.src = img;
      document.querySelector('h2').innerHTML = `Temperatue is ${currentTemp} °F`
      document.querySelector('h3').innerHTML = `Feels like ${feelsLike} °F`
      document.querySelector('h4').innerHTML = imgHeader
      
    } catch (error) {
      console.error(error.message);
      document.querySelector('h4').innerHTML = 'Please enter a city or country'
      
    }
  }




