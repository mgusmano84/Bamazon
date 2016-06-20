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
});