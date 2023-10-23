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
      points: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Point" // Referencia al modelo de Point
      }],
      places: [{
        image: {
          type: String,
          required: true,
        },
        points: [{
          type: mongoose.Schema.Types.ObjectId,
          ref: "Point" // Referencia al modelo de Point
        }],
      },
    ],
 } ],
});

export default mongoose.model("Environment", environmentSchema);
