import { Router } from "express";
import { UserRoute } from "./UserRoute.mjs";
import { ProductRoute } from "./ProductRoute.mjs";

const router = Router()
router.use('/auth', UserRoute)
router.use('/product', ProductRoute)


export default router

