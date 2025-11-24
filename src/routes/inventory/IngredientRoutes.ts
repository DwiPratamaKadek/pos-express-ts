import { Router } from "express";
import { IngredientController } from "../../controller/inventory/IngredientController";

const router =  Router()

router.get("/", IngredientController.get)
router.post("/", IngredientController.creted)
router.put("/:id",IngredientController.update)
router.delete("/:id",IngredientController.delete)

export default router;
