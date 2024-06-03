import { Router } from "express";
import { roommateController } from "../controllers/roommate.controller.js";
const router = Router()

router.get('/', roommateController.getRoommates)
router.post('/', roommateController.addRoommate)


export default router;