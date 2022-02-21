export default class Meal extends Object {
  constructor(mealResult) {
    super();
    this.title = mealResult.strMeal;
    this.category = mealResult.strCategory;
    this.thumb = mealResult.strMealThumb;
    this.source = mealResult.strSource;
    this.youtube = mealResult.strYoutube;
    this.instructions = mealResult.strInstructions;
    this.ingredients = () => {
      let items = [];

      for (let i = 1; i < 20; i++) {
        const item = {
          ingredient: mealResult[`strIngredient${i}`],
          measure: mealResult[`strMeasure${i}`],
        };

        ingredients.push(item);
      }

      return items;
    };
  }
}
