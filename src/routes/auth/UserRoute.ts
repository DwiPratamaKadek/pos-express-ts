import { Router } from "express";
import { UserController } from "../../controller/auth/UserController";

const router =  Router()

router.get("/", UserController.get)
router.post("/", UserController.creted)
router.put("/:id",UserController.update)
router.delete("/:id",UserController.delete)

export default router;
