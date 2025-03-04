import {
    apiKey
} from "./api-keys.js"

document.querySelector('button').addEventListener('click', getData)
document.querySelector('.dark').addEventListener('click', dark)
let input = document.getElementById('search')
let btn = document.getElementById('searchBtn')
let a0 = document.querySelector('.a0')
let a1 = document.querySelector('.a1')
// let a0 = document.querySelector('.a0')
const image = document.getElementById('myImage');
const lightBackground = '#F8F9FA'
const lightFont = '#212121'
const lightHover = '#2196F3'
const darkBackground = '#1A1A1A'
const darkFont = '#E0E0E0'
const darkHover = '#1E3A8A'

// todos:
// 🎉 feature complete🎉
//  i dont want to deal with if there is only 2 search so lets just try hard coding in 3 recent search idk
// we need to add a3 for colors
// also add the light hover to the btn hover
// figugre out the rest of the site
// add placeholder for everything incase api is down
// then we can move to styles and ui watch the websites playlist

let test = []
let color = localStorage.getItem("color");

if(color ==='light'){
  localStorage.setItem('color', color)
  document.body.style.backgroundColor = lightBackground;
    document.body.style.color = lightFont;
    input.style.outline = "1px solid black"; 
    btn.style.outline = "1px solid black"; 
    a0.style.color = lightFont
    a1.style.color = lightFont
    document.documentElement.style.setProperty("--hover-color", lightHover);
    
}else {
  localStorage.setItem('color', 'black')
  document.body.style.backgroundColor = darkBackground
    document.body.style.color = darkFont
    a0.style.color = darkFont
    a1.style.color = darkFont
    document.documentElement.style.setProperty("--hover-color", darkHover);
}





function dark(){
   if(color === 'light'){
    
    localStorage.setItem('color', 'black')
    color = localStorage.getItem("color")
    document.body.style.backgroundColor = darkBackground
    document.body.style.color =  darkFont
    a0.style.color = darkFont
    a1.style.color = darkFont
    document.documentElement.style.setProperty("--hover-color", darkHover);
   }else{
   
    localStorage.setItem('color', 'light')
    color = localStorage.getItem("color")
    document.body.style.backgroundColor = lightBackground
    document.body.style.color = lightFont
    a0.style.color = lightFont
    a1.style.color = lightFont
    document.documentElement.style.setProperty("--hover-color", lightHover);
    
   }
  
}

 

const storedArrayString = localStorage.getItem('key')

if (storedArrayString) {
  const storedArray = JSON.parse(storedArrayString);
  test = storedArray
} else {
  
  console.log("Array not found in local storage.");
}
;



getData()


function recentSearch(zb){
        
        getRecent(zb)
        }


async function getRecent(zb) {
  try {
      let url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${test[zb]}&days=5&aqi=yes&alerts=no`
      

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
      
    }
    const data4 = await response.json()
    
    document.querySelector('.first-forecast').innerHTML = data4.forecast.forecastday[1].day.condition.text
    document.querySelector('.first-img').src = data4.forecast.forecastday[1].day.condition.icon
    document.querySelector('.first-max-min').innerHTML = `${Math.round(data4.forecast.forecastday[1].day.maxtemp_f)}°/${Math.round(data4.forecast.forecastday[1].day.mintemp_f)}`
    
    document.querySelector('.second-forecast').innerHTML = data4.forecast.forecastday[2].day.condition.text
    document.querySelector('.second-img').src = data4.forecast.forecastday[2].day.condition.icon
    document.querySelector('.second-max-min').innerHTML = `${Math.round(data4.forecast.forecastday[2].day.maxtemp_f)}°/${Math.round(data4.forecast.forecastday[2].day.mintemp_f)}`
    
    document.querySelector('.third-forecast').innerHTML = data4.forecast.forecastday[3].day.condition.text
    document.querySelector('.third-img').src = data4.forecast.forecastday[3].day.condition.icon
    document.querySelector('.third-max-min').innerHTML = `${Math.round(data4.forecast.forecastday[3].day.maxtemp_f)}°/${Math.round(data4.forecast.forecastday[3].day.mintemp_f)}`

    document.querySelector('.fourth-forecast').innerHTML = data4.forecast.forecastday[4].day.condition.text
    document.querySelector('.fourth-img').src = data4.forecast.forecastday[4].day.condition.icon
    document.querySelector('.fourth-max-min').innerHTML = `${Math.round(data4.forecast.forecastday[4].day.maxtemp_f)}°/${Math.round(data4.forecast.forecastday[4].day.mintemp_f)}`

    
  
  }catch (error) {
      console.error(error.message);
      
      
    }
    try {
      let url2 = `http://api.weatherapi.com/v1/astronomy.json?key=${apiKey}&q=${test[zb]}&dt=2025-02-24`
    
    const response = await fetch(url2);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
      
    }
    const data5 = await response.json()

  // filters out the 0 from times ex: 06:24 am => 6:24 am using function removeZero
  let f = data5.astronomy.astro.sunrise.split('')
  document.querySelector('.sunrise').innerHTML = ` ${removeZero(f)} `

 let z = data5.astronomy.astro.sunset.split('')
 document.querySelector('.sunset').innerHTML = `${removeZero(z)}`

 let k = data5.astronomy.astro.moonrise.split('')
 document.querySelector('.moonrise').innerHTML = ` ${removeZero(k)}`

//  adding the moon pic
 let moonStuff = data5.astronomy.astro.moon_phase
 let moonPhase = moonStuff.toLowerCase()

  
 if(moonPhase == 'new moon'){
   document.querySelector('.moonPhase').innerHTML = `${data5.astronomy.astro.moon_phase} 🌑`
 } else if (moonPhase == 'waxing cresent'){
   document.querySelector('.moonPhase').innerHTML = `${data5.astronomy.astro.moon_phase} 🌒`
 } else if (moonPhase == 'first quarter'){
   document.querySelector('.moonPhase').innerHTML = `${data5.astronomy.astro.moon_phase} 🌓`
 } else if (moonPhase == 'waxing gibbous'){
   document.querySelector('.moonPhase').innerHTML = `${data5.astronomy.astro.moon_phase} 🌔`
 } else if (moonPhase == 'full moon'){
   document.querySelector('.moonPhase').innerHTML = `${data5.astronomy.astro.moon_phase} 🌔`
 } else if (moonPhase == 'waning gibbous'){
   document.querySelector('.moonPhase').innerHTML = `${data5.astronomy.astro.moon_phase} 🌖`
 } else if (moonPhase == 'last quarter'){
   document.querySelector('.moonPhase').innerHTML = `${data5.astronomy.astro.moon_phase} 🌗`
 } else if (moonPhase == 'waning crescent'){
   document.querySelector('.moonPhase').innerHTML = `${data5.astronomy.astro.moon_phase} 🌘`
 } 
  
  }
    catch (error) {
      console.error(error.message);
      
      
    }
    try { 
      let url3 = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${test[zb]}&days=5&aqi=yes&alerts=no`
      const response = await fetch(url3);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
      
    }
    const data6 = await response.json()
    let currentTemp = Math.round(data6.current.temp_f)
    let feelsLike = Math.round(data6.current.feelslike_f)
    let imgHeader = data6.current.condition.text
    let img = data6.current.condition.icon

    image.src = img;
    document.querySelector('.dewPoint').innerHTML = `${data6.current.dewpoint_f} °F`
    document.querySelector('.gustMph').innerHTML = ` ${data6.current.gust_mph
    } mph`
   
    document.querySelector('.currentTemp').innerHTML = `${currentTemp}°F / Feels like ${feelsLike}°F`
    document.querySelector('.imgHeader').innerHTML = imgHeader
    document.querySelector('.location').innerHTML = data6.location.name
    let locationcountry = ''
    
    if( data6.location.name === data6.location.region){
      document.querySelector('.location').innerHTML = `${data6.location.name} / ${data6.location.country} `
      locationcountry = data6.location.country
    } else if(data6.location.country === "United States of America") {
      document.querySelector('.location').innerHTML = `${data6.location.name} / ${data6.location.region
      } `
      locationcountry = data6.location.region
    } else {
      document.querySelector('.location').innerHTML = `${data6.location.name} / ${data6.location.country
      } `
      locationcountry = data6.location.country
    }
    
      document.querySelector('.humidity').innerHTML = `Humidity: ${data6.current.humidity}%`

    
   
   
    input.placeholder = `${data6.location.name}, ${locationcountry}`
    

    
    }
    catch (error) {
      console.error(error.message);
      
      
    }



}



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
      if(test.length > 2 ){
        test.shift()
        localStorage.setItem('key', JSON.stringify(test))
      }


          
       document.querySelector('.a0').addEventListener('click', function(){
        recentSearch(0)
       })
       document.querySelector('.a1').addEventListener('click', function(){
        recentSearch(1)
       })
       document.querySelector('.a2').addEventListener('click', function(){
        recentSearch(2)
       })
     

      



      let inputRaw = input.value
      
      // this check if the input is empty the else at the end is for reset on first page load
      // i believe this i hope
      

        

      
      if(inputRaw.trim() !== ''){
          test.push(inputRaw)
          localStorage.setItem('key', JSON.stringify(test))
          }else if(test.length >= 1){
            
          } else{
          test.push('portland')
        
          localStorage.setItem('key', JSON.stringify(test))
        
        }
       
        if(test.length === 1){
          document.querySelector('.a0').innerHTML = test[0]
        }else if(test.length == 2){
          document.querySelector('.a0').innerHTML = test[0]
          document.querySelector('.a1').innerHTML = test[1]
        }else if(test.length === 3){
          document.querySelector('.a0').innerHTML = test[0]
          document.querySelector('.a1').innerHTML = test[1]
          document.querySelector('.a2').innerHTML = test[2]
        }
        
       
    // ok the recent search that are valid will update the recent searchs 
    // we now need to add a event listerner to the a tags that create a new fetch
    // im thinking about adding a parameter to the fetch then checking if there is one then
    // use the given value maybe??


  

      
     

 
      
      
       


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


