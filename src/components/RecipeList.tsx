import { useEffect, useState } from "react";
import { getRecipes, deleteRecipe } from "../firebase";
import EditRecipe from "./EditRecipe";
import "../styles/RecipeList.css";

const RecipeList = () => {
  const [recipes, setRecipes] = useState<any>([]);
  const [editingRecipeId, setEditingRecipeId] = useState<string | null>(null);

  useEffect(() => {
    // Fetch recipes in real-time
    const fetchRecipes = () => {
      getRecipes((data) => {
        const formattedRecipes = Array.isArray(data)
          ? data
          : Object.entries(data).map(([id, recipe]) => ({ id, ...recipe }));
        setRecipes(formattedRecipes || []);
      });
    };

    fetchRecipes(); // Initial fetch
  }, []);

  const handleEditClick = (id: string) => {
    setEditingRecipeId(id);
  };

  const handleEditComplete = () => {
    setEditingRecipeId(null);
  };

  const handleDeleteClick = async (id: string) => {
    await deleteRecipe(id); // Delete recipe from Firebase
  };

  return (
    <div className="recipe-list-container">
      <h2>Recipes</h2>
      <ul>
        {recipes &&
          recipes.map((recipe: any) => (
            <li key={recipe.id}>
              {editingRecipeId === recipe.id ? (
                <EditRecipe
                  recipeId={recipe.id}
                  recipe={recipe}
                  onEditComplete={handleEditComplete}
                />
              ) : (
                <>
                  <h3>{recipe.title}</h3>
                  <button onClick={() => handleEditClick(recipe.id)}>
                    Edit
                  </button>
                  <button onClick={() => handleDeleteClick(recipe.id)}>
                    Delete
                  </button>
                </>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default RecipeList;
