import Meal from "./Meal.js";

async function getMealData(food) {
  console.log("get meal data");
  const searchURL = encodeURI(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${food}`
  );

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
  newMeal.logMeal();
}

function initApp() {
  getMeal("Arrabiata");
}

document.addEventListener("readystatechange", (event) => {
  if (event.target.readyState === "complete") {
    initApp();
  }
});
