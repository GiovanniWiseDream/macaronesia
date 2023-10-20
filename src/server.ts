import * as express from "express";
import * as mongoose from "mongoose";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as dotenv from "dotenv";
import environmentsRouter from "./routers/environmentsRouter";

dotenv.config();

export class Server {
  public app: express.Application = express();

  constructor() {
    this.setConfigs();
    this.setRoutes();
    this.error404Handler();
    this.handleErrors();
  }

  setConfigs() {
    this.connectMongoDB();
    this.configureCors();
    //this.allowCors();
    this.configureBodyParser();
    // this.configureFileUpload();
  }

  configureCors() {
    const corsOptions = {
      origin:
        process.env.NODE_ENV === "PROD"
          ? process.env.URL_PROD
          : /^http:\/\/localhost:\d+$/, // Permitir solicitudes solo desde localhost:8100
    };
    this.app.use(cors(corsOptions));
  }

  connectMongoDB() {
    // if (process.env.NODE_ENV === "PROD") {
    //   mongoose
    //     .connect(
    //       "mongodb+srv://giovanni:piWMm7JQhrB0Mvqc@cluster0.btorcdv.mongodb.net/"
    //     )
    //     .then(() => {
    //       console.log("Connected to mongodb.");
    //     });
    // } else if (process.env.NODE_ENV === "DEV") {
    mongoose
      .connect(
        "mongodb+srv://giovanni:piWMm7JQhrB0Mvqc@cluster0.btorcdv.mongodb.net/"
      )
      .then(() => {
        console.log("Connected to mongodb.");
      });
    // }
  }

  configureBodyParser() {
    this.app.use(
      bodyParser.urlencoded({
        extended: true,
      })
    );
    this.app.use(bodyParser.json());
  }

  setRoutes() {
    this.app.use("/api/environments", environmentsRouter);
  }
  error404Handler() {
    this.app.use((req, res) => {
      res.status(404).json({
        message: "Not found",
        status_code: 404,
      });
    });
  }

  handleErrors() {
    this.app.use((error, req, res, next) => {
      const errorStatus = req.errorStatus || 500;
      res.status(errorStatus).json({
        message: error.message || "Something went wrong. Please try again!",
        status_code: errorStatus,
      });
    });
  }
}
