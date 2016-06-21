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
        name: "pic"
    	}
	]).then(function (choice) {

		switch(choice.pic) {
                case 'View Products for Sale': 
                    forSale();
                    break;
                case 'View Low Inventory':
                    lowInventory();
                    break;
                case 'Add to Inventory':
                    addInventory();
                    break;
                case 'Add New Product':
                    newProduct();
                    break;
            }
	})

}
//runs slections to choose from and switch cases
options();

// Pulls data from products data
var forSale = function () {
        var query = 'SELECT * FROM products';
        connection.query(query, function(err, res) {
        	console.log(' Available Products')
            console.log('***********************************')
            for (var i = 0; i < res.length; i++) {
                console.log("Item ID:  " + res[i].ItemID + " || Product Name: " + res[i].ProductName + " || Department: " + res[i].DepartmentName + " || Price: " + res[i].Price + " || Quanity: " + res[i].StockQuantity);
            }
        })
        options();
};

var lowInventory = function () {
	
}


