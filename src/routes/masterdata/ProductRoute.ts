import { Router } from "express";
import { ProductController } from "../../controller/masterdata/ProductController";

const router =  Router()

router.get("/", ProductController.get)
router.post("/", ProductController.creted)
router.put("/:id",ProductController.update)
router.delete("/:id",ProductController.delete)

export default router;
