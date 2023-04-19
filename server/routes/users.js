import express from "express";
import { newUser, deleteUser, allUsers, stateUsers } from "../controllers/user.js";
import bodyParser from "body-parser";

const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/newUser', async (req, res) => {
  try {
    const response = await newUser(req, res);
    console.log("routes succes : " + res)
    return res.status(200);
  } catch (error) {
    console.log("routes eror : " + error)
    return res.status(400);
  }
});
router.post('/delUser', async (req, res) => {
  try {
    const response = await deleteUser(req, res);
    console.log("routes succes : " + res)
    return res.status(200);
  } catch (error) {
    console.log("routes eror : " + error)
    return res.status(400);
  }
});
router.get('/allUsers', async (req, res) => {
  try {
    const response = await allUsers(req, res);
    console.log("routes succes ")
    return res.status(200);
  } catch (error) {
    console.log("routes eror " + error)
    return res.status(400);
  }
});
router.get('/stateUsers', async (req, res) => {
  try {
    const response = await stateUsers(req, res);
    console.log("routes succes ")
    return res.status(200);
  } catch (error) {
    console.log("routes eror " + error)
    return res.status(400);
  }
});

export default router;