import { ImageInterface } from "./image";
import React from "react";

export interface BannerInterface {
  heading: React.ReactNode;
  text: React.ReactNode;
  cta: React.ReactNode;
  id: number;
  url: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  image?: ImageInterface;
  bgColor?: string;
  textColor?: string;
  backgroundOpacity?: string;
}
