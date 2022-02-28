export default class Meal extends Object {
  constructor(mealResult) {
    super();
    this.title = mealResult.meals[0].strMeal;
    this.category = mealResult.meals[0].strCategory;
    this.thumb = mealResult.meals[0].strMealThumb;
    this.source = mealResult.meals[0].strSource;
    this.youtube = mealResult.meals[0].strYoutube;
    this.instructions = mealResult.meals[0].strInstructions;
    this.ingredients = () => {
      let items = [];

      for (let i = 1; i < 20; i++) {
        const item = {
          ingredient: mealResult.meals[0][`strIngredient${i}`],
          measure: mealResult.meals[0][`strMeasure${i}`],
        };

        ingredients.push(item);
      }

      return items;
    };
  }

  logMeal() {
    console.log(this);
  }
}
