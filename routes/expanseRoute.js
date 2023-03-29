import express from "express";
import { createExpanse, getExpanse, deleteExpanse } from "../controllers/expanseController.js";

const route = express.Router();

route.get('/getAllExpanses', getExpanse);
route.post('/createExpanse', createExpanse);
route.delete('/deleteExpanse/:id', deleteExpanse);

export default route;