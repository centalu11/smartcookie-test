import { Router } from "express";
import { UserController } from "../controllers";

const routes = Router();

routes.get("/users/subscribe", [], UserController.subscribe);

export default routes;
