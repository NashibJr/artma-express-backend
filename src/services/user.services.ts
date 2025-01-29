import User, { UserTypes } from "../models/user.model";
import * as bcrypt from "bcrypt";

const UserServices = {
  createUser: async (
    userData: UserTypes,
    imagePath: string,
    frontNID: string,
    backNID: string
  ) => {
    try {
      const { email, phone, role, shopNumber } = userData;
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const exists = await User.findOne({ email, phone });
      if (exists) {
        return {
          error: "User with account exists",
        };
      }

      if (role === "supplier" && (shopNumber === "" || !shopNumber)) {
        return {
          error: "Shop number required for supplier",
        };
      } else if (
        role === "deliverer" &&
        ((frontNID === "" && backNID === "") || !frontNID || !backNID)
      ) {
        return {
          error:
            "Deliverer needs both the front and the back of their national IDs",
        };
      }

      const user = await User.create({
        ...userData,
        password: hashedPassword,
        profileImage:
          imagePath &&
          `http://localhost:9090/api/v1/users/download/${imagePath}`,
        backNID:
          backNID && `http://localhost:9090/api/v1/users/download/${backNID}`,
        frontNID:
          frontNID && `http://localhost:9090/api/v1/users/download/${frontNID}`,
      });
      const user_ = user.toJSON();
      const { password, ...rest } = user_;

      return {
        ...rest,
        message: "User account successfully created",
      };
    } catch (error) {
      return {
        error: (error as Error).message,
      };
    }
  },
};

export default UserServices;
