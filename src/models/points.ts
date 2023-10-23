import mongoose from "mongoose";

const pointSchema = new mongoose.Schema({
    env: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Environment",
        image: {
          type: String,
          required: true,
        },
      }],
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
    places: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Place",
        image: {
            type: String,
            required: true,
          }
      },
      ],
  });
  
  export default mongoose.model("Point", pointSchema);