import mongoose from "mongoose"

const UserDestroy = new mongoose.Schema({
    userId: { type: String, require: true },
    token: { type: String }
})

export { UserDestroy }