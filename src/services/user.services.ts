import User, { UserTypes } from "../models/user.model";
import * as bcrypt from "bcrypt";
import { ChangePAsswordTypes, LoginType } from "../types/auth.types";
import JWT from "jsonwebtoken";

const UserServices = {
  createUser: async (
    userData: UserTypes,
    imagePath: string,
    frontNID: string,
    backNID: string
  ) => {
    try {
      const { phone, role, shopNumber } = userData;
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const exists = await User.findOne({ phone });
      if (exists) {
        return {
          error: "This account already exists",
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
  login: async (userData: LoginType) => {
    try {
      const { phone } = userData;
      const exists = await User.findOne({ phone });
      if (!exists) {
        return {
          error: "This account is not recognized",
        };
      }

      const isPasswordCorrect = await bcrypt.compare(
        userData.password,
        exists.password
      );
      if (!isPasswordCorrect) {
        return {
          error: "Incorrect password",
        };
      }

      const user = exists.toJSON();
      const { password, ...rest } = user;
      const token = JWT.sign({ id: exists._id }, process.env.JWT_SECRET!, {
        expiresIn: "2h",
      });

      return {
        ...rest,
        token,
      };
    } catch (error) {
      return {
        error: (error as Error).message,
      };
    }
  },
  deleteUser: async (userId: string) => {
    try {
      await User.findByIdAndDelete(userId);

      return {
        message: "User successfully deleted",
      };
    } catch (error) {
      return {
        error: (error as Error).message,
      };
    }
  },
  updateUser: async (userData: UserTypes, userId: string) => {
    try {
      await User.findByIdAndUpdate(userId, userData);

      return {
        message: "Info successfully updates",
      };
    } catch (error) {
      return {
        error: (error as Error).message,
      };
    }
  },
  changePassword: async (
    newPasswordData: ChangePAsswordTypes,
    userId: string
  ) => {
    try {
      const user = await User.findById(userId);
      const { newPassword, oldPassword } = newPasswordData;
      const isOldPasswordCorrect = await bcrypt.compare(
        oldPassword,
        user?.password!
      );
      if (!isOldPasswordCorrect) {
        return {
          error: "Enter a correct old password",
        };
      }

      if (newPassword === oldPassword) {
        return {
          error: "Enter a different password",
        };
      }

      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      await user?.updateOne({ password: hashedNewPassword });

      return {
        message: "Password successfully changed",
      };
    } catch (error) {
      return {
        error: (error as Error).message,
      };
    }
  },
};

export default UserServices;
