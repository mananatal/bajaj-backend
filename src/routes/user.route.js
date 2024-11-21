import { Router } from "express";
import { getMethod, postMethod } from "../controller/user.controller.js";

const router=Router();
router.route('/').post(postMethod).get(getMethod);

export default router;