const express = require('express');
const app = express();
require('dotenv').config();
require('./db');
const productRoute = require('./routes/productRoutes');
const userRoute = require('./routes/userRoutes');
app.use(express.json());

const PORT = process.env.PORT || 8080;

app.get('/', (req,res)=>{
    res.send('API is Up and running');
})
app.use('/products', productRoute);
app.use('/users', userRoute);

app.listen(PORT, ()=>{
    console.log('Server is running on PORT:',PORT);
});