import { useState } from "react";

interface Recipe {
  title: string;
  ingredients: string[];
  steps: string[];
}

interface SearchRecipesProps {
  recipes: Recipe[];
}

const SearchRecipes = ({ recipes }: SearchRecipesProps) => {
  const [query, setQuery] = useState("");

  // Log the query to see if it's being updated correctly
  console.log("Search Query:", query);

  // Filter recipes based on the query
  const filteredRecipes = recipes.filter(
    (recipe) =>
      recipe.title.toLowerCase().includes(query.toLowerCase()) || // Check title
      recipe.ingredients.some(
        (ingredient) => ingredient.toLowerCase().includes(query.toLowerCase()) // Check ingredients
      )
  );

  // Log the filtered recipes to check if they are being filtered correctly
  console.log("Filtered Recipes:", filteredRecipes);

  return (
    <div>
      {/* Input box for search query */}
      <input
        type="text"
        placeholder="Search by title or ingredient"
        value={query}
        onChange={(e) => setQuery(e.target.value)} // Update the query state
        style={{ padding: "8px", marginBottom: "10px", width: "100%" }}
      />

      {/* Display filtered recipes */}
      {filteredRecipes.length > 0 ? (
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {filteredRecipes.map((recipe, index) => (
            <li
              key={index}
              style={{
                padding: "10px",
                marginBottom: "5px",
                border: "1px solid #ddd",
                borderRadius: "5px",
              }}
            >
              <strong>{recipe.title}</strong>
              <p>
                <em>Ingredients:</em> {recipe.ingredients.join(", ")}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No recipes found. Try a different search query.</p>
      )}
    </div>
  );
};

export default SearchRecipes;
