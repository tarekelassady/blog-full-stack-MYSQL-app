import express from "express"
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"
import postRoutes from "./routes/posts.js"
import cors from 'cors'
import cookieParser from "cookie-parser"
import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url';

const app= express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth",authRoutes);
app.use("/api/users",userRoutes);
app.use("/api/posts",postRoutes);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, '../client/public/upload')
    },
    filename: (req, file, cb) => {
      cb(null, Date.now()+file.originalname);
    }
  })
const upload=multer({storage});
app.post('/api/upload',upload.single('file'), (req,res)=>{
    const file=req.file;
    res.status(200).json(file.filename);
})

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname+"/public")));
const port=process.env.PORT || 8800
app.listen(port,()=>{
    console.log("Connected");
})
