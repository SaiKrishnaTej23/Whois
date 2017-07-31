var dns =  require('dns');
var WhoisLog = require('./models/todo');
var mongoose = require('mongoose'); 
var database = require('../config/database'); 	
 mongoose.connect(database.localUrl); 
module.exports = function (app) {

    // api ---------------------------------------------------------------------
    app.get('/api/domain', function (req, res) {
     var log = new WhoisLog ({
            domain: req.query.domain,
            searchedOn: new Date().toDateString()
        });
    var result = '';
        log.save(function (err, createdObject) {  
                if (err) {
                    res.send(err);
                }
                // res.send(createdObject);
            });

            	dns.lookup(req.query.domain, null, function (error, address) {
                    console.log(address || error);
                    dns.reverse(address, function(error, domains) {
                    res.header("Content-Type", "application/json");
                    result = JSON.stringify(domains, null, "\t"), "utf-8";
                     console.log(result);
                    res.end(JSON.stringify(domains, null, "\t"), "utf-8");
        });
               
                
    });
    

    });

    // // create todo and send back all todos after creation
    // app.post('/api/todos', function (req, res) {

    //     // create a todo, information comes from AJAX request from Angular
    //     Todo.create({
    //         text: req.body.text,
    //         done: false
    //     }, function (err, todo) {
    //         if (err)
    //             res.send(err);

    //         // get and return all the todos after you create another
    //         getTodos(res);
    //     });

    // });

    // // delete a todo
    // app.delete('/api/todos/:todo_id', function (req, res) {
    //     Todo.remove({
    //         _id: req.params.todo_id
    //     }, function (err, todo) {
    //         if (err)
    //             res.send(err);

    //         getTodos(res);
    //     });
    // });

    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};
