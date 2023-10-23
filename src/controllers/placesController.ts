import Environments from "../models/environments";
import Places from "../models/places";
import Points from "../models/points";
const mongoose = require("mongoose");
import { Request, Response, RequestHandler } from "express";

export class placesController {
    static async GetPlaces(req, res) {
        try {
            const places = await Places.find({}).select("image");
            res.status(200).json(places);
        } catch (error) {
            console.error(error);
            res.status(501).json({ message: "Error interno del servidor" });
        }
    }

    static async CreatePlace(req, res) {
        const { image, env, points } = req.body;

        try {
            // Verifica si ya existe un lugar con la misma imagen
            const existingPlace = await Places.findOne({ image });

            if (existingPlace) {
                return res.status(400).json({ message: "Ya existe un lugar con esa imagen" });
            }

            // Crea una nueva instancia del modelo con los datos proporcionados
            const newPlace = new Places({
                image,
                env,
                points,
            });

            // Guarda el nuevo lugar en la base de datos
            await newPlace.save();

            // Responde con el lugar creado y un código de estado 201 (creado)
            res.status(201).json(newPlace);
        } catch (error) {
            // Maneja cualquier error y responde con un código de estado 500 (error interno del servidor)
            console.error(error);
            res.status(500).json({ message: "Error interno del servidor" });
        }
    }


    static async DeletePlace(req, res) {
        const { id } = req.body; // Suponiendo que el ID se pasa por el body 
        try {
            // Busca el lugar por su ID y elimínalo
            const deletedPlace = await Places.findByIdAndDelete(id);

            if (!deletedPlace) {
                // Si no se encuentra un lugar con ese ID, responde con un código de estado 404 (No encontrado)
                return res.status(404).json({ message: "Lugar no encontrado" });
            }

            // Responde con el ambiente eliminado y un código de estado 200 (OK)
            res.status(200).json("El lugar se ha eliminado correctamente");
        } catch (error) {
            // Maneja cualquier error y responde con un código de estado 500 (error interno del servidor)
            console.error(error);
            res.status(500).json({ message: "Error interno del servidor" });
        }
    }

    static async UpdatePlace(req: Request, res: Response): Promise<void> {
        const { _id, newImage, newEnv, newPoints } = req.body;

        try {
            const place = await Places.findById(_id);
            if (!place) {
                res.status(404).json({ error: "Entorno no encontrado" });
                return;
            }

            // Realizar las actualizaciones en el entorno
            if (newImage) {
                place.image = newImage;
            }
            if (newEnv) {
                place.env = newEnv;
            }
            if (newPoints) {
                place.points = newPoints;
            }

            await place.save(); // Guardar los cambios en el entorno

            res.status(200).json({ message: "Lugar actualizado correctamente" });
        } catch (error) {
            console.error("Error al actualizar el lugar:", error);
        }
    }
}