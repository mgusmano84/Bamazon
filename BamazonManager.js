var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root", 
    password: process.argv[2], 
    database: "Bamazon"
})



var options = function() {
	inquirer.prompt([
		{
        type: "list",
        message: "Welcome to Bamazon Manager, what would you like to do?",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
        name: "pokemon"
    	}
	]).then(function (choice) {
		console.log(choice.pokemon)
	})

}


options();
