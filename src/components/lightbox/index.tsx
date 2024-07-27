import * as React from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { ImageInterface } from "@/types/api/image";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

interface LightboxImage {
  src: string;
  width: number;
  height: number;
}

interface LightboxGalleryProps {
  images: Array<ImageInterface>;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function LightboxGallery({
  images,
  open,
  setOpen,
}: LightboxGalleryProps) {
  const imageList: Array<LightboxImage> = [];

  images.map((image: ImageInterface) => {
    const imageObj = {
      src: image.url,
      width: image.width,
      height: image.height,
    };

    imageList.push(imageObj);
  });

  return (
    <>
      <Lightbox
        plugins={[Zoom]}
        open={open}
        close={() => setOpen(false)}
        slides={imageList}
      />
    </>
  );
}
