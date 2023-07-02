import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, "email already exists"],
    required: [true, "email is required"]
  },
  password: {
    type: String,
    required: [true, "password is required"]
  },
  role: {
    type: String,
    default: "user"
  },
})

const User = models.User || model("User", UserSchema);

export default User;