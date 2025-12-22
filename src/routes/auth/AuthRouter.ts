import { Router } from "express";
import { AuthController } from "../../controller/auth/AuthController";


const router =  Router()

router.get("/", AuthController.Alldata)
router.post("/register", AuthController.register)
router.post("/login", AuthController.login)
// router.post("/", UserController.creted)
// router.put("/:id",UserController.update)
// router.delete("/:id",UserController.delete)

export default router;
