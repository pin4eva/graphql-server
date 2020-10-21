import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  email: String,
  password: String,
  token: String,
  phone: String,

  isActive: { type: Boolean, default: false },
  image: {
    type: String,
    default: "https://gravatar.com/avatar",
  },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
