const Expense = require("../model/expenseModel");

//create expense
exports.createExpense = async (req, res) => {};

exports.getExpense = async (req, res) => {
  const userId = req.user._id;
  const expense = await Expense.find({ user: userId });
  if (!expense) {
    return res.status(400).json({
      message: "You dont have any expense",
    });
  }
  res.status(200).json({
    message: "Expense fetched successfully",
    data: expense,
  });
};
// Update expense

// Delete expense
