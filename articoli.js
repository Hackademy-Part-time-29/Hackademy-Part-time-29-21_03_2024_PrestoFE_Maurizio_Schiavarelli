let navbar = document.querySelector('#navbar');
let wrapperArticoli = document.querySelector("#wrapperArticoli")

window.addEventListener('scroll',()=>{
    if(window.scrollY > 0){
        navbar.classList.add('navbarScroll');
        navContainer.classList.add('nav');
    }else{
        navbar.classList.remove('navbarScroll');
        navContainer.classList.remove('nav');
    }
});

fetch('./annunci.json').then((response) => response.json()).then((data)=>{

function generaCard (data){
    data.forEach((articolo)=>{
        let cardArticolo = document.createElement('div');
        cardArticolo.classList.add('cardArticoli');
        cardArticolo.classList.add('col33');
        cardArticolo.innerHTML = `
        <h2>nome articolo</h2>
        <p>categoria</p>
        <p>prezzo</p>
        `
    wrapperArticoli.appendChild(cardArticolo);
    });
};

generaCard(data)

});