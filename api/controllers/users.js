import { db } from "../config/db.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

export const getUsers =(req,res)=>{
    const q = "SELECT * FROM users";
    db.query(q,(err,data)=>{
   
      if(err) return res.status(500).send(err)
      return res.status(200).json(data)
    })
  
  }

  export const getAUser =(req,res)=>{
    const q = "SELECT u.id,`username`,`email`,`image`,`bio`,`address`,`occupation`,`pin`,`country` FROM users u  WHERE u.id=?";
    db.query(q,[req.params.id], (err,data)=>{
      if(err) return res.status(500).json(err)
      return res.status(200).json(data[0])
    })
  }
  


export const updateUser =(req,res)=>{
    const token = req.cookies.access_token
  if(!token) return res.status(401).json('Not Authenticated')
  jwt.verify(token,"ssihdihihihideewsc",(err,userInfo)=>{
    if(err) return res.status(403).json('Token is not valid')
    // const salt = bcrypt.genSaltSync(10);
    // const hash = bcrypt.hashSync(req.body.password,salt)
    const postId = req.params.id
    const q = 'UPDATE users SET `username` =?,`email`=?,`image`=? , `bio`=?,`address`=?,`occupation`=?,`pin`=?,`country`=? WHERE `id`=?';
    const values =[
        req.body.username,
        req.body.email,
        req.body.image,
        req.body.bio,
        req.body.address,
        req.body.occupation,
        req.body.pin,
        req.body.country,
    ]
    db.query(q,[...values,postId,userInfo.id],(err,data)=>{
        if(err) return res.status(500).json(err)
        return res.status(200).json('profile has been updated')
    })

   })
}