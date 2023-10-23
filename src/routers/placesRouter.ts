import { Router } from "express";
import { placesController } from "../controllers/placesController";
import { format } from "path";
class placesRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.getRoutes();
    this.postRoutes();
    this.patchRoutes();

    this.deleteRoutes();
  }
  getRoutes() {
    this.router.get("/getPlaces", placesController.GetPlaces);
  }

  deleteRoutes() {}
  postRoutes() {
    this.router.post("/createPlace", placesController.CreatePlace);
    this.router.post("/deletePlace", placesController.DeletePlace);
  }

  patchRoutes() {
    this.router.patch("/updatePlace", placesController.UpdatePlace);
  }
}
export default new placesRouter().router;
