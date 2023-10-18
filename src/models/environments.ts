import * as mongoose from "mongoose";
import { model } from "mongoose";

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
      points: [
        {
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
          },
          place: {
            type: [Number],
            required: true,
          },
        },
      ],
      places: [
        {
          image: {
            type: String,
            required: true,
          },
          points: {
            type: [Number],
            required: true,
          },
        },
      ],
    },
  ],
});
export default model("users", environmentSchema);
