import express from "express"
import Validator from "validatorjs"
import { ProductModal } from "../modal/ProductModal.mjs"
import fs from "fs"
import { upload } from "../utils/uploadImage.mjs"
import { checkAuth } from "../utils/checkAuth.mjs"
const route = express.Router()


route.post('/add-product', upload.single('product_image'), checkAuth, async (req, res) => {
    try {
        const validation = new Validator(req.body, {
            product_name: "required",
            date: "required"
        })
        if (validation.fails())
            return res.send({ code: 400, message: Object.values(validation.errors.errors)[0][0] })
        // console.log(req.body, req.files, 'filesss')
        const { product_name, date } = req.body
        const productData = { product_name, date }
        const url = req.protocol + '://' + req.get("host");
        if (req?.file?.originalname) {
            productData.product_image = url + '/product_image/' + req.file.originalname
        }
        console.log(productData, req?.file, 'productDataproductDataproductData')
        const product = new ProductModal(productData)
        const final_data = await product.save()
        return res.send({ message: "Add product successfully...", data: final_data })

    } catch (err) {
        console.log(err, 'wee')
        return res.send({ message: "something went wrong" })
    }
})


route.get('/get-product', async (req, res) => {
    try {
        const data = await ProductModal.find({})
        return res.send({ message: "Get....", data: data })

    } catch (err) {
        return res.send({ message: "Erro" })
    }
})

export { route as ProductRoute }