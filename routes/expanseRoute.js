import express from "express";
import { createExpanse, getExpanse, deleteExpanse, updateExpanse } from "../controllers/expanseController.js";
import isAuthenticatedUser from "../middleware/auth.js";

const route = express.Router();

route.get('/getAllExpanses', isAuthenticatedUser, getExpanse);
route.post('/createExpanse', isAuthenticatedUser, createExpanse);
route.delete('/deleteExpanse/:id', deleteExpanse);
route.put('/updateExpanse/:id', updateExpanse);

export default route;