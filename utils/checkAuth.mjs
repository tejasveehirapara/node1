import { tokenVerify } from "./CreateToken.mjs"

const checkAuth = (req, res, next) => {
    const isToken = req.header('Authorization')
    if (!isToken) {
        res.send({ code: 400, message: "UnAuthorize" })
    }
    const verifyToken = tokenVerify(isToken)
    if (!verifyToken) {
        res.send({ code: 400, message: "UnAuthorize" })
    }

}

export { checkAuth }