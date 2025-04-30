// script.js - FridgeGenius Core Logic

// Get elements
const ingredientNameInput = document.getElementById('ingredientName');
const ingredientQuantityInput = document.getElementById('ingredientQuantity');
const ingredientUnitInput = document.getElementById('ingredientUnit');
const ingredientExpirationInput = document.getElementById('ingredientExpiration');
const addIngredientButton = document.getElementById('addIngredientButton');
const ingredientsList = document.getElementById('ingredientsList');
const recipesDiv = document.getElementById('recipes');+const users = [];

//TODO: Implement real user management and login
function login(username, password) {
  const user = users.find(u => u.username === username && u.password === password);
  return user;
}

function fetchRecipes() {
    //TODO: Replace with real AI recipe API
    recipesDiv.innerHTML = '';
    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.meals) {
                data.meals.forEach(meal => {
                    const mealName = document.createElement('h3');
                    mealName.textContent = meal.strMeal;
                    recipesDiv.appendChild(mealName);
                }); 
            } else {
                console.error("No meals found in the data");
            }
        })
        .catch(error => {
            console.error("Error fetching recipe:", error);
        });
}

// Add event listener to the button
addIngredientButton.addEventListener('click', addIngredient);

// Function to add an ingredient
function addIngredient() {
    const ingredientName = ingredientNameInput.value.trim();
    if (ingredientName === '') {
        return; // Don't add empty ingredients
    }
    const ingredientQuantity = ingredientQuantityInput.value;
    const ingredientUnit = ingredientUnitInput.value;
    const ingredientExpiration = ingredientExpirationInput.value;
    const ingredientId = Date.now();
    const newIngredient = document.createElement('li');
    newIngredient.id = ingredientId;
    newIngredient.textContent = `${ingredientName} - Quantity: ${ingredientQuantity} ${ingredientUnit} - Expires: ${ingredientExpiration}`;

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', () => {
        newIngredient.remove();
    });

    newIngredient.appendChild(removeButton);
    ingredientsList.appendChild(newIngredient);
    ingredientNameInput.value = ''; // Clear the input

    fetchRecipes();
    }

function addUser(username, password){
  const newUser = {username, password};
  users.push(newUser);
}