import { UserDocument } from "../../models/User";

declare global {
  namespace Express {
    interface User extends UserDocument {}
  }
}
