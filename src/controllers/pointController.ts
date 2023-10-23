import environments from "../models/environments";
import places from "../models/places";
import points from "../models/points";
const mongoose = require("mongoose");
import { Request, Response, RequestHandler } from "express";

export class pointsController {
    static async findById (req, res) {
        try {
            const id = req.body.id; // Suponiendo que el ID se pasa como parámetro en la solicitud
        
            const point = await points.findOne({ "env": id }).populate('env').populate('places');
        
            if (!point) {
              return res.status(404).json({ error: 'Punto no encontrado' });
            }
        
            return res.status(200).json(point);
          } catch (error) {
            return res.status(500).json({ error: 'Error en el servidor' });
          }
        };

        static async findAll(req, res) {
            try {
        
                if (!points || points.length === 0) {
                    return res.status(404).json({ error: 'No se encontraron puntos' });
                }
        
                return res.status(200).json(points);
            } catch (error) {
                return res.status(500).json({ error: 'Error en el servidor' });
            }
        };

        static async addPoints(req, res) {
            try {
                const { env, places } = req.body; 
        
                // Crea un nuevo punto con los datos proporcionados
                const newPoint = new points({
                    env,
                    places,
                });
        
                // Guarda el nuevo punto en la base de datos
                await newPoint.save();
        
                return res.status(201).json(newPoint); // Devuelve el punto recién creado
            } catch (error) {
                return res.status(500).json({ error: 'Error en el servidor' });
            }
        };

        static async deleteById(req, res) {
            try {
                const id = req.body 
        
                // Busca el punto por su ID y elimínalo
                const deletedPoint = await points.findByIdAndRemove(id);
        
                if (!deletedPoint) {
                    return res.status(404).json({ error: 'Punto no encontrado' });
                }
        
                return res.status(204).send("Punto eliminado con éxito"); 
            } catch (error) {
                return res.status(500).json({ error: 'Error en el servidor' });
            }
        };

        static async updateById(req, res) {
            try {
                const id = req.body; 
                const updatedData = req.body; // Los datos actualizados se envían en el cuerpo de la solicitud
        
                // Busca el punto por su ID y actualiza los datos
                const updatedPoint = await points.findByIdAndUpdate(id, updatedData, { new: true });
        
                if (!updatedPoint) {
                    return res.status(404).json({ error: 'Punto no encontrado' });
                }
        
                return res.status(200).json(updatedPoint); // Devuelve el punto actualizado
            } catch (error) {
                return res.status(500).json({ error: 'Error en el servidor' });
            }
        }
        
        
        
        
    }

