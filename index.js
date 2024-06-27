require('dotenv').config();

const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use("/auth", require('./src/routes/auth.router'));
app.use("/users", require('./src/routes/users.router'));
app.use("/books", require('./src/routes/books.router'));

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));