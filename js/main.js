// MODEL

let dogName;

async function fillList() {
    let response = await fetch('https://dog.ceo/api/breeds/list/all');
    let data = await response.json();
    render(Object.keys(data.message));
}

function setDog(e) {
    dogName = e.target.value;
    if (dogName != 'Choose Your Breed') {
        getDog();
    } else {
        clearImg();
    }
}

async function getDog() {
    let response = await fetch('https://dog.ceo/api/breed/'+ dogName +'/images');
    let data = await response.json();
    renderDog(data.message);
}

function clearImg() {
    dogImg.innerHTML = '';
}

function styleImg() {
    dogImg.style.cssText = 'display: grid; grid-template-columns: repeat( auto-fit, minmax(250px, 300px) ); gap: 10px;';
}








// CONTROLLER
let mainOption = document.querySelector('.main-option');
let dogImg = document.querySelector('.dog-img');

fillList();
styleImg();













// VIEW

function render(list = '') {
    let select = document.createElement("select");
    let optionTitle = document.createElement("option");

    select.setAttribute('id', 'selectDog');
    optionTitle.innerText = 'Choose Your Breed';
    optionTitle.selected = true;
    list.forEach(element => {
        let option = document.createElement("option");
        option.innerText = element;
        select.appendChild(option); 
    });

    select.prepend(optionTitle);
    mainOption.appendChild(select);

    document.querySelector('#selectDog').addEventListener('change',setDog);
}

function renderDog(images) {
    clearImg();
    images.forEach( (img, i) => {
        let createImg = document.createElement('img');
        createImg.src = img;
        createImg.style.cssText = 'opacity : 0; transition : opacity 2s; width: 100%;';
        dogImg.appendChild(createImg);
        setTimeout(function(){ createImg.style.opacity = '1'; }, i * 1000);
    })
}