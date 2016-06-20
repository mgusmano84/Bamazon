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
            for (var i = 0; i < res.length; i++) {
                console.log(res[i]);
            }
        })
};



// Item ID: " + res[i].ItemID + " || Product Name: " + res[i].ProductName + " || Department: " + res[i].DepartmentName + " || Price: " + res[i].Price + " || Quanity: " + res[i].StockQuantity