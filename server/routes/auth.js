import express from "express";
import { login } from "../controllers/auth.js";
import bodyParser from "body-parser";


const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/login', async (req, res) => {
  try {
    const response = await login(req, res);
    if (res.statusCode === 500 || res.statusCode === 404 || res.statusCode === 400) {
      return res.status(400);
    } else { 
      return res.status(200);
    } // Return the response from the controller
  } catch (error) {
    console.log("routes eror : " + error)
    return res.status(400); // Return the error response
  }
});

export default router;
