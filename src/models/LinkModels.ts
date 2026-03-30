import mongoose, { Schema, Document, Types } from "mongoose";

export interface ILink extends Document {
  hash: string;
  userId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const LinkSchema = new Schema<ILink>(
  {
    hash: {
      type: String,
      required: true,
      unique: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const LinkModel = mongoose.model<ILink>("Link", LinkSchema);