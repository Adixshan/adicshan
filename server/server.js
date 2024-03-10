const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose= require('mongoose');
const PORT = 3001;


const db="mongodb+srv://rk8816616:4HVotU5UX65XZW2R@cluster0.rfb1nwj.mongodb.net/adicshan";

mongoose.connect(db,{
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(()=>{
  console.log('connected to database');
})
.catch((error)=>{
  console.log('error:',error);
});


const userSchema= new mongoose.Schema({
  email: String,
  password: String
});


const User= mongoose.model('users',userSchema);

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post('/', (req, res) => {
  console.log('hello world');
});

app.post('/signIn',async(req,res)=>{
   const {email,password}=req.body;
   console.log('email:',email);
   const existingUser=await User.findOne({email:email});
   if(existingUser){
    console.log('user found');
    res.status(200).json({message:'User already exists'});
   }else{
console.log('user not found');
   const newUser= new User({
    email: email,
    password: password
   });


   await newUser.save();
   res.status(200).json({message:'User successfully signed In'});

  }
});


app.post('/login',async(req,res)=>{
  const {email,password}=req.body;
  console.log('email:',email);
const existingUser= await User.findOne({email: email});
if(existingUser){
    if (existingUser.password === password){
      res.status(200).json({message:'User successfully loged in'});
    }
    else{
      res.status(400).json({message:'Incorrect password'});
    }
} 
else{
  console.log('no user found');
  res.status(400).json({message: 'no user found'});
}
});

app.post('/data',async(req,res)=>{
const {email}=req.body;
});



app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
