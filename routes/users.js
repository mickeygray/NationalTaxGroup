const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");

const User = require("../models/User");

// @route     POST api/users
// @desc      Regiter a user
// @access    Public
router.post(
  "/",
  [
    check("name", "Please add name").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ msg: "User already exists" });
      }

      user = new User({
        name,
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);
router.get("/", auth, async (req, res) => {
  console.log(req.query.q);
  try {
    const regex = new RegExp(`${req.query.q}`, "gi");
    users = await User.find({ name: regex });
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/:_id/name", auth, async (req, res) => {
  const user = await User.findById(req.params.id);

  const { name } = user;
  res.json(name);
});

router.get("/:_id/name", auth, async (req, res) => {
  const user = await User.findById(req.params.id);

  const { name } = user;
  res.json(name);
});

router.get("/:_id", auth, async (req, res) => {
  const user = await User.findById(req.params.id);

  res.json(user);
});

router.put("/:id/reminders", auth, async (req, res) => {
  console.log(req.body);
  try {
    const user = await User.findByIdAndUpdate(req.params._id, {
      $push: {
        "reminders": {
          text: req.body.text,
          user: req.params._id,
          userReminded: req.body._id,
          reminderDate: Date.now(),
          reminderDueDate: req.body.reminderDueDate,
          status: req.body.status,
          daysTilDue: req.body.reminderDueDate - Date.now(),
        },
      },
    });
    res.json(user);

    console.log(user);
  } catch (err) {
    console.log(err);
  }
});

//delete Reminders

// @route     DELETE api/contacts/:id
// @desc      Delete contact
// @access    Private
router.delete("/:id", auth, async (req, res) => {
  const user = req.params._id;
  const reminderId = req.body.id;

  try {
    await User.findOneAndUpdate(
      { user: user, "reminders.id": reminderId },
      { $pull: { "reminders": { "id": reminderId } } }
    );

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
