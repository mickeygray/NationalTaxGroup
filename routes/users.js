const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");
const moment = require("moment");
const Prospect = require("../models/Prospect");
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

    const {
      name,
      email,
      password,
      resoCred,
      resoCred2,
      role,
      admin,
    } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ msg: "User already exists" });
      }

      user = new User({
        name,
        email,
        password,
        resoCred,
        resoCred2,
        role,
        admin,
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

router.get("/search", auth, async (req, res) => {
  const reqObj = JSON.parse(req.query.q);

  const { endpoint, id, clientId } = reqObj;

  try {
    const user = await User.find({
      "tasks.id": id,
    });

    let prospect = await Prospect.findById(clientId);

    function search(nameKey, myArray) {
      for (var i = 0; i < myArray.length; i++) {
        if (myArray[i].name === nameKey) {
          return myArray[i];
        }
      }
    }

    const searchedArray = eval("prospect.resoStatus." + endpoint);

    const assignments = search(reqObj.name, searchedArray);

    console.log(assignments);
    res.json(assignments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.put("/payDay", auth, async (req, res) => {
  const splits = req.body;
  let user;

  for (const split of splits) {
    user = await User.findOneAndUpdate(
      { name: Object.keys(split).toString() },
      {
        "$push": {
          "payDay": parseInt(Object.values(split)),
        },
      }
    );
  }
});

router.get("/:id", auth, async (req, res) => {
  console.log(req);
  try {
    const user = await User.findById(req.params._id);
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.put("/:id/reminders", auth, async (req, res) => {
  var diff = new moment.duration(
    Date.parse(req.body.reminderDueDate) - Date.now()
  );
  try {
    const user = await User.findByIdAndUpdate(req.body.userReminded._id, {
      $push: {
        "reminders": {
          text: req.body.text,
          _id: req.body._id,
          userReminded: req.body.userReminded._id,
          reminderDate: Date.now(),
          reminderDueDate: req.body.reminderDueDate,
          status: req.body.status,
          daysTilDue: diff.asDays(),
          clientId: req.body.clientId,
          id: req.body.id,
        },
      },
    });
    res.json(user);
  } catch (err) {
    console.log(err);
  }
});

//delete Reminders

// @route     DELETE api/contacts/:id
// @desc      Delete contact
// @access    Private
router.delete("/:id/reminders", auth, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, {
      $pull: { "reminders": { "id": req.query.q } },
    });

    console.log(user);
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.delete("/:id/tasks", auth, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, {
      $pull: { "tasks": { "id": req.query.q } },
    });

    console.log(user);
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/:_id/name", auth, async (req, res) => {
  console.log(req.params._id);

  let user = await User.findById(req.params._id);

  res.json(user);
});

router.get("/:_id", auth, async (req, res) => {
  console.log(req.params._id);

  const user = await User.findById(req.params._id);

  console.log(user);

  res.json(user);
});

router.put("/:_id/tasks", auth, async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { name: req.body.assigned },
      {
        $push: {
          "tasks": {
            clientName: req.body.clientName,
            assignedDate: req.body.assignedDate,
            updatedDate: req.body.updatedDate,
            clientId: req.body.clientId,
            id: req.body.id,
            assigned: req.body.assigned,
            assignment: req.body.assignment,
          },
        },
      }
    );
    res.json(user);
    console.log(user);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
