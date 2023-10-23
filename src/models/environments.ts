import * as mongoose from "mongoose";


const environmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: { type: String },
  map: { type: String },
  environments: [
    {
      name: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      places: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Place" // Referencia al modelo de Point
      }],
      points: [{
          type: mongoose.Schema.Types.ObjectId,
          ref: "Point" // Referencia al modelo de Point
        }],
      },
    ],
  });

export default mongoose.model("Environment", environmentSchema);
