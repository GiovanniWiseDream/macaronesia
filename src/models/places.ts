import mongoose from "mongoose";

const placeSchema = new mongoose.Schema({
    image: {
      type: String,
      required: true,
    },
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
  });
  
  export default mongoose.model("Place", placeSchema);