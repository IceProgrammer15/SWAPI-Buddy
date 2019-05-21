var express = require('express');
var apiRoutes = require('./routes');

var isDevelopment = process.env.NODE_ENV !== 'production';
const PORT = process.env.port || 5000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use("/", express.static("./static"));
app.use("/api", apiRoutes);

const server = app.listen(PORT, ()=>{
    console.log(`Listening on port ${server.address().port}`);
});