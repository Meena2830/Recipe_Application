import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, remove, onValue } from "firebase/database";

// Firebase configuration (use your own credentials)
const firebaseConfig = {
  apiKey: "AIzaSyCoR_pAGSKu93cT2iP0Cef3WcIPDO4iqr4",
  authDomain: "recipe-app-27a8d.firebaseapp.com",
  databaseURL: "https://recipe-app-27a8d-default-rtdb.firebaseio.com/",
  projectId: "recipe-app-27a8d",
  storageBucket: "recipe-app-27a8d.firebasestorage.app",
  messagingSenderId: "1017826828406",
  appId: "1:1017826828406:web:ae3231f11bd4a8310bff57",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export const addRecipe = (
  id: string,
  recipe: { title: string; ingredients: string[]; steps: string[] }
) => {
  set(ref(db, "recipes/" + id), recipe);
};

export const getRecipes = (callback: (data: any) => void) => {
  const db = getDatabase();
  const recipesRef = ref(db, "recipes");

  try {
    onValue(recipesRef, (snapshot) => {
      const data = snapshot.val();
      if (typeof callback === "function") {
        callback(data);
      } else {
        console.error("Callback is not a function:", callback);
      }
    });
  } catch (error) {
    console.error("Error fetching recipes:", error);
  }
};

export const deleteRecipe = (id: string) => {
  remove(ref(db, "recipes/" + id));
};

export const updateRecipe = (
  id: string,
  recipe: { title: string; ingredients: string[]; steps: string[] }
) => {
  set(ref(db, "recipes/" + id), recipe);
};
