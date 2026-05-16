import mongoose, { Schema } from "mongoose";
// import { Document } from "mongoose";
import type { TokenBlackList } from "../types/type.js";

const blacklistingTokenScheme = new Schema<TokenBlackList>(
  {
    token: String,
  },
  {
    timestamps: true,
  },
);

const blacklistingToken = mongoose.model("blacklistingToken",blacklistingTokenScheme);
export default blacklistingToken;