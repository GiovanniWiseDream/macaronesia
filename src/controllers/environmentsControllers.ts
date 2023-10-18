import Environments from "../models/environments";
const mongoose = require("mongoose");
import { Request, Response, RequestHandler } from "express";

export class environmentsController {

  static async CreateEnvironment(req, res) {
    const { name, image, map, environments } = req.body;
    try {
      // Verifica si ya existe un ambiente con el mismo nombre
      const existingEnvironment = await Environments.findOne({ name });
  
      if (existingEnvironment) {
        // Si ya existe, responde con un código de estado 400 (Bad Request)
        return res.status(400).json({ message: "Ya existe un entorno con ese nombre" });
      }
  
      // Crea una nueva instancia del modelo con los datos proporcionados
      const newEnvironment = new Environments({
        name,
        environments,
        map,
        image,
      });
  
      // Guarda el nuevo ambiente en la base de datos
      await newEnvironment.save();
  
      // Responde con el ambiente creado y un código de estado 201 (creado)
      res.status(201).json(newEnvironment);
    } catch (error) {
      // Maneja cualquier error y responde con un código de estado 500 (error interno del servidor)
      console.error(error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }


  static async GetEnvironment(req, res) {
    try {
      const environments = await Environments.find({}).select("name image map");
      res.status(200).json(environments);
    } catch (error) {
      console.error(error);
      res.status(501).json({ message: "Error interno del servidor" });
    }
  }
}
