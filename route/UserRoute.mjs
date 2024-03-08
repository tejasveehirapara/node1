import express from "express"
import bcrypt from "bcrypt"
import { UserModal } from "../modal/UserModal.mjs"
import { sendMail } from "../utils/SendMail.mjs"
import { tokenGenerate, tokenVerify } from "../utils/CreateToken.mjs"
import { UserSessionModal } from "../modal/UserSession.mjs"

const route = express.Router()

route.post('/signup', async (req, res) => {
    const { username, email, password } = req.body
    const user = await UserModal.findOne({ email })
    console.log(user, 'userr')
    if (user) {
        return res.json({ message: 'User Already existed' })
    }
    const hashPassword = await bcrypt.hash(password, 10)
    const newUser = new UserModal({
        username,
        email,
        password: hashPassword,
    })
    console.log(newUser, email, 'newModal')
    await newUser.save()
    return res.json({ message: "User Create successfully", data: newUser })
})

route.post("/login", async (req, res) => {
    console.log(req.body, 'body')
    const { email, password } = req.body
    const isExist = await UserModal.findOne({ email })
    if (!isExist) {
        return res.json({ message: "User Not register" })
    }
    const validPassword = await bcrypt.compare(password, isExist.password)
    if (!validPassword) {
        return res.json({ message: "password is incorrect" })
    }
    const token = tokenGenerate(isExist._id, '1h')
    res.cookie('token', token, { httpOnly: true, maxAge: 360000, secure: true })
    await UserSessionModal.create({
        userId: isExist._id,
        token: token
    })
    return res.send({ status: true, message: 'Login successfully', data: isExist, token })
})

route.post('/forget-password', async (req, res) => {
    const { email } = req.body
    const isExist = await UserModal.findOne({ email })
    if (!isExist) {
        return res.json({ message: 'Email not register' })
    }
    const token = tokenGenerate(isExist._id, '5m')
    try {
        const response = await sendMail(isExist.email, `http://localhost:3000/reset-password/${token}`)
        return res.send(response)
    } catch (err) {
        return res.send(err)
    }
})

route.post('/reset-password/:token', async (req, res) => {
    const { token } = req.params
    const { password } = req.body
    try {
        const userId = await tokenVerify(token).id
        const hashPassword = await bcrypt.hash(password, 10)
        await UserModal.findByIdAndUpdate({ _id: userId }, { password: hashPassword })
        return res.send({ status: true, message: "password Update success" })
    } catch (errr) {
        return res.send({ success: false, message: "Invalid Token" })
    }
})

export { route as UserRoute }