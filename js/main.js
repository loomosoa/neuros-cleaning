// function buyClicked(){
//     console.log('buy btn clicked') 
// }
// function downloadZazhizhennost() {
//     console.log('try to download Zazhizhennost')

//     window.open('audio/Zazhizhennost.mp3');
// }

// TODO: remove
// fetch('https://ipapi.co/json/', { mode: 'no-cors', crossOriginResourcePolicy: false})
//   .then(function(response) {
//     return response.json();
//   })
//   .then(function(data) {
//     console.log(data);
//   });

// fetch('https://ipapi.co/json/', )
// .then(function(response) {
//   return response.json();
// })
// .then(function(data) {
//   console.log(data);
// });



// lang resolve:

// 1. images
// 2. texts
// 3. payment method 
// 4. audio
// 5. youtube video

console.log("Hmm");


// #####################
// DETECT IP country, for resolving financial instrument
// #####################
var countryCode = "RU"
fetch('https://ipapi.co/176.124.146.179/json/', )
// fetch('https://ipapi.co/8.8.8.8/json/', )
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    
    if (data.country_code != "RU") {
      countryCode = "EN"        
    }     
});


// #####################
// DETECT browser-locale
// #####################
function getBrowserLocales(options = {}) {
  const defaultOptions = {
    languageCodeOnly: false,
  };
  const opt = {
    ...defaultOptions,
    ...options,
  };
  const browserLocales =
    navigator.languages === undefined
      ? [navigator.language]
      : navigator.languages;
  
  if (!browserLocales) {
    return undefined;
  }
  
  return browserLocales.map(locale => {
    const trimmedLocale = locale.trim();
    return opt.languageCodeOnly
      ? trimmedLocale.split(/-|_/)[0]
      : trimmedLocale;
  });  
}



// const translations = {
//   // English translations
//   "en": {
//     "symptoms-title": "Symptoms of neurosis",
//     "t1-what-want": "1. What do I really want?",
//     "t1-1":"If I had the necessary financial resources, time, security - what would I do?"
//   },
//   // Russian translations
//   "ru": {
//     "symptoms-title": "Симптомы невроза",
//     "t1-what-want": "1. Чего я хочу на самом деле?",
//     "t1-1":"Если бы у меня были необходимые финансовые средства, время, безопасность - что я бы делал?"
//   },
// };

function setImgElementLocale(element){
  // console.log('data-src element');
  let locale = getCurrentLocale();
  // console.log(element);
  // console.log(element.dataset.src);

  let imgUrlArray = element.dataset.src.split('/');
  imgUrlArray[1] = locale; 
  element.dataset.src = imgUrlArray.join('/');

  // console.log(element.dataset.src);

}

function getCurrentLocale() {
  // var locales = getBrowserLocales();    
  // let locale = locales[0].substring(0,2);

  let locale = navigator.language.substring(0,2);
  
  return locale;
  // return "ru";
}



let res = document.addEventListener("DOMContentLoaded", () => {
  
  document    
    .querySelectorAll("[data-src]")
    .forEach(setImgElementLocale);

    // #####################
    // make lazy loading of the images
    // #####################
    var lazyLoadInstance = new LazyLoad({
      // Your custom settings go here
    });
    lazyLoadInstance.update();

    // document
    // // Find all elements that have the key attribute
    // .querySelectorAll("[data-i18n-key]")
    // .forEach(translateElement);

});



const defaultLocale = getCurrentLocale();
let locale;
let translations = {};

document.addEventListener("DOMContentLoaded", () => {
  
  setLocale(defaultLocale);
});


// Load translations for the given locale and translate
// the page to this locale
async function setLocale(newLocale) {

  if (newLocale === locale) return;
  
  const newTranslations = await fetchTranslationsFor(newLocale);
  
  locale = newLocale;
  
  translations = newTranslations;
  
  translatePage();
}

// Retrieve translations JSON object for the given
// locale over the network
async function fetchTranslationsFor(newLocale) {
  const response = await fetch(`/lang/${newLocale}.json`);
  return await response.json();
}

// Replace the inner text of each element that has a
// data-i18n-key attribute with the translation corresponding
// to its data-i18n-key
function translatePage() {
  document
    .querySelectorAll("[data-i18n-key]")
    .forEach(translateElement);
}

function translateElement(element) { 
  const key = element.getAttribute("data-i18n-key");
  const translation = translations[key];
  element.innerText = translation;
}





























// #####################
// resolve buy button behaviour
// #####################

const paymentMade = function() {
  const downloadBought = document.getElementById('download_bought');   
  downloadBought.style.display = 'flex';
  btn.style.display = 'none';    

  console.log("Payment made, country code: ", countryCode)
}

const btn = document.getElementById('buy_btn_div');

    btn.addEventListener('click', () => {


      if (countryCode == "RU") {

        //Юкасса trigger

        paymentMade();

      } else {

        //paddle trigger

        paymentMade();
      }

});

















