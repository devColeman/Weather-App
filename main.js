import {
    apiKey
} from "./api-keys.js"

document.querySelector('button').addEventListener('click', getData)
let input = document.getElementById('search')
const image = document.getElementById('myImage');


// todos:
// last feature shoud be recent search via local storage everything else is feature complete besides add addvs to us state ex: Oregon => OR
// then we can move to styles and ui

// add city names, temperature hunidity wind speed and add weather icons
// watch the yt videon and look up some weather apps to use ideas from
// add pop out for 3 or 5 day forecast
// make the climate condition its own box with a box below that has the 5 day weather forecast
// let dfa = localStorage.getItem('key')
// console.log(dfa)
let test = []

 

const storedArrayString = localStorage.getItem('key')

if (storedArrayString) {
  const storedArray = JSON.parse(storedArrayString);
  test = storedArray
} else {
  
  console.log("Array not found in local storage.");
}
;

console.log(test)
 







getData()





async function getData() {
    let url = ``
    let url2 = ``
    let url3 = ``

 

    

    
    
    if(input.value === '' || input.value === undefined ){
         url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=portland`
        url2 = `http://api.weatherapi.com/v1/astronomy.json?key=${apiKey}&q=portland&dt=2025-02-24`
        url3 = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=portland&days=5&aqi=yes&alerts=no
`
        

    } else {
         url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${input.value}`
        url2 = `http://api.weatherapi.com/v1/astronomy.json?key=${apiKey}&q=${input.value}&dt=2025-02-24`
        url3 = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${input.value}&days=5&aqi=yes&alerts=no`
    }

    try {
      
      const response = await fetch(url3);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
        
      }
      let inputRaw = input.value
      console.log(test.length)
      // this check if the input is empty the else at the end is for reset on first page load
      // i believe this i hope
      if(test.length > 2){
        test.shift()
        localStorage.setItem('key', JSON.stringify(test))
      }

        

      
      if(inputRaw.trim() !== ''){
          console.log(inputRaw)
          test.push(inputRaw)
          localStorage.setItem('key', JSON.stringify(test))
          }else if(test.length >= 1){
            console.log('does this thing work')
          } else{
          
          test.push('portland')
          localStorage.setItem('key', JSON.stringify(test))
        }

    
     
    // where we left off:
    // we are able to add to local storage on refresh and the old array stays(finally works)
    // we need to work on add the anchor tags the code we had before was creating a error
    // maybe we could grab each element with a helper function and anytime we push we run the function?

  console.log(test)

      
     

 
      
      
       


      const data3 = await response.json();
      document.querySelector('.first-forecast').innerHTML = data3.forecast.forecastday[1].day.condition.text
      document.querySelector('.first-img').src = data3.forecast.forecastday[1].day.condition.icon
      document.querySelector('.first-max-min').innerHTML = `${Math.round(data3.forecast.forecastday[1].day.maxtemp_f)}°/${Math.round(data3.forecast.forecastday[1].day.mintemp_f)}`
      
      document.querySelector('.second-forecast').innerHTML = data3.forecast.forecastday[2].day.condition.text
      document.querySelector('.second-img').src = data3.forecast.forecastday[2].day.condition.icon
      document.querySelector('.second-max-min').innerHTML = `${Math.round(data3.forecast.forecastday[2].day.maxtemp_f)}°/${Math.round(data3.forecast.forecastday[2].day.mintemp_f)}`
      
      document.querySelector('.third-forecast').innerHTML = data3.forecast.forecastday[3].day.condition.text
      document.querySelector('.third-img').src = data3.forecast.forecastday[3].day.condition.icon
      document.querySelector('.third-max-min').innerHTML = `${Math.round(data3.forecast.forecastday[3].day.maxtemp_f)}°/${Math.round(data3.forecast.forecastday[3].day.mintemp_f)}`

      document.querySelector('.fourth-forecast').innerHTML = data3.forecast.forecastday[4].day.condition.text
      document.querySelector('.fourth-img').src = data3.forecast.forecastday[4].day.condition.icon
      document.querySelector('.fourth-max-min').innerHTML = `${Math.round(data3.forecast.forecastday[4].day.maxtemp_f)}°/${Math.round(data3.forecast.forecastday[4].day.mintemp_f)}`

     
      
      } catch (error) {
        console.error(error.message);
        
        
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


