
import jsonwebtoken from "jsonwebtoken"

export const tokenGenerate = (id, expiresIn) => {
    return jsonwebtoken.sign({ id: id }, process.env.KEY, { expiresIn: expiresIn })
}

export const tokenVerify = (token) => {
    return jsonwebtoken.verify(token, process.env.KEY)
}