import { Router } from "express";
import { RoleController } from "../../controller/masterdata/RoleController";

const router =  Router()

router.get("/", RoleController.get)
router.post("/", RoleController.creted)

export default router;
