import express from 'express'
import { addReg,getReg} from "../controllers/RegController.js";

const router = express.Router();

router.get('/get-reg',getReg)
// router.get('/get-products/:product_id',getProduct)
router.post('/add-reg',addReg)

export default router;

