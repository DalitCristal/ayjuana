import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import { messageModel } from "../src/models/messages.models.js";
import path from "path";
import { _dirname } from "./path.js";
import router from "./router/index.routes.js";
import cookieParser from "cookie-parser";
import passport from "passport";
import initializePassport from "./config/passport.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import methodOverride from "method-override";
import flash from "connect-flash";
import { addLogger } from "./config/logger.js";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";

const swaggerOptions = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Documentación de la tienda Ay Juana",
      description: "API AyJuana",
    },
  },
  apis: [`${_dirname}/docs/**/*.yaml`],
};

const specs = swaggerJsdoc(swaggerOptions);

const whiteList = ["http://localhost:5173"];

const corsOptions = {
  origin: function (origin, callback) {
    if (whiteList.indexOf(origin) != -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Acceso denegado"));
    }
  },
  credentials: true,
};

//INICIALIZACION
const app = express();
const PORT = 8080;

//BDD
mongoose
  .connect(process.env.MONGO_URL)
  .then(async () => {
    console.log("BDD is connected");
  })
  .catch(() => console.log("Error en conexion a BDD"));

//SETTINGS
const server = app.listen(PORT, () => {
  console.log(`Servidor conectado en Puerto ${PORT}`);
});
app.set("views", path.resolve(_dirname, "./views"));
app.engine("handlebars", engine());
app.set("view engine", "handlebars");

//MIDLEWEARE
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser(process.env.SIGNED_COOKIE));
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
      mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopoLogy: true,
      },
      ttl: 60,
    }),

    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(methodOverride("_method"));
app.use(addLogger);
app.use("/apidocs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

/* Passport */
initializePassport();
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

/* VARIABLES GLOBALES */
app.use((req, res, next) => {
  res.locals.seccess_alert = req.flash("seccess_alert");
  res.locals.error_alert = req.flash("error_alert");
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null;
  next();
});

//STATIC FILES
app.use("/static", express.static(path.join(_dirname, "/public")));

//SOCKET IO
const io = new Server(server);
io.on("connection", (socket) => {
  console.log("servidor socket io conectado");
  socket.on("mensaje", async (infoMessage) => {
    try {
      let usuario = infoMessage.user;
      let mensaje = infoMessage.newMessage;
      let allMessages = await messageModel.find();
      const modelMessage = await messageModel.create({
        email: usuario,
        message: mensaje,
      });

      allMessages.push(modelMessage);
      socket.emit("todosLosMensajes", allMessages);
    } catch (e) {
      req.logger.error(e);
    }
  });
});

//RUTAS
app.use("/", router);
app.use((req, res) => {
  res.status(404).json({ status: false, errors: "Ruta no encontrada" });
});
