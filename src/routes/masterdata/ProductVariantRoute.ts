import { Router } from "express";
import { ProductVariantController } from "../../controller/masterdata/ProductVariantController";

const router =  Router()

router.get("/", ProductVariantController.get)
router.post("/", ProductVariantController.creted)
router.put("/:id",ProductVariantController.update)
router.delete("/:id",ProductVariantController.delete)

export default router;
