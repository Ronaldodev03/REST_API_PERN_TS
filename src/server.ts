import express from "express";
import colors from "colors";
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

export default server;
