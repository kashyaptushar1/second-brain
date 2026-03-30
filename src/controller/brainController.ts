import type{ Request, Response } from "express";
import { randomBytes } from "crypto";
import { LinkModel } from "../models/LinkModels.js";
import ContentModel from "../models/ContentModels.js";

export const createLink = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId; // from midd.jsleware
    const { share } = req.body;

    if (!share) {
      // remove existing link
      await LinkModel.deleteOne({ userId });

      return res.json({
        message: "Share link removed",
      });
    }

    // check if link already exists
    const existingLink = await LinkModel.findOne({ userId });

    if (existingLink) {
      return res.json({
        link: `/api/v1/brain/${existingLink.hash}`,
      });
    }

    // generate secure hash
    const hash = randomBytes(5).toString("hex");

    // store in DB
    await LinkModel.create({
      userId,
      hash,
    });

    return res.json({
      link: `/api/v1/brain/${hash}`,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Error creating link",
    });
  }
};

export const getLink = async (req: Request, res: Response) => {
  try {
    const hash = req.params.sharelink as string;

    const link = await LinkModel.findOne({ hash });

    if (!link) {
      return res.status(404).json({
        message: "Link not found",
      });
    }

    const content = await ContentModel.find({
      userId: link.userId,
    });

    return res.json({ content });

  } catch (error) {
    return res.status(500).json({
      message: "Error fetching shared content",
    });
  }
};