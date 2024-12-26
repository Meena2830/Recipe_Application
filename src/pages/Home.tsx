import { useEffect, useState } from "react";
import RecipeList from "../components/RecipeList";
import AddRecipe from "../components/AddRecipe";
import SearchRecipes from "../components/SearchRecipes";
import { getRecipes } from "../firebase";

const Home = () => {
  const [recipes, setRecipes] = useState<any[]>([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const data = await getRecipes();
        const formattedRecipes = Array.isArray(data)
          ? data
          : Object.entries(data).map(([id, recipe]) => ({ id, ...recipe }));
        console.log("Formatted recipes:", formattedRecipes);
        setRecipes(formattedRecipes || []);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, []); // Empty dependency array ensures this runs once when the component mounts

  return (
    <div>
      <h1>Recipe App</h1>
      <AddRecipe />
      <SearchRecipes recipes={recipes} />
      <RecipeList recipes={recipes} />
    </div>
  );
};

export default Home;
