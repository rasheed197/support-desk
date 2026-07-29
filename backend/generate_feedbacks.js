const mongoose = require("mongoose");
const fs = require("fs");
const Feedback = require("./models/feedbackModel");

mongoose
  .connect("mongodb://tiamiyurasheedtr_db_user:pjFTmN9QMy0NUq8k@ac-51ez14w-shard-00-00.qayqfyb.mongodb.net:27017,ac-51ez14w-shard-00-01.qayqfyb.mongodb.net:27017,ac-51ez14w-shard-00-02.qayqfyb.mongodb.net:27017/?ssl=true&replicaSet=atlas-wzr684-shard-0&authSource=admin&appName=Cluster0", {
    dbName: "supportdeskdb",
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

// 2. Read and Parse the JSON file
// fs.readFileSync converts the file to text, JSON.parse converts text to a JS Object
const jsonData = JSON.parse(fs.readFileSync("./feedbacks.json", "utf-8"));

// 3. Insert data into the database
const importData = async () => {
  try {
    // IF YOUR JSON IS AN ARRAY OF OBJECTS: Use insertMany
    if (Array.isArray(jsonData)) {
      await Feedback.insertMany(jsonData);
      console.log("Array of JSON data successfully saved!");
    }
    // IF YOUR JSON IS A SINGLE OBJECT: Use create
    else {
      await Feedback.create(jsonData);
      console.log("Single JSON object successfully saved!");
    }

    process.exit(); // Close script execution
  } catch (error) {
    console.error("Error importing data:", error);
    process.exit(1);
  }
};

importData();

// Run script Bash: node slug.js
