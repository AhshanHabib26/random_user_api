const express = require("express");
const router = express.Router();
const fs = require("fs");
const userData = require("../user.json");
const { v4: uuidv4 } = require("uuid");

router.get("/", (req, res) => {
  res.send("Hello World");
});

router.get("/random", (req, res) => {
  fs.readFile("../user.json", (err, data) => {
    if (err) {
      console.log(err);
    }
    const dataParsed = JSON.parse(data);
    console.log(dataParsed);
    const randomNum = Math.floor(Math.random() * dataParsed);
    const randomData = userData.find((rd) => rd.id === randomNum);
    if (!randomData) {
      res.status(404).send("Data Does Not Exist");
    } else {
      res.send(randomData);
    }
  });
});

router.get("/all", (req, res) => {
  fs.readFile("user.json", "utf-8", (err, data) => {
    if (err) {
      res.status(500).send("Internal Server Error");
    } else {
      const allData = JSON.parse(data);
      res.status(200).send(allData);
    }
  });
});

router.post("/save", (req, res) => {
  const { name, gender, contact, address, photoUrl } = req.body;
  if (!name) {
    return res.json({
      error: "Name is required",
    });
  }
  if (!gender) {
    return res.json({
      error: "Gender is required",
    });
  }
  if (!contact) {
    return res.json({
      error: "Contact is required",
    });
  }
  if (!address) {
    return res.json({
      error: "Address is required",
    });
  }
  if (!photoUrl) {
    return res.json({
      error: "PhotoUrl is required",
    });
  }

  const newUser = req.body;
  const updateUser = { id: uuidv4(), ...newUser };

  fs.appendFile("user.json", JSON.stringify(updateUser), (err, data) => {
    if (err) {
      console.log(err);
    } else {
      userData.push(updateUser);
      res.send("File Create");
    }
  });
});

router.patch("/update/:id", (req, res) => {
  const id = req.params.id;
  const upData = req.body;
  const OData = userData.find((userD) => userD.id === Number(id));

  fs.writeFileSync("../user.json", JSON.stringify(upData), (err) => {
    if (err) {
      return console.log(err);
    }
  });

  res.send("Success");
});



router.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  const dataCollection = userData.filter((ucl) => ucl.id !== Number(id));
  console.log(dataCollection);
  fs.writeFile("../user.json", JSON.stringify(dataCollection), (err) => {
    if (err) {
      console.log(err);
    }
  });
  res.send("Removed");
});

module.exports = router;
