const gameContainer = document.getElementById("game");
let selectedCard = null;
let flippedCounter = 0;
let matchArray = [];
var card1 = null;
var card2 = null;
allCards = document.querySelectorAll("div");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  if (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
  function handleCardClick(event) {
    flippedCounter += 1;

    if(flippedCounter <= 2){
      let selectedCard = event.target;
      //remove event listener and add backgroundColor
      selectedCard.removeEventListener("click", handleCardClick);
      selectedCard.style.backgroundColor = selectedCard.classList[0];

      if(flippedCounter === 1){
        card1 = event.target;
        return;
      }

      if(flippedCounter === 2){
        card2 = event.target;
        if(card1.style.backgroundColor === card2.style.backgroundColor){
          console.log("match")
        }
        else{
          console.log("no match")
          gameContainer.style.pointerEvents = "none";
          setTimeout(
                function(){
                card1.style.backgroundColor = "";
                card1.addEventListener("click", handleCardClick);
                card2.style.backgroundColor = "";
                card2.addEventListener("click", handleCardClick);
                gameContainer.style.pointerEvents = "auto";
              }
              ,1000)
            }
        }
        flippedCounter = 0;
      }
    }


// when the DOM loads
createDivsForColors(shuffledColors);
