import mongoose, { Schema, Document, Model } from "mongoose";

export interface IDeviceToken extends Document {
  deviceToken: string;
  createdAt: Date;
  updatedAt: Date;
}

const DeviceTokenSchema = new Schema<IDeviceToken>(
  {
    deviceToken: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const DeviceToken: Model<IDeviceToken> =
  mongoose.models.DeviceToken ||
  mongoose.model<IDeviceToken>("DeviceToken", DeviceTokenSchema);

export default DeviceToken;
