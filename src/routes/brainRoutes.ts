import {Router} from "express";
import { userAuth } from "../middleware/userAuth.js";
import { createLink, getLink } from "../controller/brainController.js";

const brainRouter = Router();


brainRouter.post("/share" , userAuth , createLink );
brainRouter.get("/:sharelink"  ,  getLink )



export default brainRouter;
