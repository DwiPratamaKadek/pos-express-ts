import { Router } from "express";
import { CustomerController } from "../../controller/masterdata/CustomerController";

const router =  Router()

router.get("/", CustomerController.get)
router.post("/", CustomerController.creted)
router.put("/:id",CustomerController.update)
router.delete("/:id",CustomerController.delete)

export default router;
