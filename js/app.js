/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

//restart initalize the array and all cards face down.
let iconArray = ['fa-diamond','fa-paper-plane-o','fa-anchor','fa-bolt','fa-cube','fa-anchor','fa-leaf','fa-bicycle','fa-diamond'
,'fa-bomb','fa-leaf','fa-bomb','fa-bolt','fa-bicycle','fa-paper-plane-o','fa-cube'];

let lastIcon = "";
let attempts = 0;


const buildCardGird = function() {
    let shuffledArray = shuffle(iconArray);
    let listElement = document.getElementsByClassName('deck');
    shuffledArray.forEach((item)=>{
        let liElement = document.createElement('li');
        liElement.setAttribute('class','card');
        let iconElement =  document.createElement('i');
        iconElement.setAttribute('class','fa ' + item);
        liElement.appendChild(iconElement);
        listElement[0].appendChild(liElement);
    });
    AddEventListeners();
}

const AddEventListeners = function() {
    let listElement = document.getElementsByClassName('deck');
    listElement[0].addEventListener('click',ShowCard);
}

const ShowCard = (event) => {
   let iconClicked = event.target.getElementsByTagName('i')[0].classList[1];
   console.log(iconClicked);
   event.target.setAttribute('class','card show');
}

buildCardGird();

const FlipAllCardsBack = function() {
    let allLiElements = document.querySelectorAll('.card');
    let countSpan = document.getElementsByClassName('moves');
    let starList = document.getElementsByClassName('stars');
    starList[0].innerHTML = "";
    countSpan[0].innerHTML = attempts;
    allLiElements.forEach((item)=>{
        item.setAttribute('class','card');
    });
}

let restartLink = document.getElementsByClassName('restart');
restartLink[0].addEventListener('click',FlipAllCardsBack);


        	//	<li><i class="fa fa-star"></i></li>
        	//	<li><i class="fa fa-star"></i></li>
        	//	<li><i class="fa fa-star"></i></li>
