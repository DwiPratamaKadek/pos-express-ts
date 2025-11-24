import { Router } from "express";
import { RecipeController } from "../../controller/inventory/RecipeController";

const router =  Router()

router.get("/", RecipeController.get)
router.post("/", RecipeController.creted)
router.put("/:id",RecipeController.update)
router.delete("/:id",RecipeController.delete)

export default router;
