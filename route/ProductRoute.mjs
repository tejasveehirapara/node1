import express from "express"
import Validator from "validatorjs"
import { ProductModal } from "../modal/ProductModal.mjs"
import fs from "fs"
import { upload } from "../utils/uploadImage.mjs"
import { checkAuth } from "../utils/checkAuth.mjs"
import { ObjectId } from "mongodb"
const route = express.Router()


route.post('/add-product', upload.array('product_image'), checkAuth, async (req, res) => {

    try {
        const validation = new Validator(req.body, {
            product_name: "required",
            date: "required"
        })
        if (validation.fails())
            return res.send({ code: 400, message: Object.values(validation.errors.errors)[0][0] })
        console.log(req.body, req.files, 'filesss')
        const { product_name, date } = req.body
        const productData = { product_name, date }
        if (req.user) {
            productData.userId = req.user._id
        }
        const url = req.protocol + '://' + req.get("host");
        if (req.files.length !== 0) {
            let images = []
            for (let i of req.files) {
                images.push(url + '/product_image/' + i.originalname)
            }
            productData.product_image = images
        }
        const product = new ProductModal(productData)
        const final_data = await product.save()
        console.log(final_data, "final--data")
        return res.send({ message: "Add product successfully...", data: final_data })

    } catch (err) {
        console.log(err, 'wee')
        return res.send({ message: "something went wrong" })
    }
})

route.get('/get-product', checkAuth, async (req, res) => {
    try {
        const userId = req.user._id
        const data = await ProductModal.find({ userId: userId })
        return res.send({ message: "Get....", data: data })

    } catch (err) {
        return res.send({ message: "Erro" })
    }
})

route.patch('/edit-product/:id', upload.array('product_image'), checkAuth, async (req, res) => {
    try {
        const { id } = req.params
        const data = req.body

        if (req.files.length !== 0) {
            const url = req.protocol + '://' + req.get("host");
            let images = []
            for (let i of req.files) {
                images.push(url + '/product_image/' + i.originalname)
            }
            data.product_image = images
        }
        const updatedData = await ProductModal.findOneAndUpdate({ _id: id }, data, { new: true })
        console.log(updatedData, 'updatedddd')
        return res.send({ success: true, data: updatedData, message: "Update Product success" })

    } catch (err) {

    }
})

route.delete('/delete-product', checkAuth, async (req, res) => {
    try {
        const { id } = req.query;
        const objectId = new ObjectId(id);
        const data = await ProductModal.deleteMany({ _id: { $in: objectId } })
        return res.send({ code: 200, message: "delete product success", data: data })
    } catch (err) {
        console.log(err, 'wee')
    }

})



export { route as ProductRoute }