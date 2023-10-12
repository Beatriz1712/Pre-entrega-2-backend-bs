import { Router } from 'express';
import {productsModel} from '../models/products.model.js'
import ProductManager from "../../controllers/ProductManager.js"
//const db = new ProductManager("productos.json")
export const router = Router();
const product = new ProductManager();

// Trae los productos por Id
router.get("/:id", async (req, res) => {

    try {
        const prodId = req.params.id;
        const productDetails =  await product. getProductById(prodId);
        res.send("viewdetails",{product: productDetails}
            
        )
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el producto' })
    }
})
/**********limit******** */
//http://localhost.8080/api/products/limit/numeroLimite
router.get("/limit/:limit", async (req, res)=>{
    let limit = parseInt(req.params.limit)
    if (isNaN(limit) || limit <= 0){
        limit = 10;//valor predeterminado
    }
    res.send(await product.getProductByLimit(limit))
})
/**********page************ */
router.get("/page/:page", async (req, res)=>{
    let page = parseInt(req.params.page)
    if (isNaN(page) || page <= 0){
        page = 1;//valor predeterminado
    }
    const productsPerPage  = 1;
    res.send(await product.getProductByPage(page, productsPerPage))
})


router.post("/", async (req, res) => {
    let{ title, description, code, price, stock } = req.body
    if (!title ||  !description  || !code || !price  ||!stock  ) {
            res.send({
                status: 'error',
                error: 'Nos encontró parametros'
            })
        }  // error: "Datos incompletos" })
        let result= await productsModel.create({
            title, description, code, price, stock   
        })
        res.send({
            result: 'success',
            payload: result
        })
})



router.put("/:pid", async (req, res) => {
    let { pid } = req.params
    let productsToReplace = req.body
    if(!productsToReplace.title ||  !productsToReplace.description  || !productsToReplace.code ||
         !productsToReplace.price  || !productsToReplace.stock ){
            res.send({
                result: 'error',
                error: 'Debe enviar un id de producto  y datos a modificar'
            })  
    }
    let result = await productsModel.updateOne({
        _id: pid}, productsToReplace)
    res.send({
        result: 'success',
        payload: result
    })
})

router.delete("/:pid", async (req, res) => {
    let { pid } = req.params
    let result = await productsModel.deleteOne({
        _id:pid })
        res.send({
            result: 'success',
            payload: result  
        })
})

export default router



