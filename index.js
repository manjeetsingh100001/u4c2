const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

const connect = () => {
  return mongoose.connect(
    "mongodb://127.0.0.1:27017/banks"
  );
};


const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    middleName: { type: String, required: true },
    lastName: { type: String, required: false },
    age: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    gender: { type: String, required: true },
    type: { type: String, required: true },

  },
  {
    versionKey: false,
    timestamps: true, 
  }
);


const User = mongoose.model("user", userSchema); 


const branchSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    ifsc: { type: String, required: true },
    micr: { type: String, required: true },
    
  },
  {
    versionKey: false,
    timestamps: true, 
  }
);

const Branch = mongoose.model("branchdet",branchSchema ); 


const masterAccSchema = new mongoose.Schema(
    {
      balance: { type: String, required: true },
      
    },
    {
      versionKey: false,
      timestamps: true, 
    }
  );

  const Account = mongoose.model("masterAcc", masterAccSchema); 

  
const savingAccSchema = new mongoose.Schema(
    {
      acount_number: { type: String, required: true },
      balance: { type: String, required: true },
      interstRate: { type: String, required: true },
      
    },
    {
      versionKey: false,
      timestamps: true, 
    }
  );

  const savAccount = mongoose.model("savingAcc", savingAccSchema);
  
  
const fixedAccSchema = new mongoose.Schema(
    {
      acount_number: { type: String, required: true },
      balance: { type: String, required: true },
      interstRate: { type: String, required: true },
      startDate: { type: String, required: true },
      maturityDate: { type: String, required: true },
      
    },
    {
      versionKey: false,
      timestamps: true, 
    }
  );

  const fixedAccount = mongoose.model("fixedAcc", fixedAccSchema);






  //Routes or  Controllers




  app.get("/users", async (req, res) => {
    try {
      const users = await User.find().lean().exec();
  
      return res.status(200).send({ users: users }); // []
    } catch (err) {
      return res
        .status(500)
        .send({ message: "Something went wrong .. try again later" });
    }
  });
  app.post("/savingAcc", async (req, res) => {
    try {
      const user = await savAccount .create(req.body);
  
      return res.status(201).send(user);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  });
  app.post("/fixedAcc", async (req, res) => {
    try {
      const user = await fixedAccount.create(req.body);
  
      return res.status(201).send(user);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  });
  
app.listen(5000, async () => {
    try {
      await connect();
    } catch (err) {
      console.log(err);
    }
  
    console.log("listening on port 5000");
  });