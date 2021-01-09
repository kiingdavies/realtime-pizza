const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');
const expressLayout = require('express-ejs-layouts');
const PORT = process.env.PORT || 3300;

// Assets
app.use(express.static('public'));

// set Template engine
app.use(expressLayout);
app.set('views', path.join(__dirname, '/resources/views'));
app.set('view engine', 'ejs');

// Get Home Page
app.get('/', (req, res)=> {
    res.render("home");
});

// Get Cart Page
app.get('/cart', (req, res)=>{
    res.render('customers/cart');
});

// Get Login Page
app.get('/login', (req,res)=>{
    res.render('auth/login');
});

// Get Register Page
app.get('/register', (req, res)=> {
    res.render('auth/register');
});

app.listen(PORT, ()=> {
    console.log(`Server is listening on port ${PORT}`);
});