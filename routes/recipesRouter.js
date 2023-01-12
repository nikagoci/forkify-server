const express = require('express');
const recipesController = require('../controllers/recipesController')

const router = express.Router();

router.route("").get(recipesController.getAllRecipe).post(recipesController.addRecipe);
router.route("/:id").get(recipesController.getRecipe).patch(recipesController.updateRecipe).delete(recipesController.deleteRecipe);

module.exports = router;