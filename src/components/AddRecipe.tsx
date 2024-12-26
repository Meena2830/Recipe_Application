import { useState } from "react";
import { addRecipe } from "../firebase";
import "../styles/AddRecipe.css";

const AddRecipe = () => {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");

  const handleSubmit = () => {
    const recipe = {
      title,
      ingredients: ingredients.split(","),
      steps: steps.split("."),
    };
    const id = Date.now().toString();
    addRecipe(id, recipe); // Add recipe to Firebase
    setTitle("");
    setIngredients("");
    setSteps("");
  };

  return (
    <div className="add-recipe-container">
      <h2>Add Recipe</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Ingredients (comma separated)"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
      />
      <textarea
        placeholder="Steps (period separated)"
        value={steps}
        onChange={(e) => setSteps(e.target.value)}
      />
      <button onClick={handleSubmit}>Add Recipe</button>
    </div>
  );
};

export default AddRecipe;
