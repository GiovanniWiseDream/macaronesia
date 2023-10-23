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
    this.router.get("/", (req, res) => {
      res.send("Estás en la página principal");
    });
    this.router.get("/getEnv", environmentsController.GetEnvironment);
    this.router.get("/getPlaces", environmentsController.GetPlaces);

  }

  deleteRoutes() {}
  postRoutes() {
    this.router.post("/create", environmentsController.CreateEnvironment);
    this.router.post("/delete", environmentsController.DeleteEnvironment);
    this.router.post("/createPlace", environmentsController.CreatePlace);
    this.router.post("/deletePlace", environmentsController.DeletePlace);
  }

  patchRoutes() {
    this.router.patch("/update", environmentsController.UpdateEnvironment);
    this.router.patch("/updatePlace", environmentsController.UpdatePlace);
  }
}
export default new environmentsRouter().router;
