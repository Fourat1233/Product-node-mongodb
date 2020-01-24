//MONGODB PW = 6vdCnxdNGKTtD1xX
//MONGODB CONNECTion = mongodb+srv://fourat:<password>@nodejs-i0chz.mongodb.net/test?retryWrites=true&w=majority

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://fourat:6vdCnxdNGKTtD1xX@nodejs-i0chz.mongodb.net/test?retryWrites=true&w=majority',{ useUnifiedTopology: true , useNewUrlParser: true })
.then(
    ()=>{
        console.log('connected successfully');
    }
).catch((error) => {
    console.log('Unable to connect to MongoDB Atlas!');
    console.error(error);
  });

  const Product = require('./models/product');


/* CORS Setup*/
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
app.use(bodyParser.json());


app.post('/api/products', (req, res, next) => {
    const product = new Product({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,   
      inStock: req.body.inStock,
     
    }); 
    product.save().then(
      () => {
        res.json({product});
       
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  });
  
  app.put('/api/products/:id', (req, res, next) => {
    const product = new Product({
      _id: req.params.id,
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      inStock: req.body.inStock,
      
    });
    Product.updateOne({_id: req.params.id}, product).then(
      () => {
        res.status(201).json({
          message: 'Product updated successfully!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  });


  app.get('/api/products/:id', (req, res, next) => {
    Product.findOne({
      _id: req.params.id
    }).then(
      (product) => {
        res.status(200).json({ product: product });
      }
    ).catch(
      (error) => {
        res.status(404).json({
          error: error
        });
      }
    );
  });

  app.delete('/api/products/:id', (req, res, next) => {
    Product.deleteOne({_id: req.params.id}).then(
      () => {
        res.status(200).json({
          message: 'Deleted!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  });

  app.use('/api/products', (req, res, next) => {
    Product.find().then(
      (product) => {
        res.status(200).json({products: product});
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  });






module.exports = app;