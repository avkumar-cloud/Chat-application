import express from "express";
import cors from "cors";
import chatRoutes from "./routes/chat.routes.js"
import messageRoutes from "./routes/message.routes.js"
import authRoutes from "./routes/auth.routes.js"
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/chats", chatRoutes)
app.use("/api/messages", messageRoutes)
app.use("/api/auth/", authRoutes)

export default app

