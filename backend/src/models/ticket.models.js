import mongoose from "mongoose";
import { userModel } from "./users.models.js";
import { cartModel } from "./carts.models.js";
cartModel;

const ticketSchema = new mongoose.Schema({
  code: {
    type: String,
    trim: true,
    unique: true,
  },
  purchase_datetime: {
    type: Date,
    default: Date.now,
  },
  amount: {
    type: Number,
    ref: "carts",
  },
  purchaser: {
    type: Schema.Types.email,
    ref: "users",
  },
});

ticketSchema.pre("save", async function (next) {
  try {
    const email = await userModel.findOne();
    this.purchaser = email._id;
  } catch (error) {
    next(error);
  }
});

export default mongoose.model("Ticket", ticketSchema);
