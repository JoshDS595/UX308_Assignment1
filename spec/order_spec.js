import { handleInput, clearInput } from '../Order.js';

describe("Tests all stages of a takeout order", function () {
    beforeEach(function () {
        // resetting state machine
        clearInput();
    });

    it("should greet user with welcome message", function () {
        const aResults = handleInput("hello");
        expect(aResults[0]).toContain("Welcome to Quick Bite");
        expect(aResults[2]).toContain("Shawarma Wrap");
    });

    it("should order a burger with toppings", function () {
        handleInput(""); // Welcome
        let aResults = handleInput("1"); // Select Burger
        expect(aResults[0]).toContain("Choose your burger size");
        
        aResults = handleInput("medium"); // Select Size
        expect(aResults[0]).toContain("Medium burger");
        
        aResults = handleInput("Bacon, Cheese"); // Select Toppings
        expect(aResults[0]).toContain("Added Medium Burger");
    });

    it("should order a pizza with toppings", function () {
        handleInput(""); // Welcome
        let aResults = handleInput("2"); // Select Pizza
        expect(aResults[0]).toContain("Choose your pizza size");
        
        aResults = handleInput("large"); // Select Size
        expect(aResults[0]).toContain("Large pizza");
        
        aResults = handleInput("Pepperoni, Mushrooms"); // Select Toppings
        expect(aResults[0]).toContain("Added Large Pizza");
    });

    it("should order a shawarma wrap with toppings", function () {
        handleInput(""); // Welcome
        let aResults = handleInput("3"); // Select Shawarma
        expect(aResults[0]).toContain("Choose your shawarma wrap size");
        
        aResults = handleInput("medium"); // Select Size
        expect(aResults[0]).toContain("Medium shawarma wrap");
        
        aResults = handleInput("Garlic Sauce, Tahini"); // Select Toppings
        expect(aResults[0]).toContain("Added Medium Shawarma Wrap");
    });

    it("should add drinks to order", function () {
        handleInput(""); // Welcome
        let aResults = handleInput("4"); // Select Drinks
        expect(aResults[0]).toContain("Choose a drink");
        
        aResults = handleInput("1"); // Select Coke
        expect(aResults[0]).toContain("Added Coke");
    });

    it("should handle multiple items in one order", function () {
        handleInput(""); // Welcome
        
        // Add burger
        handleInput("1");
        handleInput("small");
        handleInput("Bacon");
        
        // Add pizza
        let aResults = handleInput("2");
        expect(aResults[0]).toContain("pizza size");
        handleInput("medium");
        handleInput("Sausage");
        
        // Add shawarma
        aResults = handleInput("3");
        handleInput("large");
        handleInput("Garlic Sauce");
        
        // Add drink
        aResults = handleInput("4");
        handleInput("2"); // Sprite
        
        // Checkout
        aResults = handleInput("5");
        expect(aResults[0]).toContain("ORDER SUMMARY");
    });

    it("should calculate total price correctly", function () {
        handleInput(""); // Welcome
        
        handleInput("1"); // Burger
        handleInput("small"); // $8.99
        handleInput("Cheese");
        
        handleInput("3"); // Shawarma
        handleInput("Garlic Sauce");
        
        handleInput("4"); // Drink
        handleInput("3"); // Water $1.99
        
        const aResults = handleInput("5"); // Checkout
        const summary = aResults.join("\n");
        expect(summary).toContain("TOTAL: $20.97"); // 8.99 + 9.99 + 1.99
    });

    it("should reject invalid burger size", function () {
        handleInput(""); // Welcome
        handleInput("1"); // Select Burger
        const aResults = handleInput("extra large"); // Invalid size
        expect(aResults[0]).toContain("Please choose");
    });

    it("should handle empty checkout", function () {
        handleInput(""); // Welcome
        const aResults = handleInput("5"); // Checkout without ordering
        expect(aResults[0]).toContain("cart is empty");
    });
});

