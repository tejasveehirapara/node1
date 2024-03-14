
import jsonwebtoken from "jsonwebtoken"
import { UserSessionModal } from "../modal/UserSession.mjs";

export const tokenGenerate = (id, expiresIn) => {
    return jsonwebtoken.sign({ id: id }, process.env.KEY, { expiresIn: expiresIn })
}

export const tokenVerify = (token) => {
    let value;
    try {
        value = jsonwebtoken.verify(token, process.env.KEY)
    } catch (err) {
        value = null
    }
    return value
}

export const destroySession = async (token) => {
    const response = {}
    try {
        const result = await UserSessionModal.deleteMany({
            token: token
        })
        if (result.deletedCount === 0) {
            throw new Error('No session found to destroy');
        }
        response.status = true;
        response.message = "Session destroyed";

    } catch (err) {
        response.status = false;
        response.message = err.message
    }

}