import express from "express";
import { login } from "../controllers/auth.js";
import bodyParser from "body-parser";

const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/login', async (req, res) => {
  try {
    const response = await login(req, res);
    console.log( "routes succes : " + res)
    return res.status(200);
  } catch (error) {
    console.log( "routes eror : " + error)
    return res.status(400);
  }
});

export default router;
