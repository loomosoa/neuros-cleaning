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

console.log("Hmm2");

// TODO: выгрузить смол версию схемки


// #####################
// DETECT IP country, for resolving financial instrument
// #####################
var countryCode = "RU"
fetch('https://ipapi.co/json/', )
// fetch('https://ipapi.co/8.8.8.8/json/', )
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    
    if (data.country_code != "RU") {
      countryCode = "RU"
    }     

    console.log("data, my ip", data)
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



function setImgElementLocale(element){
  let locale = getCurrentLocale();
  
  let imgUrlArray = element.dataset.src.split('/');
  imgUrlArray[1] = locale; 
  element.dataset.src = imgUrlArray.join('/');
}

function getCurrentLocale() {
  let locale = navigator.language.substring(0,2); 

  if (localStorage.getItem("lang")) {
    locale = localStorage.getItem("lang");
  } 

  return locale;
}


// document.querySelectorAll(".lang-code").forEach(changeLanguage);

function changeLanguage(element) {

  element.addEventListener('click', function handleClick() {
    localStorage.setItem("lang", this.dataset.lang);
    
    setLocale(this.dataset.lang);
    updateImgsLazy();
    
    location.reload();
   });
}


function updateImgsLazy() {
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
}


document.addEventListener("DOMContentLoaded", () => {
  
  updateImgsLazy();

});



const defaultLocale = getCurrentLocale();
let locale;
let translations = {};

// document.addEventListener("DOMContentLoaded", () => {
  
//   setLocale(defaultLocale);
// });


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
  const response = await fetch(`lang/${newLocale}.json`);
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

















