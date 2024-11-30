import { Request, Response, Router } from "express";
import { UserModel } from "../models";
import checkAuthMiddleware from "../../middlewares/checkAuth.middleware";
import upload from "../../middlewares/upload.middleware";
import path from "path";
import fs from "fs";
import { processImage } from "../attachment/attachment.service";

const uploadController = Router();

const profilePictureUpload = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded." });
    }

    const compressedImage = await processImage(req.file.buffer);

    const userId = req.body.requesterId;
    const userDir = path.join(
      __dirname,
      "../../../Database",
      userId,
      "profile_picture",
    );

    fs.mkdirSync(userDir, { recursive: true });

    const filePath = path.join(
      userDir,
      `${userId}-${Date.now()}-${req.file.originalname}`,
    );
    fs.writeFileSync(filePath, compressedImage);

    // TODO: fix url issues
    const profilePictureUrl = `/Database/${userId}/profile_picture/${path.basename(
      filePath,
    )}`;
    await UserModel.findByIdAndUpdate(userId, {
      profilePicture: profilePictureUrl,
    });

    return res.status(200).json({
      message: "File uploaded and processed successfully!",
      filePath: filePath,
      profilePictureUrl,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error processing file", error });
  }
};

const profilePictureDelete = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      {
        $set: {
          profilePic: "",
        },
      },
      { new: true, select: "profilePicture" },
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    return res.status(200).json({
      message: "Profile picture has been removed successfully.",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error removing profile picture:", error);
    res.status(500).json({ message: "Failed to remove profile picture." });
  }
};

uploadController.post(
  "/upload/profile-picture",
  checkAuthMiddleware,
  upload.single("profilePicture"),
  profilePictureUpload,
);
uploadController.patch(
  "/upload/delete-profile-picture",
  checkAuthMiddleware,
  profilePictureDelete,
);

export default uploadController;
