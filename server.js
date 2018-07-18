const 
     express = require('express'),
     bodyParser = require('body-parser'),
     logger = require('morgan'),
     
     productsRouter = require('./API/routes/products'),
     ordersRouter = require('./API/routes/orders'),

     port = process.env.PORT || 3000,
     app = express();

class Server {
       
        constructor(){
            this.initExpressMiddleware();
            this.initRouts();
            this.start();   
        }


        start(){
            app.listen(port,()=> console.log('Server Start At Port',port));
        }

        initDB(){
           
        }
        
        initExpressMiddleware(){
            app.use(logger('dev'));
            app.use(bodyParser.urlencoded({ extended: false}));
            app.use(bodyParser.json());

            // app.use((req,res,next)=>{
            //     res.header('Access-Control-Allow-Origin','*');
            //     res.header('Access-Control-Allow-Headers','Origin , X-Requested-With, Content-Type, Accpet, Authorization');
            //     if(req.method == 'OPTIONS'){
            //         res.header("Access-Control-Allow-Methods",'PUT,PATCH,POST,DELETE,GET');
            //         return res.status(200).json({});
            //     }

            // });

        }

        initRouts(){
            app.use('/products', productsRouter);
            app.use('/orders', ordersRouter);

            // if req pass all routes , that mean it not found 
            app.use((req,res,next)=>{
                let err = new Error('Not Found..');
                err.status = 404;
                next(err);// to next middelware
            });

            app.use((err,req,res,next)=>{
                res.status(err.status || 500);
                res.json({
                    error: {
                        message: err.message
                    } 
                });
            });
        }

}

// export class
module.exports = Server;