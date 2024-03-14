import { UserModal } from "../modal/UserModal.mjs"
import { destroySession, tokenVerify } from "./CreateToken.mjs"

const checkAuth = async (req, res, next) => {
    try {
        const isToken = req.header('Authorization')
        if (!isToken) {
            return res.send({ code: 400, message: "UnAuthorize" })
        }
        const verifyToken = tokenVerify(isToken)
        if (!verifyToken) {
            await destroySession(isToken)
            return res.send({ code: 400, message: "UnAuthorize" })
        }
        const userId = verifyToken.id
        const user = await UserModal.findById(userId)
        req.user = user.toJSON();
        next()
    } catch (err) {
        res.send({ code: 400, message: "UnAuthorize" })
    }


}

export { checkAuth }