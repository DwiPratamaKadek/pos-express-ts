import { Router } from "express";
import { PaymentController } from "../../controller/payment/PaymentController";

const router =  Router()

// router.get("/", PaymentController.get)
router.post("/", PaymentController.create)
// router.put("/:id",PaymentController.update)
// router.delete("/:id",PaymentController.delete)

export default router;
