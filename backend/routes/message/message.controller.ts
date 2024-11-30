import { Request, Response, Router } from "express";
import { MessageModel, PrivateChatModel } from "../models";
import { DocumentType } from "@typegoose/typegoose";
import { Message } from "./message.model";
import checkAuthMiddleware from "../../middlewares/checkAuth.middleware";

const messageController = Router();

const getMessages = async (req: Request, res: Response) => {
  const { chatId } = req.params;

  try {
    const chat = await PrivateChatModel.findById(chatId).exec();

    if (!chat) {
      return res.status(404).send({ message: "Chat not found" });
    }

    const messages = (await MessageModel.find({ chatId })
      .populate({
        path: "initiatedBy",
        select: ["profilePicture", "displayName"],
      })
      .exec()) as [DocumentType<Message>];

    return res.status(200).send(messages);
  } catch (error) {
    return res.status(500).send(error);
  }
};

messageController.get(
  process.env.GET_MESSAGES_ENDPOINT as string,
  checkAuthMiddleware,
  getMessages,
);

export default messageController;
