/**
 * Class representing a meal from TheMealDB
 * @extends Object
 */
export default class Meal extends Object {
  // Properties
  title;
  category;
  thumb;
  source;
  youtube;
  instructions;
  ingredients;

  /**
   * Represents a single meal from the TheMealDB
   * @constructor
   * @param {object} mealResult - The result obj from querying TheMealDB for a single dish
   */
  constructor(mealResult) {
    super();
    this.title = mealResult.meals[0].strMeal;
    this.category = mealResult.meals[0].strCategory;
    this.thumb = mealResult.meals[0].strMealThumb;
    this.source = mealResult.meals[0].strSource;
    this.youtube = mealResult.meals[0].strYoutube;
    this.instructions = mealResult.meals[0].strInstructions;
    this.ingredients = [];

    for (let i = 1; i < 20; i++) {
      if (
        mealResult.meals[0][`strIngredient${i}`] &&
        mealResult.meals[0][`strMeasure${i}`]
      ) {
        const item = {
          ingredient: mealResult.meals[0][`strIngredient${i}`],
          measure: mealResult.meals[0][`strMeasure${i}`],
        };

        this.ingredients.push(item);
      }
    }
  }

  /**
   * Returns an HTML Element containing the full text of the recipe
   * @return {htmlElement} - An html article containing the full text of the recipe
   */
  toHtml() {
    const recipe = document.createElement("article");

    // Title
    const title = document.createElement("h1");
    title.textContent = this.title;
    recipe.appendChild(title);

    // Category
    const category = document.createElement("h2");
    category.textContent = this.category;
    recipe.appendChild(category);

    // Thumbnail
    // TODO image element here
    /* const thumb = document.createElement("img");
    thumb.textContent = this.thumb;
    recipe.appendChild(thumb); */

    // Source
    // TODO create a link here
    const source = document.createElement("p");
    source.textContent = this.source;
    recipe.appendChild(source);

    // Youtube

    // Instructions
    const instructions = document.createElement("p");
    instructions.textContent = this.instructions;
    recipe.appendChild(instructions);

    // Ingredients
    const ingredients = document.createElement("ul");

    // Individual list item
    for (let ingredient of this.ingredients) {
      const item = document.createElement("li");
      item.textContent = `${ingredient.measure} of ${ingredient.ingredient}`;
      ingredients.appendChild(item);
    }

    // Append list to recipe
    recipe.appendChild(ingredients);

    return recipe;
  }
}
