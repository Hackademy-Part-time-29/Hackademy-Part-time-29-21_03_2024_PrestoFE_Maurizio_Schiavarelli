let navbar = document.querySelector('#navbar');
let wrapperArticoli = document.querySelector("#wrapperArticoli");
let accordionBody = document.querySelector('#accordionBody');
let priceInput = document.querySelector('#priceInput');
let priceInputValue = document.querySelector('#priceInputValue');
let inputWord= document.querySelector('#inputWord');


window.addEventListener('scroll',()=>{
    if(window.scrollY > 0){
        navbar.classList.add('navbarScroll');
        navContainer.classList.add('nav');
    }else{
        navbar.classList.remove('navbarScroll');
        navContainer.classList.remove('nav');
    };
});

fetch('./annunci.json').then((response) => response.json()).then((data)=>{


    function troncaParole(stringa){
        if(stringa.length > 10){
            return stringa.split(' ')[0]+ '...'
        }else{
            return stringa
        };
    };

   

    function generaCard (data){
        wrapperArticoli.innerHTML = "";
        data.forEach((article)=>{
        let cardArticolo = document.createElement('div');
        cardArticolo.classList.add('cardArticoli');
        cardArticolo.classList.add('col33');
        cardArticolo.innerHTML = `
        <h2 title="${article.name}">${troncaParole(article.name)}</h2>
        <p>${article.category}</p>
        <p>${article.price}</p>
        <i class="${favourites.includes(article.id.toString()) ? 'fa-solid' : 'fa-regular' } fa-heart" id='${article.id}'></i>
        `
        wrapperArticoli.appendChild(cardArticolo);
    });
    let heartIcons = document.querySelectorAll('.fa-heart');
    heartIcons.forEach((icon)=>{
        icon.addEventListener('click',()=>{
            if(!favourites.includes(icon.id)){
                favourites.push(icon.id)
            }else{
                let index = favourites.indexOf(icon.id)
                favourites.splice(index, 1)
            };
            globalFilter()
        });
    });
    };

    function generaRadio (){
        let categoria = data.map((articolo)=> articolo.category);
        let occorrenzaCategoria = [];

        categoria.forEach((category)=>{
            if(!occorrenzaCategoria.includes(category)){
                occorrenzaCategoria.push(category)
            };
        });
        
        occorrenzaCategoria.forEach((category)=>{
            let divRadio = document.createElement('div');
            divRadio.classList.add('form-check');
            divRadio.innerHTML =`
                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="${category}">
                    <label class="form-check-label" for="${category}">
                      ${category}
                    </label>
            `
            accordionBody.appendChild(divRadio);
        });
    
    };
    

    function filtraPerCategoria (array){
        let selectedButton = Array.from(radioButton).find((button)=>button.checked);
        category = selectedButton.id;
        if(category == 'all'){
            return array;
        }else if(category == 'favourites' ){
            let filtered = array.filter((article) => favourites.includes(article.id.toString()));
            return filtered;
        }else{
            let filtered = array.filter((article) => article.category == category);
            return filtered}
    }
        
        
    

    function filtraPerPrezzo(){
        let price = data.map((annuncio)=> +annuncio.price);
        price.sort((a,b)=> a-b);
        let maxPrice = price.pop();
        let minPrice = price.shift();
        priceInput.max = maxPrice;
        priceInput.min = minPrice;
        priceInput.value = maxPrice;
        priceInputValue.innerHTML = maxPrice
    };

    function filterByPrice (array){
        let filtered = array.filter((articolo) => +articolo.price <= +priceInput.value);
        return filtered;
    };
    

    function filterByWord (array){
        let filtered = array.filter((annuncio)=>annuncio.name.toLowerCase().includes(inputWord.value.toLowerCase()));
        return filtered
    }

    



function globalFilter(){
    let filtraPerCategoria1 = filtraPerCategoria(data);
    let filteredByCategoryAndPrice = filterByPrice(filtraPerCategoria1);
    let filteredByCategoryAndPriceAndWord = filterByWord(filteredByCategoryAndPrice);
    generaCard(filteredByCategoryAndPriceAndWord);
}

let favourites = [];
generaCard(data);   
generaRadio();
filtraPerPrezzo()

let radioButton = document.querySelectorAll('.form-check-input');
radioButton.forEach((button)=>{
    button.addEventListener('click',()=>{
        globalFilter()
    });
});

priceInput.addEventListener('input',()=>{
    globalFilter();
    priceInputValue.innerHTML = priceInput.value
});

inputWord.addEventListener('input',()=>{
    globalFilter();
});

});


    