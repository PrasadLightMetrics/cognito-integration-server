import express from "express";
import cors from "cors";
import { verifyAuthentication } from "./controller/authenticaion";

const app = express();
app.use(express.json());

app.use(cors());
app.options("*", cors());
app.set("port", 5000);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Accept-Language, Content-Language, Authorization, Cookie, Host"
  );
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

app.listen(5000, () => console.log(`Server running 5000`));

app.post('/authenticate', verifyAuthentication);
