const express = require("express");
const dbConnect = require("./config/dbConnect");
const app = express();
const cors = require("cors")
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 4000;
const authRouter = require("./routes/authRoute");
const courseRouter = require("./routes/courseRoute");
const blogRouter = require("./routes/blogRoute");
const enqRouter = require("./routes/enqRoute");
const uploadRouter = require("./routes/uploadRoute");
const bodyParser = require("body-parser");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const cookieParser = require("cookie-parser");
const morgan = require("morgan")
dbConnect();

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/user", authRouter);

app.use("/api/course", courseRouter);
app.use("/api/blog", blogRouter);
app.use("/api/enquiry", enqRouter);

app.use("/api/upload", uploadRouter);

app.use(notFound);
app.use(errorHandler);





app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
