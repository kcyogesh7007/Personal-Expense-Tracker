const { getExpense } = require("../controller/expenseController");
const isAuthenticated = require("../middleware/isAuthenticated");
const catchAsync = require("../services/catchAsync");

const router = require("express").Router();

router.route("/expense").get(isAuthenticated, catchAsync(getExpense));

module.exports = router;
