const button = document.querySelectorAll("button");
const displayEml = document.querySelector("#result");
const symbols = ["+", "-", "*", "/", "%"];

let textToDisplay = "";

button.forEach((btn) => {
  btn.addEventListener("click", () => {
    const val = btn.innerText;
    displayEml.style.backgroundColor = "";
    displayEml.style.color = "";

    const lastChar = textToDisplay[textToDisplay.length - 1];

    //if . exist, don't let user enter another
    if (val === "." && textToDisplay.includes(".")) return;

    // if (val === "." && textToDisplay.repeat(".")) return;
    //don't allow to click on symbols at the beginning
    if (textToDisplay.length < 1 && symbols.includes(val)) return;

    //if operator already exists , replace it with new one

    if (symbols.includes(lastChar) && symbols.includes(val)) {
      textToDisplay = textToDisplay.slice(0, -1);
      //remove last symbol from string and add incoming operator
      //   textToDisplay += val;
    }

    //AC clears value from the Display
    if (val === "AC") {
      return resetDisplay();
    }

    //Shows the calculated value
    if (val === "=") {
      //check if the last character is a symbol

      if (symbols.includes(lastChar)) {
        textToDisplay = textToDisplay.slice(0, -1);
      }
      return onTotal();
    }

    //cut the last character from the display
    if (val === "C") {
      textToDisplay = textToDisplay.slice(0, -1);
      return display(textToDisplay);
    }

    // takes the history and calculates

    // display the value om the display
    textToDisplay += val;
    display(textToDisplay);
  });
});

const display = (toDisplay) => {
  displayEml.innerText = toDisplay || "0.00";
};

//calculation
const onTotal = () => {
  const prankNum = randomNumber();

  if (prankNum > 0) {
    //animation
    displayEml.style.backgroundColor = "red";
    displayEml.style.color = "orange";

    displayEml.classList.add("Prank");
    displayEml.addEventListener("animationend", () => {
      displayEml.classList.remove("Prank");
    });
  }
  const total = eval(textToDisplay) + prankNum;
  display(total);
  textToDisplay = "";
};

//function reset display

const resetDisplay = () => {
  display("0.00");
  textToDisplay = "";
};

///create random number
const randomNumber = () => {
  const num = Math.round(Math.random() * 10); //0-10
  return num < 8 ? num : 0;
};
