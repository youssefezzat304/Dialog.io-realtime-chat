import { DocumentType } from "@typegoose/typegoose";
import { PrivateChat } from "../privateChat/privateChat.model";
import { UserModel } from "../models";
import { User } from "./user.model";
import { UserSchemaInput } from "./user.schema";
import { Types } from "mongoose";
import { chooseRandomAvatar } from "../../utils/logic";

class UserService {
  private user = UserModel;

  public async signUp(input: Partial<User>) {
    try {
      input.profilePicture = chooseRandomAvatar();
      const user = (await UserModel.create(input)) as DocumentType<User>;
      return user;
    } catch (error) {
      return new Error("Failed to create user.");
    }
  }
  public async login(email: string) {
    try {
      const user = (await this.user.findOne({ email })) as DocumentType<User>;
      if (user === null) {
        return new Error("user === null");
      }
      return user;
    } catch (error) {
      return new Error("error:");
    }
  }
  public async createUser(input: Partial<User>) {
    return (await UserModel.create(input)) as DocumentType<User> | null;
  }
  public async findUserById(id: string) {
    return (await UserModel.findById(id)) as DocumentType<User> | null;
  }
  public async findUserByEmail(email: string) {
    return (await UserModel.findOne({ email })) as DocumentType<User> | null;
  }
  public async updateUserByEmail(email: string, data: UserSchemaInput) {
    return await UserModel.updateOne(
      { email: email },
      {
        $set: data,
      },
    );
  }
  public async addChatId({
    userId,
    chat,
  }: {
    userId: string | Types.ObjectId;
    chat: PrivateChat;
  }) {
    await UserModel.findByIdAndUpdate(
      userId,
      {
        $addToSet: { chats: chat._id },
      },
      { new: true },
    );
  }
}

export default UserService;
