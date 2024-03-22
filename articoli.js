let navbar = document.querySelector('#navbar');
let wrapperArticoli = document.querySelector("#wrapperArticoli");
let accordionBody = document.querySelector('#accordionBody');
let priceInput = document.querySelector('#priceInput');
let priceInputValue = document.querySelector('#priceInputValue');
let inputWord= document.querySelector('#inputWord');


// window.addEventListener('scroll',()=>{
//     if(window.scrollY > 0){
//         navbar.classList.add('navbarScroll');
//         navContainer.classList.add('nav');
//     }else{
//         navbar.classList.remove('navbarScroll');
//         navContainer.classList.remove('nav');
//     };
// });

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
        `
    wrapperArticoli.appendChild(cardArticolo);
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
    function filteByWord (parola){
        let filtered = data.filter((annuncio)=>annuncio.name.toLowerCase().includes(parola.toLowerCase()));
        generaCard(filtered)
    }

    function filtraPerCategoria(category){
        if(category != 'all'){
            let filtered = data.filter((articolo)=>articolo.category == category);
            generaCard(filtered);  
        }else{
            generaCard(data)
        }
        
        
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


function filterByPrice (){
    let filtered = data.filter((articolo) => +articolo.price <= +priceInput.value);
    generaCard(filtered)
};

generaCard(data);   
generaRadio();
filtraPerPrezzo()

let radioButton = document.querySelectorAll('.form-check-input');
radioButton.forEach((button)=>{
    button.addEventListener('click',()=>{
        filtraPerCategoria(button.id);
    });
});

priceInput.addEventListener('input',()=>{
    filterByPrice();
    priceInputValue.innerHTML = priceInput.value
})

inputWord.addEventListener('input',()=>{
    filteByWord(inputWord.value);
})

});


    