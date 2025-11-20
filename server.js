require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();


app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/authRoutes");
const entryRoutes = require("./routes/entryRoutes");
const bookRoutes = require("./routes/bookRoutes");
const borrowRoutes = require("./routes/borrowRoutes");


app.use("/auth", authRoutes);
app.use("/entry", entryRoutes);
app.use("/books", bookRoutes);
app.use("/borrow", borrowRoutes);

app.get("/", (req, res) => {
  res.send("Library Management Backend Running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
