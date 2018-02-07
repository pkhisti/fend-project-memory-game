/*
* @description  - Display the cards on the page
                - shuffle the list of cards using the provided "shuffle" method below
                - loop through each card and create its HTML
                - add each card's HTML to the page
* @constructor - none
* @param {array} array - array of string, in this case icons
* Shuffle function from http://stackoverflow.com/a/2450976
*/
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

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
let iconArray = ['fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-anchor', 'fa-leaf', 'fa-bicycle', 'fa-diamond', 'fa-bomb', 'fa-leaf', 'fa-bomb', 'fa-bolt', 'fa-bicycle', 'fa-paper-plane-o', 'fa-cube'];

let lastIcon = "";
let attempts = 0;
let starRating = 3;

let seconds = null;
let ticker = null;

const startTimer= ( ) => {
    seconds = -1;
    ticker = setInterval("tick( )", 1000);
    tick( );
}

/*
* @description  - tick counter to evaluate the time elapsed
* @constructor - none
* @param - none
*/
const tick = ( ) => {
    ++seconds;
    let secs = seconds;
    let hrs = Math.floor( secs / 3600 );
    secs %= 3600;
    let mns = Math.floor( secs / 60 );
    secs %= 60;
    let pretty = ( hrs < 10 ? "0" : "" ) + hrs
               + ":" + ( mns < 10 ? "0" : "" ) + mns
               + ":" + ( secs < 10 ? "0" : "" ) + secs;
    document.getElementById("timer").innerHTML = pretty;
}

const BuildCardGird = function() {
    let shuffledArray = shuffle(iconArray);
    let listElement = document.getElementsByClassName('deck');
    shuffledArray.forEach((item) => {
        let liElement = document.createElement('li');
        liElement.setAttribute('class', 'card');
        liElement.addEventListener('click', ShowCard);
        let iconElement = document.createElement('i');
        iconElement.setAttribute('class', 'fa ' + item);
        liElement.appendChild(iconElement);
        listElement[0].appendChild(liElement);
        startTimer();
    });
}

const ShowCard = (event) => {
    let iconClicked = event.target.getElementsByTagName('i')[0].classList[1];
    let lastCard = document.getElementsByClassName('show')[0];
    if (lastIcon == "") {
        lastIcon = iconClicked;
        event.target.setAttribute('class', 'card show');
        event.target.removeEventListener('click', ShowCard)
    } else if (lastIcon == iconClicked) {
        AddCount();
        event.target.setAttribute('class', 'card match');
        event.target.removeEventListener('click', ShowCard)
        lastCard.setAttribute('class', 'card match');
        lastCard.removeEventListener('click', ShowCard)
        lastIcon = "";
    } else {
         AddCount();
        lastIcon = "";
        event.target.setAttribute('class', 'card show');
        setTimeout(function() {
            event.target.setAttribute('class', 'card error');
            lastCard.setAttribute('class', 'card error');
        }, 500);
        setTimeout(function() {
            event.target.setAttribute('class', 'card');
            lastCard.setAttribute('class', 'card');
            event.target.addEventListener('click', ShowCard)
            lastCard.addEventListener('click', ShowCard)
        }, 500);
    }
    checkWinner();
}

const checkWinner = () => {
    let allCards = document.getElementsByClassName('match');
    if (allCards.length == 16) {
        let resutlDiv = document.getElementById("result-container");
        resutlDiv.setAttribute('class', 'container result-box');
        let mainDiv = document.getElementById("game-container");
        mainDiv.setAttribute('class', 'container hidden');
        let moveResult = document.getElementById("results");
        moveResult.innerHTML = attempts;
        let starResult = document.getElementById("rating");
        starResult.innerHTML = starRating;
        let timeTakenResult = document.getElementById("timetaken");
        timeTakenResult.innerHTML =  document.getElementById("timer").textContent;

    }
}

const AddCount = () => {
    attempts = attempts + 1;
    let countSpan = document.getElementsByClassName('moves');
    countSpan[0].innerHTML = attempts;
    if (attempts > 5 && attempts <= 15) {
        let starListItem = document.getElementsByClassName('stars')[0].getElementsByTagName("li")[2];
        starListItem.getElementsByTagName('i')[0].setAttribute('class', 'fa fa-star-o');
        starRating = 2;
    } else if (attempts > 15) {
        let starListItem = document.getElementsByClassName('stars')[0].getElementsByTagName("li")[1];
        starListItem.getElementsByTagName('i')[0].setAttribute('class', 'fa fa-star-o');
        starRating = 1;
    }
}

const ResetCardsBack = () => {
    attempts = 0;
    let countSpan = document.getElementsByClassName('moves');
    countSpan[0].innerHTML = attempts;
    let starList = document.getElementsByClassName('stars')[0].getElementsByTagName('li');
    for (let i = 0; i < starList.length; i++) {
        starList[i].getElementsByTagName('i')[0].setAttribute('class', 'fa fa-star')
    }
    seconds = null;
    ticker = null;

    var lis = document.querySelectorAll('.deck li');
    for(var i=0; li=lis[i]; i++) {
        li.parentNode.removeChild(li);
    }

    BuildCardGird();

}

const PlayAgain = () => {
    let resutlDiv = document.getElementById("result-container");
    resutlDiv.setAttribute('class', 'container hidden');
    let mainDiv = document.getElementById("game-container");
    mainDiv.setAttribute('class', 'container');
    ResetCardsBack();
    location.reload();
}

let restartLink = document.getElementsByClassName('restart');
restartLink[0].addEventListener('click', ResetCardsBack);

let playAgaibutton = document.getElementsByClassName("playagain-button")[0];
playAgaibutton.addEventListener('click', PlayAgain);

BuildCardGird();