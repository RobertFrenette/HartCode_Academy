// require modules
const fs = require('fs');
const express = require('express');

const port = 3000;
var app = express();

// middleware
app.use(express.static(__dirname + '/public'));

app.listen(port, () => {
    console.log(`Express Server listening on http://localhost:${port}`);
});