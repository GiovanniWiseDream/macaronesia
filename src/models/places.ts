import mongoose from "mongoose";

const placeSchema = new mongoose.Schema({
    image: {
      type: String,
      required: true,
    },
    points: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Point"
    }],
  });
  
  export default mongoose.model("Place", placeSchema);