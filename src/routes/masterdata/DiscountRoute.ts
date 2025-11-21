import { Router } from "express";
import { DiscountController } from "../../controller/masterdata/DiscountController";

const router =  Router()

router.get("/", DiscountController.get)
router.post("/", DiscountController.creted)
router.put("/:id",DiscountController.update)
router.delete("/:id",DiscountController.delete)

export default router;
