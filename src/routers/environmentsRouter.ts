import { Router } from "express";
import { environmentsController } from "../controllers/environmentsControllers";
class environmentsRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.getRoutes();
    this.postRoutes();
    this.patchRoutes();

    this.deleteRoutes();
  }
  getRoutes() {
    this.router.get("/getEnv", environmentsController.GetEnvironment);
  }

  deleteRoutes() {}
  postRoutes() {
    this.router.post("/create", environmentsController.CreateEnvironment);
    this.router.post("/delete", environmentsController.DeleteEnvironment)
  }

  patchRoutes() {
    this.router.patch("/update", environmentsController.UpdateEnvironment)

  }
}
export default new environmentsRouter().router;
