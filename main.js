// cattura elementi
let navbar = document.querySelector('#navbar');
let navContainer = document.querySelector('#navContainer');
let swiperWrapper = document.querySelector('#swiperWrapper');

window.addEventListener('scroll',()=>{
    if(window.scrollY > 0){
        navbar.classList.add('navbarScroll');
        navContainer.classList.add('nav');
    }else{
        navbar.classList.remove('navbarScroll');
        navContainer.classList.remove('nav');
    }
});

let recensioni = [
    {utente : 'mario', commento : 'sito molto bello', voto : 2},
    {utente : 'mirko', commento : 'sito molto bellissimo', voto : 5},
    {utente : 'michele', commento : 'sito meno bello', voto : 3},
    {utente : 'naomi', commento : 'sito rotto', voto : 2},
    {utente : 'maurizio', commento : 'sito cosi cosi', voto : 1},
];

// generazione card recensini

recensioni.forEach((recensione)=>{
    let divRecensioni = document.createElement('div');
    divRecensioni.classList.add('swiper-slide');
    divRecensioni.innerHTML = ` 
    <h3>${recensione.utente}</h3>
    <p>
      ${recensione.commento}
    </p>
    <span
      ><i
        class="${recensione.voto > 0 ? 'fa-solid' : 'fa-regular'} fa-star fa-lg"
        style="color: #ffd43b"
      ></i
      ><i
        class="${recensione.voto > 1 ? 'fa-solid' : 'fa-regular'} fa-star fa-lg"
        style="color: #ffd43b"
      ></i
      ><i
        class="${recensione.voto > 2 ? 'fa-solid' : 'fa-regular'} fa-star fa-lg"
        style="color: #ffd43b"
      ></i
      ><i
        class="${recensione.voto > 3 ? 'fa-solid' : 'fa-regular'} fa-star fa-lg"
        style="color: #ffd43b"
      ></i
      ><i
        class="${recensione.voto > 4 ? 'fa-solid' : 'fa-regular'} fa-star fa-lg"
        style="color: #ffd43b"
      ></i>
    </span>
    `
    swiperWrapper.appendChild(divRecensioni);
});



const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
  
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  
    // And if we need scrollbar
    scrollbar: {
      el: '.swiper-scrollbar',
    },
  });