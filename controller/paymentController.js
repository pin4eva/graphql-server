const { default: Transaction } = require("../models/Transaction");

const router = require("express").Router();

// For webhook

router.post("/", async (req, res) => {
  try {
    const transaction = Transaction.create({
      ...req.body,
      user: req.metadata.user,
      applicant: req.metadata.applicant,
    });
    res.json(transaction);
  } catch (error) {
    res.json(error);
  }
});

export default router;
