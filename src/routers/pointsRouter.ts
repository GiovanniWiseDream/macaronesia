import { Router } from "express";
import { pointsController } from "../controllers/pointController";
import { format } from "path";
class pointsRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.getRoutes();
    this.postRoutes();
    this.patchRoutes();

    this.deleteRoutes();
  }
  getRoutes() {
    this.router.post("/allPoints", pointsController.findAll);
  }

  deleteRoutes() {}
  postRoutes() {
    this.router.post("/getpoint", pointsController.findById);
    this.router.post("/addPoints", pointsController.addPoints);
  }

  patchRoutes() {
    this.router.patch("/deletePoint", pointsController.deleteById);
  }
}
export default new pointsRouter().router;