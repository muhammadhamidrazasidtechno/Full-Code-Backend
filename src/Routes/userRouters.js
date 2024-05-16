import { Router } from "express";
import registerUser from "../Controllers/userControllers.js";
import  upload  from "../Middlewares/multerMiddlewares.js";

const router = Router()

router.get("/", (req, res) => {
    res.send("ök")
})
router.route("/register").post(
    upload.fields([
        {
            name: "avator",
            maxCount: 1
        }, 
        {
            name: "coverimage",
            maxCount: 1
        }
    ]),
    registerUser
    )
export default router;