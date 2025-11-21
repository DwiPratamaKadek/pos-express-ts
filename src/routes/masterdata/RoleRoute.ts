import { Router } from "express";
import { RoleController } from "../../controller/masterdata/RoleController";

const router =  Router()

router.get("/", RoleController.get)
router.post("/", RoleController.creted)
router.put("/:id",RoleController.update)
router.delete("/:id",RoleController.delete)

export default router;
