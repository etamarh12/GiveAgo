import express from "express";
import { newOrder, delOrder, allOrders, comDelivery, takeDelivery } from "../controllers/orders.js";
import bodyParser from "body-parser";

const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/newDelivery', async (req, res) => {
  try {
    const response = await newOrder(req, res);
    console.log("routes succes : " + res)
    return res.status(200);
  } catch (error) {
    console.log("routes eror : " + error)
    return res.status(400);
  }
});
router.post('/deleteDelivery', async (req, res) => {
  try {
    const response = await delOrder(req, res);
    console.log("routes succes : " + res)
    return res.status(200);
  } catch (error) {
    console.log("routes eror : " + error)
    return res.status(400);
  }
});
router.get('/allOrders', async (req, res) => {
  try {
    const response = await allOrders(req, res);
    console.log("routes succes : " + res)
    return res.status(200);
  } catch (error) {
    console.log("routes eror : " + error)
    return res.status(400);
  }
});
router.post('/comDelivery', async (req, res) => {
  try {
    const response = await comDelivery(req, res);
    console.log("routes succes : " + res)
    return res.status(200);
  } catch (error) {
    console.log("routes eror : " + error)
    return res.status(400);
  }
});
router.post('/takeDelivery', async (req, res) => {
  try {
    const response = await takeDelivery(req, res);
    console.log("routes succes : " + res)
    return res.status(200);
  } catch (error) {
    console.log("routes eror : " + error)
    return res.status(400);
  }
});

export default router;