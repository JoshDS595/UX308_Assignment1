// Menu data
const MENU = {
  burger: {
    name: "Burger",
    sizes: ["Small", "Medium", "Large"],
    prices: { Small: 8.99, Medium: 10.99, Large: 12.99 },
    toppings: ["Bacon", "Cheese", "Pickles", "Onions"]
  },
  pizza: {
    name: "Pizza",
    sizes: ["Small", "Medium", "Large"],
    prices: { Small: 10.99, Medium: 13.99, Large: 16.99 },
    toppings: ["Pepperoni", "Mushrooms", "Sausage", "Olives"]
  },
  shawarma: {
    name: "Shawarma Wrap",
    sizes: ["Small", "Medium", "Large"],
    prices: { Small: 8.99, Medium: 9.99, Large: 11.99 },
    toppings: ["Garlic Sauce", "Tahini", "Pickles", "Tomatoes"]
  },
  drinks: {
    name: "Drinks",
    items: [
      { name: "Coke", price: 2.99 },
      { name: "Sprite", price: 2.99 },
      { name: "Water", price: 1.99 }
    ]
  }
};

// State management
let currentState = welcoming;
let currentOrder = {
  items: [],
  currentItem: null
};

export function handleInput(sInput) {
  return currentState(sInput);
}

export function clearInput(){
  currentState = welcoming;  
  currentOrder = { items: [], currentItem: null };
}

function welcoming() {
  let aReturn = [];
  currentState = mainMenu;
  aReturn.push("🍔 Welcome to Quick Bite Takeout!");
  aReturn.push("What would you like to order?");
  aReturn.push("Reply with: 1) Burger, 2) Pizza, 3) Shawarma Wrap, 4) Drinks, or 5) Checkout");
  return aReturn;
}

function mainMenu(sInput) {
  let aReturn = [];
  const input = sInput.toLowerCase().trim();
  
  if (input === "1" || input === "burger") {
    currentState = selectBurgerSize;
    aReturn.push("Great! Choose your burger size: Small, Medium, or Large");
  } else if (input === "2" || input === "pizza") {
    currentState = selectPizzaSize;
    aReturn.push("Great! Choose your pizza size: Small, Medium, or Large");
  } else if (input === "3" || input === "shawarma") {
    currentState = selectShawarmaSize;
    aReturn.push("Great! Choose your shawarma wrap size: Small, Medium, or Large");
  } else if (input === "4" || input === "drinks") {
    currentState = selectDrink;
    aReturn.push("Choose a drink: 1) Coke ($2.99), 2) Sprite ($2.99), or 3) Water ($1.99)");
  } else if (input === "5" || input === "checkout") {
    return checkout();
  } else {
    aReturn.push("Sorry, I didn't understand. Reply with: 1) Burger, 2) Pizza, 3) Shawarma Wrap, 4) Drinks, or 5) Checkout");
  }
  
  return aReturn;
}

function selectBurgerSize(sInput) {
  let aReturn = [];
  const input = sInput.toLowerCase().trim();
  
  if (!["small", "medium", "large"].includes(input)) {
    aReturn.push("Please choose: Small, Medium, or Large");
    return aReturn;
  }
  
  currentOrder.currentItem = {
    type: "burger",
    size: input.charAt(0).toUpperCase() + input.slice(1),
    toppings: []
  };
  
  currentState = selectBurgerToppings;
  aReturn.push(`You selected a ${currentOrder.currentItem.size} burger!`);
  aReturn.push("Select toppings (reply with topping names, separated by commas):");
  aReturn.push("Available: Bacon, Cheese, Pickles, Onions");
  return aReturn;
}

function selectBurgerToppings(sInput) {
  let aReturn = [];
  const validToppings = MENU.burger.toppings;
  const selectedToppings = sInput.split(",").map(t => t.trim());
  
  currentOrder.currentItem.toppings = selectedToppings
    .map(t => validToppings.find(valid => valid.toLowerCase() === t.toLowerCase()))
    .filter(t => t !== undefined);
  
  const price = MENU.burger.prices[currentOrder.currentItem.size];
  currentOrder.currentItem.price = price;
  currentOrder.items.push(currentOrder.currentItem);
  
  currentState = mainMenu;
  aReturn.push(`Added ${currentOrder.currentItem.size} Burger with ${currentOrder.currentItem.toppings.length > 0 ? currentOrder.currentItem.toppings.join(", ") : "no toppings"} ($${price})`);
  aReturn.push("What else? Reply with: 1) Burger, 2) Pizza, 3) Shawarma Wrap, 4) Drinks, or 5) Checkout");
  return aReturn;
}

function selectPizzaSize(sInput) {
  let aReturn = [];
  const input = sInput.toLowerCase().trim();
  
  if (!["small", "medium", "large"].includes(input)) {
    aReturn.push("Please choose: Small, Medium, or Large");
    return aReturn;
  }
  
  currentOrder.currentItem = {
    type: "pizza",
    size: input.charAt(0).toUpperCase() + input.slice(1),
    toppings: []
  };
  
  currentState = selectPizzaToppings;
  aReturn.push(`You selected a ${currentOrder.currentItem.size} pizza!`);
  aReturn.push("Select toppings (reply with topping names, separated by commas):");
  aReturn.push("Available: Pepperoni, Mushrooms, Sausage, Olives");
  return aReturn;
}

function selectPizzaToppings(sInput) {
  let aReturn = [];
  const validToppings = MENU.pizza.toppings;
  const selectedToppings = sInput.split(",").map(t => t.trim());
  
  currentOrder.currentItem.toppings = selectedToppings
    .map(t => validToppings.find(valid => valid.toLowerCase() === t.toLowerCase()))
    .filter(t => t !== undefined);
  
  const price = MENU.pizza.prices[currentOrder.currentItem.size];
  currentOrder.currentItem.price = price;
  currentOrder.items.push(currentOrder.currentItem);
  
  currentState = mainMenu;
  aReturn.push(`Added ${currentOrder.currentItem.size} Pizza with ${currentOrder.currentItem.toppings.length > 0 ? currentOrder.currentItem.toppings.join(", ") : "no toppings"} ($${price})`);
  aReturn.push("What else? Reply with: 1) Burger, 2) Pizza, 3) Shawarma Wrap, 4) Drinks, or 5) Checkout");
  return aReturn;
}

function selectDrink(sInput) {
  let aReturn = [];
  const input = sInput.toLowerCase().trim();
  const drinks = MENU.drinks.items;
  
  let selectedDrink = null;
  if (input === "1") selectedDrink = drinks[0];
  else if (input === "2") selectedDrink = drinks[1];
  else if (input === "3") selectedDrink = drinks[2];
  else {
    aReturn.push("Please choose: 1) Coke, 2) Sprite, or 3) Water");
    return aReturn;
  }
  
  currentOrder.items.push({
    type: "drink",
    name: selectedDrink.name,
    price: selectedDrink.price
  });
  
  currentState = mainMenu;
  aReturn.push(`Added ${selectedDrink.name} ($${selectedDrink.price})`);
  aReturn.push("What else? Reply with: 1) Burger, 2) Pizza, 3) Shawarma Wrap, 4) Drinks, or 5) Checkout");
  return aReturn;
}

function selectShawarmaSize(sInput) {
  let aReturn = [];
  const input = sInput.toLowerCase().trim();
  
  if (!["small", "medium", "large"].includes(input)) {
    aReturn.push("Please choose: Small, Medium, or Large");
    return aReturn;
  }
  
  currentOrder.currentItem = {
    type: "shawarma",
    size: input.charAt(0).toUpperCase() + input.slice(1),
    toppings: []
  };
  
  currentState = selectShawarmaToppings;
  aReturn.push(`You selected a ${currentOrder.currentItem.size} shawarma wrap!`);
  aReturn.push("Select toppings (reply with topping names, separated by commas):");
  aReturn.push("Available: Garlic Sauce, Tahini, Pickles, Tomatoes");
  return aReturn;
}

function selectShawarmaToppings(sInput) {
  let aReturn = [];
  const validToppings = MENU.shawarma.toppings;
  const selectedToppings = sInput.split(",").map(t => t.trim());
  
  const toppings = selectedToppings
    .map(t => validToppings.find(valid => valid.toLowerCase() === t.toLowerCase()))
    .filter(t => t !== undefined);
  
  const price = MENU.shawarma.prices[currentOrder.currentItem.size];
  currentOrder.currentItem.price = price;
  currentOrder.currentItem.toppings = toppings;
  currentOrder.items.push(currentOrder.currentItem);
  
  currentState = mainMenu;
  aReturn.push(`Added ${currentOrder.currentItem.size} Shawarma Wrap with ${toppings.length > 0 ? toppings.join(", ") : "no toppings"} ($${price})`);
  aReturn.push("What else? Reply with: 1) Burger, 2) Pizza, 3) Shawarma Wrap, 4) Drinks, or 5) Checkout");
  return aReturn;
}

function checkout() {
  let aReturn = [];
  currentState = welcoming;
  
  if (currentOrder.items.length === 0) {
    aReturn.push("Your cart is empty! Let's start over.");
    aReturn.push("What would you like to order?");
    aReturn.push("Reply with: 1) Burger, 2) Pizza, 3) Shawarma Wrap, 4) Drinks");
    return aReturn;
  }
  
  aReturn.push("📋 ORDER SUMMARY:");
  let total = 0;
  currentOrder.items.forEach((item, index) => {
    if (item.type === "drink") {
      aReturn.push(`${index + 1}. ${item.name} - $${item.price}`);
    } else if (item.type === "shawarma") {
      const toppings = item.toppings.length > 0 ? ` (${item.toppings.join(", ")})` : "";
      aReturn.push(`${index + 1}. ${item.name}${toppings} - $${item.price}`);
    } else {
      const toppings = item.toppings.length > 0 ? ` (${item.toppings.join(", ")})` : "";
      aReturn.push(`${index + 1}. ${item.size} ${item.type.charAt(0).toUpperCase() + item.type.slice(1)}${toppings} - $${item.price}`);
    }
    total += item.price;
  });
  aReturn.push(`💰 TOTAL: $${total.toFixed(2)}`);
  aReturn.push("Your order has been placed! Thank you for ordering with Quick Bite! 🎉");
  
  currentOrder = { items: [], currentItem: null };
  return aReturn;
}

