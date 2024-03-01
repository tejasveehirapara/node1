import express from "express"
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from "dotenv"
import multer from "multer";
import { fileURLToPath } from 'url';
dotenv.config()
import { UserRoute } from './route/UserRoute.mjs';
import router from "./route/index.mjs";
import path, { dirname } from "path";

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename);
const app = express()
app.use(cookieParser())
app.use(cors({
    origin: ["http://localhost:3000/"],
    credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./", '/uploads')))
app.use(multer().any());



const PORT = process.env.PORT || 8080

const schemaData = mongoose.Schema({
    name: String,
    email: String,
    mobile: Number
}, {
    timestamps: true
})

// const userModal = mongoose.model('user', schemaData)

// // api for get user data
// app.get('/', async (req, res) => {
//     const data = await userModal.find({})
//     res.json({ success: true, data: data })
// })

// // api for create new user
// app.post('/create', async (req, res) => {
//     const data = new userModal(req.body)
//     await data.save()
//     res.send({ success: true, message: 'data save successfully', data: data })
// })

// //api for update one user
// app.put('/update', async (req, res) => {
//     const { id, ...rest } = req.body
//     const data = await userModal.updateOne({ _id: id }, rest)
//     res.send({ success: true, message: 'data update success', data: data })
//     console.log(req.body, 'idddd')
// })

// // delete user using id
// app.delete('/delete/:id', async (req, res) => {
//     const { id } = req.params
//     const data = await userModal.deleteOne({ _id: id })
//     res.send({ success: true, data: data, message: "user delete successfully" })
//     console.log(id, 'idd')
// })

app.use('/api/v1', router)

mongoose.connect('mongodb://localhost:27017/crud-operation', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('connect')

    app.listen(PORT, () => {
        console.log("Server is running")
    })
}).catch((err) => {
    console.log('first')
})

