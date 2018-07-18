const 
      express = require('express'),
      router = express.Router(),
     
     
      mysql      = require('mysql'),
      connDB = mysql.createConnection({
        host     : 'localhost',
        user     : 'migzz',
        password : 'migzz',
        database : 'Node-RESTful-Shop'
      }); 

      // Main route ' /orders '     
router.get('/',(req,res,next)=>{

    let query = connDB.query('SELECT * FROM `orders`',(err,results)=>{
        if(err) throw err;

        res.status(201).json({
            message:'Handel req Form GET Method (order) ..'  ,
            status : 'SELECT ALL DONE ..',
            orders: results     
        });

    });

});  

router.post('/',(req,res,next)=>{
        let order = {
            productId : req.body.productId,
            quantity : req.body.quantity
        }; 

        let query = connDB.query('INSERT INTO `orders` SET ?',order,(err,result)=>{

            if(err) throw err;

            res.status(201).json({
                message:'Handel req Form POST (order) ..'  ,
                status : 'INSERT DONE ..',
                order: result     
             });

        });

}); 


router.patch('/:id',(req,res,next)=>{
    let id = req.params.id;

    let query = connDB.query('SELECT * FROM `orders` WHERE orderId = ?',
                  [id],
                  (err,result)=>{

        if(err) throw err;

        res.status(201).json({
            message:'Handel req Form PATCH (order) ..'  ,
            status : 'DELETE ORDER DONE ..',
            order: result     
         });

    });

}); 


router.delete('/:id',(req,res,next)=>{
    let id = req.params.id;

    let query = connDB.query('DELETE FROM`orders` WHERE orderId=?',
                 [id],
                 (err,result)=>{

        if(err) throw err;

        res.status(201).json({
            message:'Handel req Form DELETE (order) ..'  ,
            status : 'DELETE DONE ..',
            order: result     
         });

    });

}); 

// exports order
module.exports = router;