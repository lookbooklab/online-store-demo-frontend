import { ImageInterface } from "./image";

export interface AdContentInterface {
  id: number;
  heading: string;
  text: string;
  cta_text: string;
  image: ImageInterface;
}
