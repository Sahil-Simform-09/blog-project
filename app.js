const express  = require('express');
const app = express();


app.get('/', (req, res) => {
    console.log('welcome to Home page');
});
app.listen(3000, () => console.log('server is listing on port 3000'));