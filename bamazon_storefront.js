var inquirer = require("inquirer");
var mysql = require("mysql");
var table = require("cli-table");


var connection = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "",
        database: "bamazon_db"
  })

  connection.connect(function(err) {
        if (err) throw err;

        console.log("connected as id " + connection.threadId);
            displayInventory();

});


var displayInventory = function(){
        connection.query("SELECT * FROM bamazon_inv", function(err, res){

        var invTable = new table({
            head: ['ID', 'Product', 'Department', 'Price', 'Remaining']
       
  });
  

    console.log("Check Out our Inventory!");
    console.log("--------------------------");


for (var i = 0; i < res.length; i++){
          invTable.push([res[i].id, res[i].product_name, res[i].department_name, res[i].price.toFixed(2), res[i].stock_quantity]);
          }

    console.log(invTable.toString());

      
inquirer.prompt([{
    name: "itemID",
    type: "input",
    message: "Which item would you like to buy?",
    validate: function(value)   {
        if (isNaN(value) == false){
            return true;
        } else  {
            return false
        }
    }
},  {
    name: "Quantity",
    type: "input",
    message: "How many would you like to buy? ",
    validate: function(value)   {
        if (isNaN(value) == false){
            return true;
        } else  {
            return false
        }
    }

}]).then(function(answer)   {
    var chosenId = answer.itemID - 1
    var chosenProduct = res[chosenId]
    var chosenQuantity = answer.Quantity

        if(chosenQuantity<=res[chosenId].stock_quantity){
            console.log("Your total for " + "(" + answer.Quantity + ")" + " - " + res[chosenId].product_name + " is: " + res[chosenId].price * chosenQuantity);

        connection.query("UPDATE bamazon_inv SET ? WHERE ?", [{
            stock_quantity: res[chosenId].stock_quantity - chosenQuantity
        }, {
            id: res[chosenId].id
        }],
            function(err,res){
                displayInventory();
        
        })
            } else  {
                console.log("Sorry, insufficient Quanity at this time. All we have is " + res[chosenId].StockQuantity + " in our Inventory.");
                    }

            })

        })
     }
   
