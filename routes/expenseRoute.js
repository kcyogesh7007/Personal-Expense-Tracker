const {
  getExpense,
  createExpense,
  updateExpense,
  deleteExpense,
} = require("../controller/expenseController");
const isAuthenticated = require("../middleware/isAuthenticated");
const catchAsync = require("../services/catchAsync");

const router = require("express").Router();

router
  .route("/expenses")
  .get(isAuthenticated, catchAsync(getExpense))
  .post(isAuthenticated, catchAsync(createExpense));

router
  .route("/expenses/:id")
  .patch(isAuthenticated, catchAsync(updateExpense))
  .delete(isAuthenticated, catchAsync(deleteExpense));

module.exports = router;
