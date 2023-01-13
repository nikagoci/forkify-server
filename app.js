const express = require('express');
const app = express();
const recipesRouter = require('./routes/recipesRouter')
const cors = require('cors')
 
const corsOpts = {
    origin: '*',
    credentials: true,
    methods: ['GET','POST','HEAD','PUT','PATCH','DELETE'],
    allowedHeaders: ['Content-Type'],
    exposedHeaders: ['Content-Type']
};

app.use(cors(corsOpts));
app.use(express.json());

app.use("/api/v1/recipes", recipesRouter)

module.exports = app