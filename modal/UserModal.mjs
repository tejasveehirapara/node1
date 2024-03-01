import mongoose from "mongoose";
import { UserSchema } from "../controller/UserController.mjs";

const UserModal = new mongoose.model('UserDetails', UserSchema)

export { UserModal }