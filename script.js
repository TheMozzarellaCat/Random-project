const gameContainer = document.querySelector(".game-container")
const gameWon = document.querySelector(".won-container")

const tileIcons = [
        'images/dropbox.png',
        'images/pinterest.png',
        'images/facebook.png',
        'images/instagram.png',
        'images/github.png',
        'images/messenger.png',
        'images/twitter.png',
        'images/whatsapp.png']

let tiles = []
let flippedTiles = []
let matchedTiles = 0

function initialize(){
    tiles = [...tileIcons, ...tileIcons]
    randomizeArray(tiles)
    matchedTiles = 0
    gameContainer.innerHTML = '';
    gameWon.style.display = "none"
    createTiles();
}

function randomizeArray(array){
    for(let i = array.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]
    }
    return
}

function createTiles(){
    tiles.forEach((value, index) =>{
        const tile = document.createElement('div')
        tile.classList.add('tile')
        tile.dataset.value = value;

        const front = document.createElement('div')
        front.classList.add('front')
        const frontImg = document.createElement('img');
        frontImg.src = value;
        front.appendChild(frontImg)

        const back = document.createElement('div')
        back.classList.add('back')
        back.textContent = '';


        tile.appendChild(front)
        tile.appendChild(back)
        tile.dataset.index = index
        tile.addEventListener('click', onTileClick)
        gameContainer.appendChild(tile)
    })
}
function onTileClick(e){
    const clickedTile = e.target.closest('.tile');
    if(clickedTile.classList.contains('flipped') || flippedTiles.length === 2){
        return
    }
    clickedTile.classList.add('flipped')
    flippedTiles.push(clickedTile)
    if(flippedTiles.length === 2){
        checkForMatch();
    }
}

function checkForMatch(){
    const [tile1, tile2] = flippedTiles;
    if(tile1.dataset.value === tile2.dataset.value){
        flippedTiles = []
        matchedTiles++
        if(matchedTiles === tileIcons.length){
            gameWon.style.display = "flex"
        }
    }else{
        setTimeout(()=>{
            tile1.classList.remove('flipped')
            tile2.classList.remove('flipped')
            flippedTiles = [];
        }, 1000)
    }
}

initialize();