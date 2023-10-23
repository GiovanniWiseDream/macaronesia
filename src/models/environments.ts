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
        ref: "Place",
        image: {
          type: String,
          required: true,
        },

      }],
      points: [{
          type: mongoose.Schema.Types.ObjectId,
          ref: "Point",
          rotationX: {
            type: Number,
            required: true,
          },
          rotationY: {
            type: Number,
            required: true,
          },
          position: {
            type: [Number],
            required: true,
          }
        }],
      },
    ],
  });

export default mongoose.model("Environment", environmentSchema);
