const
     express = require('express'),
     router = express.Router(),
     
     product = require('../modules/product')
     productController = require('../controler/product.controler'),
     
     
     mysql      = require('mysql'),
     connDB = mysql.createConnection({
       host     : 'localhost',
       user     : 'migzz',
       password : 'migzz',
       database : 'Node-RESTful-Shop'
     });     
  
// Main route ' /products '     
router.get('/',(req,res)=>{

      let query =  
            connDB.query('SELECT * FROM `products`',(err,results)=>{
            
                  if (err) throw err;

                  res.status(200).json({
                        message:'Handel req Form GET Method (products)  ..' ,
                        status :'SELECT ALL DONE ..',
                        products : results
                  });
         
           });

});

// Main route ' /products '     
router.post('/',(req,res)=>{
      let product = {
            productName : req.body.productName,
            productPrice : req.body.productPrice
      }; 

      let query =  
         connDB.query('INSERT INTO `products` SET ?',product,(err,result)=>{
         
          if (err) {
                console.log('ERROR:> ',err);
                throw err;
         } 
  
          res.status(201).json({
            message:'Handel req Form POST Method (products) ..' ,
            status :'INSERT DONE ..',
            product: result      
         });
           
        });

}); 

// Main route ' /products '     
router.patch('/:id',(req,res)=>{
      let id = req.params.id;

       let query =  
            connDB.query(
                  'SELECT * From `products` WHERE `productId`=?',
                  [id],
                  (err,result)=>{
            
                  if (err) throw err;

                  else if(result.length){
                     let obj = {
                        message:'Handel req Form PATCH Method (products)  ..',
                        status :'PATCH DONE ..',
                        product: result       
                   };
                   res.status(201).json(obj);

                  }else{

                      let obj = {
                        message:'Handel req Form PATCH Method (products)  ..',
                        product: 'Not Found In DB..'       
                        };

                        res.status(404).json(obj);
                  }
            
            });

      
});

   // Main route ' '     
router.delete('/:id',(req,res)=>{

      let id = req.params.id;

      let query =  
           connDB.query(
                 'DELETE FROM `products` WHERE `productId`=?',
                 [id],
                 (err,result)=>{
           
                 if (err) throw err;

                 else if(result.affectedRows > 0){

                    let obj = {
                       message:'Handel req Form PATCH Method (products)  ..',
                       status : 'DELETE DONE ..',
                       result: result       
                    };
                  res.status(201).json(obj);

                 }else{

                     let obj = {
                       message:'Handel req Form PATCH Method (products)  ..',
                       product: 'Not Found In DB..'       
                     };

                       res.status(404).json(obj);
                 }
           
           }); 

});


// exports router
module.exports = router;