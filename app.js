const express = require('express');
const app = express();
const recipesRouter = require('./routes/recipesRouter')
const cors = require('cors')


app.use(express.json());
app.use(cors())

app.use("/api/v1/recipes", recipesRouter)

module.exports = app