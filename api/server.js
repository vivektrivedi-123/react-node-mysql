import express from 'express'
import cookieParser from 'cookie-parser'
const PORT = process.env.PORT||5000
import multer from 'multer'
import authRouter from './routes/auth.js'
import blogRouter from './routes/posts.js'
import userRouter from './routes/users.js'
const app = express()
app.use(express.json())
app.use(cookieParser())

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../client/public/upload')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname)
    }
  })
  

  const upload = multer({ storage: storage })

app.post('/api/upload', upload.single('file'), function (req, res) {
    const file = req.file
    res.status(200).json(file.filename)
  })


app.use('/api/auth',authRouter);
app.use('/api/v1',blogRouter);
app.use('/api',userRouter);
app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)
})