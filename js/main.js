import Meal from "./Meal.js";
import Voice from "./Voice.js";

const voice = new Voice();

async function getMealData(food) {
  // Prepare to create URL
  let searchURL;

  // If a food was provided, search for it
  if (food) {
    searchURL = encodeURI(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${food}`
    );
  }
  // If no food is specified, get a random dish
  else {
    searchURL = encodeURI("https://www.themealdb.com/api/json/v1/1/random.php");
  }
  // TODO what to do if no result is returned for the searched dish?
  try {
    const response = await fetch(searchURL);
    if (!response.ok) throw new Error("Status code not in 200-299 range");
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

async function getMeal(food) {
  const result = await getMealData(food);
  const newMeal = new Meal(result);
  document.body.appendChild(newMeal.html());
  voice.speak(newMeal.title);
  voice.speak(newMeal.category);
  voice.speak(newMeal.instructions);
}

async function getRandomMeal() {
  const result = await getMealData();
  const newMeal = new Meal(result);
  document.body.appendChild(newMeal.html());
  voice.speak(newMeal.title);
  voice.speak(newMeal.category);
  voice.speak(newMeal.instructions);
}

function initApp() {
  voice.speak("Welcome to the menu reader app");
  getRandomMeal();
  /* getMeal("Arrabiata"); */
}

document.addEventListener("readystatechange", (event) => {
  if (event.target.readyState === "complete") {
    initApp();
  }
});
