var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root", 
    password: process.argv[2], 
    database: "Bamazon"
})

connection.connect(function(err) {
	if (err) throw err;
	console.log('connected as id ' + connection.threadId);
	InvSearch()
})

// Pulls data from products data
var InvSearch = function() {
        var query = 'SELECT * FROM products';
        connection.query(query, function(err, res) {
        	console.log(' Available Products')
            console.log('***********************************')
            for (var i = 0; i < res.length; i++) {
                console.log("Item ID:  " + res[i].ItemID + " || Product Name: " + res[i].ProductName + " || Department: " + res[i].DepartmentName + " || Price: " + res[i].Price + " || Quanity: " + res[i].StockQuantity);
            }
        })
        selectItem();
};


var selectItem = function() {
		
		inquirer.prompt([{
			name: 'id',
			type: 'input',
			message: 'Please Select ID of the item you would like to by?',
			validate: function(value) {

				
				if (isNaN(value) == false) {

					
					return true;

				} else {
					console.log('\n\nAll we need is the number next to the title.\n');
					return false;

				} // end if else

			} // end validate()
		}, {
			name: 'amount',
			type: 'input',
			message: 'How many would you like to buy?',
			validate: function(value) {

				
				if (isNaN(value) == false) {

					
					return true;

				} else {

					
					console.log('\nPlease supply ID\n');
					return false;

				} 

			} 
		
		}]).then(function(answer) {

			
			console.log(answer);
		
		});  

}; 



