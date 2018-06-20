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
        managerDecision();

});

function managerDecision(){
    inquirer.prompt({
        name: "manDecision",
        type: "rawlist",
        message: "What needs to be done today?",
        choices: [
            "Inventory the Warehouse",
            "Identify Inventory that is Low in Stock",
            "Purchase Additional Inventory",
            "Purchase New Items for the Company to Sell",
        ]
    })
.then(function(answer){

    switch (answer.manDecision){

        case "Inventory the Warehouse":
            displayInventory();
                break;
        
        case "Identify Inventory that is Low in Stock":
            lowStockInventory();
                break;

        case "Purchase Additional Inventory":
                resupplyInventory();
                break;
            
        case "Purchase New Items for the Company to Sell":
                purchaseInventory();
                break;
    }
});

}



function displayInventory(){


    console.log("See Our Selection");

    connection.query("SELECT * FROM bamazon_inv", function(err, res){
        if(err) throw err;

        console.log("---------------------------------");

        var invTable = new table({
            head: ['ID', 'Product', 'Department', 'Price', 'Remaining']
    
    });


    for (var i = 0; i < res.length; i++){
             invTable.push([res[i].id, res[i].product_name, res[i].department_name, res[i].price.toFixed(2), res[i].stock_quantity]);
    }                       

    console.log(invTable.toString());
    managerDecision();

        }
    
    )}



function lowStockInventory(){


        console.log("These Items Are Running Low in Stock");
    
        connection.query("SELECT * FROM bamazon_inv WHERE stock_quantity <=5 ", function(err, res){
            if(err) throw err;
    
            console.log("---------------------------------");
    
            var invTable = new table({
                head: ['ID', 'Product', 'Department', 'Price', 'Remaining']
        
        });
    
    
        for (var i = 0; i < res.length; i++){
            invTable.push([res[i].id, res[i].product_name, res[i].department_name, res[i].price.toFixed(2), res[i].stock_quantity]);
   }                       

   console.log(invTable.toString());

   managerDecision();

       }
   )}


   function resupplyInventory(){

 

    connection.query("SELECT * FROM bamazon_inv",  function(err, res){
    
        if(err) throw err;

    var items = [];

    for(var i = 0;i < res.length; i++){
        items.push(res[i].product_name)
    }


    inquirer.prompt([{
        name: "item",
        message: "What items do should we repurchase?",
        type: "list",
        choices: items
    }, {
        type: "input",
        name: "buyInvQuantity",
        message: "How many should we buy?",
        validate: function(value){
            if(isNaN(value) === false){return true;}
            else{return false;}
        }

    }])
    .then(function(answer){

    var stockQty;

    for(var i =0;i < res.length;i++){
        if(res[i].product_name === answer.item){
            stockQty = res[i].stock_quantity
        }
    }

    connection.query("UPDATE bamazon_inv SET ? WHERE ?",
    
        [
          {
              stock_quantity: stockQty + parseInt(answer.buyInvQuantity)
          },
          {   
              product_name: answer.item
          }
        ],
        
            
        function(err, res){
            if(err) throw err;
        
        

        console.log("Inventory Purchased");
        console.log("---------------------------------");
        console.log("The inventory for " + answer.item + " is now " + (stockQty + parseInt(answer.buyInvQuantity))  + " units.\n");
    
    managerDecision();

        });
    })
    });
}

function purchaseInventory(){
    console.log("-----Adding New Inventory-----");

    var deptNames =[];

    connection.query('SELECT * FROM department_name', function(err,res){
        
        if(err) throw err;
        for(var i = 0; i<res.length;i++){
            deptNames.push(res[i].department_name)
        }

    })

inquirer.prompt([{
    name: "productAdd",
    type: "input",
    message: "Products:  ",
    validate: function(value){
        if(value) {return true;}
        else{return false;}
    }
}, {
    type: "list",
    name: "departmentAdd",
    message: "Department:  ",
    choices: deptNames
    
}, {
    name: "priceAdd",
    type: "input",
    message: "Price:  ",
    validate: function(value){
    if(isNaN(value) === false){return true;}
    else{return false;}
    }
}, {
    name: "quantityAdd",
    type: "input",
    message: "Quantity:  ",
    validate: function(value){
        if(isNaN(value) === false){return true;}
        else{return false;}
    }
}]).then(function(answer){
    connection.query("INSERT INTO bamazon_inv SET ?",{
        product_name: answer.productAdd,
        department_name: answer.departmentAdd,
        price: answer.priceAdd,
        stock_quantity: answer.quantityAdd
    }, function(err,res){
        
        if(err) throw err;

        console.log("New Products Added to Inventory");

    })
    managerDecision();
})
}



    

        