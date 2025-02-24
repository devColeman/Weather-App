import {
    apiKey
} from "./api-keys.js"

document.querySelector('button').addEventListener('click', getData)
let input = document.getElementById('search')
const image = document.getElementById('myImage');


// todos:
// change placeholder on search to include both place and country
// add city names, temperature hunidity wind speed and add weather icons
// watch the yt videon and look up some weather apps to use ideas from
// add pop out for 3 or 5 day forecast

getData()




async function getData() {
    let url = ``
    let url2 = ``
    if(input.value === '' || input.value === undefined ){
         url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=London`
        url2 = `http://api.weatherapi.com/v1/astronomy.json?key=${apiKey}&q=London&dt=2025-02-24`

    } else {
         url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${input.value}`
        url2 = `http://api.weatherapi.com/v1/astronomy.json?key=${apiKey}&q=${input.value}&dt=2025-02-24`
    }

    try {
      const response = await fetch(url2);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      
      const data2 = await response.json();
      console.log(data2)

      // filters out the 0 from times ex: 06:24 am => 6:24 am using function removeZero
      let f = data2.astronomy.astro.sunrise.split('')
       document.querySelector('.sunrise').innerHTML = ` ${removeZero(f)}`

      let z = data2.astronomy.astro.sunset.split('')
      document.querySelector('.sunset').innerHTML = `${removeZero(z)}`

      let k = data2.astronomy.astro.moonrise.split('')
      document.querySelector('.moonrise').innerHTML = ` ${removeZero(k)}`

    
      
    } catch (error) {
      console.error(error.message);
      
      
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
      document.querySelector('.dewPoint').innerHTML = `${data.current.dewpoint_f} °F`
      document.querySelector('.gustMph').innerHTML = ` ${data.current.gust_mph
      } mph`
     
      document.querySelector('.currentTemp').innerHTML = `${currentTemp}°F / Feels like ${feelsLike}°F`
      document.querySelector('.imgHeader').innerHTML = imgHeader
      document.querySelector('.location').innerHTML = data.location.name
      
      if( data.location.name === data.location.region){
        document.querySelector('.location').innerHTML = `${data.location.name} / ${data.location.country} `
      } else if(data.location.country === "United States of America") {
        document.querySelector('.location').innerHTML = `${data.location.name} / ${data.location.region
        } `
      } else {
        document.querySelector('.location').innerHTML = `${data.location.name} / ${data.location.country
        } `
      }
      
     
      input.placeholder = `${data.location.name}`
      input.value = ''
      
    } catch (error) {
      console.error(error.message);
      
      
    }
  }



  function removeZero (str) {
    if(Number(str[0]) === 0){
      
      str.shift()
       str =  str.join('')
         } else {
        str = str.split('')
       str.join('')
        
      }

      return str
  }