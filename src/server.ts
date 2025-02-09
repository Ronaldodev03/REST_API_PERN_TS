import express from "express";
import colors from "colors";
import cors, { CorsOptions } from "cors";
import morgan from "morgan";
import router from "./router";
import db from "./config/db";

// Conectar a base de datos
async function connectDB() {
  try {
    await db.authenticate();
    db.sync();
    console.log(colors.bgBlue("Conexión exitosa a la BD"));
  } catch (error) {
    console.log(error);
    console.log(colors.bgRed.bold("Hubo un error al conectar a la BD"));
  }
}
connectDB();

// Instancia de express
const server = express();

server.use(morgan("dev"));

// Permitir conexiones
const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (origin === process.env.FRONTEND_URL) {
      callback(null, true);
    } else {
      callback(new Error("Error de CORS"));
    }
  },
};
server.use(cors(corsOptions));

// Leer datos de formularios
server.use(express.json());

server.use("/api/products", router);

export default server;
