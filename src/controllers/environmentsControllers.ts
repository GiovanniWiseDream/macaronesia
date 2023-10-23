import Environments from "../models/environments";
import places from "../models/places";
import points from "../models/points";
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

  
  static async DeleteEnvironment(req, res) {
    const { id } = req.body; // Suponiendo que el ID se pasa como parámetro en la URL
    try {
      // Busca el ambiente por su ID y elimínalo
      const deletedEnvironment = await Environments.findByIdAndDelete(id);
  
      if (!deletedEnvironment) {
        // Si no se encuentra un ambiente con ese ID, responde con un código de estado 404 (No encontrado)
        return res.status(404).json({ message: "Entorno no encontrado" });
      }
  
      // Responde con el ambiente eliminado y un código de estado 200 (OK)
      res.status(200).json("El entorno se ha eliminado correctamente");
    } catch (error) {
      // Maneja cualquier error y responde con un código de estado 500 (error interno del servidor)
      console.error(error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }

  static async UpdateEnvironment(req: Request, res: Response): Promise<void> {
    const {
      _id,
      newName,
      newImage,
      newMap,
    } = req.body;

    try {
      const environment = await Environments.findById(_id);
      if (!environment) {
        res.status(404).json({ error: "Entorno no encontrado" });
        return;
      }

      // Realizar las actualizaciones en el entorno
      if (newName) {
        environment.name = newName;
      }
      if (newImage) {
        environment.image = newImage;
      }
      if (newMap) {
        environment.map = newMap;
      }

      await environment.save(); // Guardar los cambios en el entorno

      res.status(200).json({ message: "Entorno actualizado correctamente" });
    } catch (error) {
      console.error("Error al actualizar el entorno:", error);
    }
  }
  
}
