import mongoose from "mongoose";
import { userSchema } from "../schema";
import { UserDTO } from "../../../domain/dtos";

export const UserModel = mongoose.model<UserDTO>('User', userSchema);