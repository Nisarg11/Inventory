const express = require('express');
const router = express.Router();


const dummy_products =[{

    id: "d1",
    Item: "Hammer",
    Type: "150 S6 DTH",
    Quantity : "01",
    Price: "100000"
}];

router.get('/:pid',(req, res, next ) =>{
   const productId = req.params.pid;
   const product = dummy_products.find(p => {
        return p.id === productId;
        
   });

   if(!product){
       res.status(404).json({message : "Could not Find a product for provided ID"})
   }
   res.json({product});
});

module.exports = router ;