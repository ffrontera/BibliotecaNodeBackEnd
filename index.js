import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from "url";
import usersRouter from "./src/routes/users.router.js";
import { authRouter } from "./src/routes/auth.router.js";
import booksRouter from "./src/routes/books.router.js";


const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/books", booksRouter);

const IP = process.env.IP
const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`${IP}:${PORT}`));