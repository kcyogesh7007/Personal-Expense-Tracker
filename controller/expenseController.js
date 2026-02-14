const Expense = require("../model/expenseModel");

//create expense
exports.createExpense = async (req, res) => {
  const { title, amount, category, date } = req.body;
  const userId = req.user._id;
  if (!title || !amount || !category) {
    return res.status(400).json({
      message: "Please provide title,amount and category",
    });
  }
  const expense = await Expense.create({
    title,
    amount,
    category,
    date,
    user: userId,
  });
  res.status(200).json({
    message: "Expense created successfully",
    data: expense,
  });
};
// 5cCI6IkpXVCJ9.eyJpZCI6IjY5OGYzZDIwOTljNzI1M2RjNTYyNzc0MiIsImlhdCI6MTc3MTA3NjY4MCwiZXhwIjoxNzcxNjgxNDgwfQ.7VkkIpPMf5kdFeBfpkKVTG_3nCJCs7RwJ2vESlbqnOU

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
exports.updateExpense = async (req, res) => {
  const expense = await Expense.findById(req.params.id);

  if (!expense) {
    return res.status(404).json({
      message: "Expense not found",
    });
  }

  if (expense.user.toString() !== req.user.id) {
    return res.status(401).json({
      message: "Not authorized to update this expense",
    });
  }

  expense.title = req.body.title || expense.title;
  expense.amount = req.body.amount || expense.amount;
  expense.category = req.body.category || expense.category;
  expense.date = req.body.date || expense.date;

  const updatedExpense = await expense.save();

  res.status(200).json({
    message: "Expense updated successfully",
    data: updatedExpense,
  });
};

// Delete expense

exports.deleteExpense = async (req, res) => {
  const deletedExpense = await Expense.findOneAndDelete({
    _id: req.params.id,
    user: req.user.id, // 🔐 Ownership check
  });

  if (!deletedExpense) {
    return res.status(404).json({
      message: "Expense not found or not authorized",
    });
  }

  res.status(200).json({
    message: "Expense deleted successfully",
  });
};
