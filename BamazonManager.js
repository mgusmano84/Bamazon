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
//check for items that have a quanity of less than 5
var lowInventory = function () {
	var query = 'SELECT * FROM products';
        connection.query(query, function(err, res) {
        	console.log(' Low Inventory Products')
            console.log('***********************************')
            for (var i = 0; i < res.length; i++) {
            	if (res[i].StockQuantity < 5)
            	{
            		console.log(res[i].ItemID, res[i].ProductName, res[i].Price, res[i].StockQuantity)
            	}
            }
        })
        options();
};
//allows manager to add more of current items already stocked in the store
var addInventory = function() {
	var query = 'SELECT * FROM products';
    connection.query(query, function(err, res) {
     	if (err) throw err;
     	console.log(' Current Products')
        console.log('***********************************')
            for (var i = 0; i < res.length; i++) {
                console.log("Item ID:  " + res[i].ItemID + " || Product Name: " + res[i].ProductName + " ||  Quantity: " + res[i].StockQuantity)
            }
    })
    inquirer.prompt([{
		name: 'id',
		type: 'input',
		message: 'Please Select ID of the item you would like to add too?',
		validate: function(value) {
			if (isNaN(value) == false) {
				return true;

			} else {
				console.log('\nAdd a valid ID Number.\n');
				return false;
			} 
		} 
	}, {
		name: 'total',
		type: 'input',
		message: 'How many would you like to add?',
		validate: function(value) {	
			if (isNaN(value) == false) {				
				return true;
			} else {		
				console.log('\nPlease supply quantity\n');
				return false;
			} 
		}

	}]).then(function(answer) {	
		console.log(answer);
		IntItem = parseInt(answer.total);
		connection.query("SELECT * FROM Products WHERE ?", [{ItemID: answer.id}], function(err, data) { 
			if (err) throw err;
			var newQuantity = data[0].StockQuantity + IntItem;
			connection.query('UPDATE products SET StockQuantity = ? WHERE ItemID = ?', [newQuantity, answer.id], function(err, results) {
				if (err) throw err;
				else {
					console.log("You have increase this item to a new total of: "+ newQuantity);
					options();
				}
			})
		})
	})
	
};
//allows manager to add new produts to the storefront
var newProduct = function() {
	inquirer.prompt([{
		name: 'name',
		type: 'input',
		message: 'What is the name of the item you would like to add?',
	}, {
		name: 'department',
		type: 'input',
		message: 'Add to what Department?',
	}, {
		name: 'price',
		type: 'input',
		message: 'What is the price?',
		validate: function(value) {	
			if (isNaN(value) == false) {				
				return true;
			} else {		
				console.log('\nPlease supply total\n');
				return false;
			} 
		} 
	}, {
		name: 'quantity',
		type: 'input',
		message: 'Starting inventory?',
		validate: function(value) {	
			if (isNaN(value) == false) {				
				return true;
			} else {		
				console.log('\nPlease supply total\n');
				return false;
			} 
		} 
	}]).then(function(answer) {
		console.log(answer)
	})

}


