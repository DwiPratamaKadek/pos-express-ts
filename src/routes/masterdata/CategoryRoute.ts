import { Router } from "express";
import { CategoryController } from "../../controller/masterdata/CategoryController";

const router =  Router()

router.get("/", CategoryController.get)
router.post("/", CategoryController.creted)
router.put("/:id",CategoryController.update)
router.delete("/:id",CategoryController.delete)

export default router;
