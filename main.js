import {
    apiKey
} from "./api-keys.js"

document.querySelector('button').addEventListener('click', getData)
let input = document.getElementById('search')
const image = document.getElementById('myImage');


// todos:
// add city names, temperature hunidity wind speed and add weather icons
// watch the yt videon and look up some weather apps to use ideas from
// add pop out for 3 or 5 day forecast
// make the climate condition its own box with a box below that has the 5 day weather forecast

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
      

      // filters out the 0 from times ex: 06:24 am => 6:24 am using function removeZero
      let f = data2.astronomy.astro.sunrise.split('')
       document.querySelector('.sunrise').innerHTML = ` ${removeZero(f)} `

      let z = data2.astronomy.astro.sunset.split('')
      document.querySelector('.sunset').innerHTML = `${removeZero(z)}`

      let k = data2.astronomy.astro.moonrise.split('')
      document.querySelector('.moonrise').innerHTML = ` ${removeZero(k)}`

      // adding the moon pic
      let moonStuff = data2.astronomy.astro.moon_phase
      let moonPhase = moonStuff.toLowerCase()
    
       
      if(moonPhase == 'new moon'){
        document.querySelector('.moonPhase').innerHTML = `${data2.astronomy.astro.moon_phase} 🌑`
      } else if (moonPhase == 'waxing cresent'){
        document.querySelector('.moonPhase').innerHTML = `${data2.astronomy.astro.moon_phase} 🌒`
      } else if (moonPhase == 'first quarter'){
        document.querySelector('.moonPhase').innerHTML = `${data2.astronomy.astro.moon_phase} 🌓`
      } else if (moonPhase == 'waxing gibbous'){
        document.querySelector('.moonPhase').innerHTML = `${data2.astronomy.astro.moon_phase} 🌔`
      } else if (moonPhase == 'full moon'){
        document.querySelector('.moonPhase').innerHTML = `${data2.astronomy.astro.moon_phase} 🌔`
      } else if (moonPhase == 'waning gibbous'){
        document.querySelector('.moonPhase').innerHTML = `${data2.astronomy.astro.moon_phase} 🌖`
      } else if (moonPhase == 'last quarter'){
        document.querySelector('.moonPhase').innerHTML = `${data2.astronomy.astro.moon_phase} 🌗`
      } else if (moonPhase == 'waning crescent'){
        document.querySelector('.moonPhase').innerHTML = `${data2.astronomy.astro.moon_phase} 🌘`
      } 
      



    
      
    } catch (error) {
      console.error(error.message);
      
      
    }
    
  

    
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const data = await response.json();
      // console.log(data)
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
      let locationcountry = ''
      
      if( data.location.name === data.location.region){
        document.querySelector('.location').innerHTML = `${data.location.name} / ${data.location.country} `
        locationcountry = data.location.country
      } else if(data.location.country === "United States of America") {
        document.querySelector('.location').innerHTML = `${data.location.name} / ${data.location.region
        } `
        locationcountry = data.location.region
      } else {
        document.querySelector('.location').innerHTML = `${data.location.name} / ${data.location.country
        } `
        locationcountry = data.location.country
      }
      
        document.querySelector('.humidity').innerHTML = `Humidity: ${data.current.humidity}%`
     
      input.placeholder = `${data.location.name}, ${locationcountry}`
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