import mongoose from "mongoose";
import { UserDestroy } from "../controller/UserSessionController.mjs";

const UserSessionModal = new mongoose.model('UserSession', UserDestroy)

export { UserSessionModal }