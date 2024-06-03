import { Router } from "express";
import { gastoController } from "../controllers/gasto.controller.js";
const router = Router()


router.get('/', gastoController.getGastos)
router.post('/', gastoController.addGasto)
router.put('/:gasto_id', gastoController.updateGasto)
router.delete('/:id', gastoController.removeGasto)


export default router;