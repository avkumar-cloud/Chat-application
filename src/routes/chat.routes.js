import express from "express"
import { authMiddleware } from "../middlewares/auth.middleware.js"

import{accessChat, fetchChats, createGroupChat, renameGroup} from "./../controllers/chat.controller.js"

const router = express.Router();

router.post("/", authMiddleware, accessChat);
router.get("/", authMiddleware, fetchChats);
router.post("/group", authMiddleware, createGroupChat);
router.put("/rename", authMiddleware, renameGroup);

export default router
