import { db } from "../db.js";

export const newOrder = async (req, res) => {

  console.log("server received : " + JSON.stringify(req.body));

  const values = [
    req.body.customerName ?? null,
    req.body.customerAddress ?? null,
    req.body.AVAILABLE ?? null,
    req.body.customerNote ?? null,
    req.body.Carrier ?? null,
    req.body.CreatedTime ?? null
  ];

  //Sql Query  
  const q = `INSERT INTO orders (OrderName, OrderAddress, OrderAvailable, OrderNote, Carrier, CreatedTime) VALUES (?, ?, ?, ?, ?, ?)`;
  // Send req
  try {
    const [orderRes, _] = await db.promise().execute(q, [...values]);

    const { ...other } = orderRes;

    res.json(other);
  } catch (err) {
    console.log("controller eror : " + err)
    return res.status(500).json(err);
  }
};
export const delOrder = async (req, res) => {
  // Check req.body received
  console.log("server received : " + JSON.stringify(req.body));
  //Sql Query  
  const q = `DELETE FROM orders WHERE OrderId=?`;
  // Send req
  try {
    const [orderRes, _] = await db.promise().execute(q, [req.body.deliveryId]);

    const { ...other } = orderRes;

    res.json(other);
  } catch (err) {
    console.log("controller eror : " + err)
    return res.status(500).json(err);
  }
};
export const allOrders = async (req, res) => {
  // Check req.body received
  console.log("server received : " + JSON.stringify(req.body));
  //Sql Query  
  const q = `SELECT * FROM orders`;
  // Send req
  try {
    const [orderRes, _] = await db.promise().execute(q);

    const { ...other } = orderRes;

    res.json(other);
  } catch (err) {
    console.log("controller eror : " + err)
    return res.status(500).json(err);
  }
};
export const comDelivery = async (req, res) => {

  // Check req.body received
  console.log("server received : " + JSON.stringify(req.body));

  const values = [
    req.body.EndedTime ?? null,
    req.body.orderId ?? null
  ];

  //Sql Query  
  const q = `UPDATE orders SET OrderAvailable = 'הושלם', EndedTime = ?  WHERE OrderId = ?`;
  // Send req
  try {
    const [orderRes, _] = await db.promise().execute(q, [...values]);

    const { ...other } = orderRes;

    res.json(other);
  } catch (err) {
    console.log("controller eror : " + err)
    return res.status(500).json(err);
  }
};
export const takeDelivery = async (req, res) => {

  // Check req.body received
  console.log("server received : " + JSON.stringify(req.body));

  const values = [
    req.body.user ?? null,
    req.body.orderId ?? null,
  ];

  //Sql Query  
  const q = `UPDATE orders SET Carrier = ?, OrderAvailable = 'ממתין' WHERE OrderId = ?`;
  // Send req
  try {
    const [orderRes, _] = await db.promise().execute(q, [...values]);

    const { ...other } = orderRes;

    res.json(other);
  } catch (err) {
    console.log("controller eror : " + err)
    return res.status(500).json(err);
  }
};