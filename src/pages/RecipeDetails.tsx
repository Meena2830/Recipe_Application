import "../styles/RecipeDetails.css";

interface Recipe {
  title: string;
  ingredients: string[];
  steps: string[];
}

interface RecipeDetailsProps {
  recipe: Recipe;
}

const RecipeDetails = ({ recipe }: RecipeDetailsProps) => {
  return (
    <div className="recipe-details-container">
      <h2>{recipe.title}</h2>
      <h3>Ingredients</h3>
      <ul>
        {recipe.ingredients.map((ingredient: string, index: number) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h3>Steps</h3>
      <ol>
        {recipe.steps.map((step: string, index: number) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
    </div>
  );
};

export default RecipeDetails;
