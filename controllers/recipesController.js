const Recipe = require("../models/recipesModel");
const APIFeatures = require("../utils/apiFeatures");

exports.getAllRecipe = async (req, res) => {
  try {    
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    const features = new APIFeatures(Recipe.find(), req.query)
    .filter()
    .sort()
    .fieldLimit()
    .paginate();

    const recipes = await features.query;

    // let filteredData;

    // if(req.query.recipe){
    //   filteredData = allRecipe.filter(item => {
    //     return item.title.toLowerCase().includes(req.query.recipe.toLowerCase())
    //   })
    // }

    res.status(200).json({
      status: "success",
      length: recipes.length,
      recipes,
    });
  } catch (err) {
    console.log(err);

    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getRecipe = async (req, res) => {
  try {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    const singleRecipe = await Recipe.findById(req.params.id);

    res.status(200).json({
      status: "success",
      recipe: singleRecipe,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.addRecipe = async (req, res) => {
  try {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    const newRecipe = await Recipe.create(req.body);

    res.status(201).json({
      status: "success",
      recipe: newRecipe,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.updateRecipe = async (req, res) => {
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(201).json({
      status: "success",
      recipe: updatedRecipe,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.deleteRecipe = async (req, res) => {
  try {
    await Recipe.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: "success",
      recipe: null,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
