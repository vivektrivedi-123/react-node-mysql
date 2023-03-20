import { db } from "../config/db.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const resgister =(req,res)=>{
  // console.log("register", req)
  const q = "SELECT * FROM users WHERE email = ?";
  db.query(q,[req.body.email],(err,data)=>{
    if(err) return res.status(400).json(err);
    if(data.length) return res.status(409).json("User already exist");
    
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password,salt)

    const q = "INSERT INTO users(`username`,`email`,`password`) VALUES (?)";
    const values = [req.body.username,req.body.email,hash]
    db.query(q,[values],(err,data)=>{
        if(err) return res.status(400).json(err)
        return res.status(200).json('User has been created')
    })
  })
}

export const login =(req,res)=>{
   const q = "SELECT * FROM users WHERE email = ?"
   db.query(q,[req.body.email] ,(err,data)=>{
    if(err) return res.status(400).json(err);
    if(data.length===0) return res.status(409).json("User not found");
    const isPasswordCheck = bcrypt.compareSync(req.body.password , data[0].password);
    if(!isPasswordCheck) return res.status(400).json('Wrong username or password')
    const token = jwt.sign({id:data[0].id},"ssihdihihihideewsc");
    const {password , ...other} = data[0]

    res.cookie("access_token",token,{
        httpOnly:true,
    }).status(200).json(other)
   })
}

export const logout =(req,res)=>{
    res.clearCookie('access_token',{
        sameSite:"none",
        secure:true,
    }).status(200).json('user has been logged out')
}