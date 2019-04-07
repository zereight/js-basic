const body = document.querySelector("body");



function paintImage(imageNumber){
    const image = new Image();
    image.src = `images/${imageNumber}.jpg`;
    image.classList.add("bgImg");
    body.appendChild(image);
}

function genRandom(){
    const number = Math.floor(Math.random() * 3) + 1 ; // 1~3
    return number;
}

function init(){
    const randomNumber = genRandom();
    paintImage(randomNumber);
}

init();