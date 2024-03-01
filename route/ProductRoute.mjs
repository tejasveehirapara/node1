import express from "express"
import Validator from "validatorjs"
import { ProductModal } from "../modal/ProductModal.mjs"
import { uploadImage } from "../utils/uploadImage.mjs"
// import { uploadImage } from "../utils/uploadImage"
const route = express.Router()


route.post('/add-product', async (req, res) => {
    try {
        const validation = new Validator(req.body, {
            product_name: "required",
            date: "required"
        })
        if (validation.fails())
            return res.send({ code: 400, message: Object.values(validation.errors.errors)[0][0] })
        // console.log(req.body, req.files, 'filesss')
        const { product_name, date } = req.body

        let image;
        if (req.files.length !== 0) {
            image = await uploadImage(req.files, 'product_image', 'product_image')
            console.log(req.files.length !== 0, 'image')
        }
        // data.product_image = image;
        const newProduct = new ProductModal({
            product_name,
            date,
            product_image: image
        })
        console.log(newProduct, 'image')
        // console.log(newUser, email, 'newModal')
        // await newUser.save()
        const product = await newProduct.save()
        console.log(product, 'ppp')
        return res.send({ message: "Add product successfully...", data: product })

    } catch (err) {
        return res.send({ message: "something went wrong" })
    }
})

export { route as ProductRoute }