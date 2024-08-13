import * as React from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { ImageInterface } from "@/types/api/image";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Video from "yet-another-react-lightbox/plugins/video";

interface SourcesProps {
  src: string;
  type: string;
}

interface LightboxImage {
  src?: string;
  width: number;
  height: number;
  type?: string;
  poster?: string;
  sources?: SourcesProps[];
}

interface LightboxGalleryProps {
  images: Array<ImageInterface>;
  open: boolean;
  setOpen: (open: boolean) => void;
  selecteedImageIndex: number;
}

export default function LightboxGallery({
  images,
  open,
  setOpen,
  selecteedImageIndex,
}: LightboxGalleryProps) {
  const imageList: Array<LightboxImage> = [];

  images.map((image: ImageInterface) => {
    if (image.mime.includes("video")) {
      const imageObj = {
        type: "video",
        width: image.width,
        height: image.height,
        autoPlay: true,
        sources: [
          {
            src: image.url,
            type: "video/mp4",
          },
        ],
      };

      imageList.push(imageObj);
    }

    if (!image.mime.includes("video/mp4")) {
      const imageObj = {
        src: image.url,
        width: image.width,
        height: image.height,
      };

      imageList.push(imageObj);
    }
  });

  return (
    <>
      <Lightbox
        index={selecteedImageIndex}
        plugins={[Zoom, Video]}
        open={open}
        close={() => setOpen(false)}
        //eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        slides={imageList}
      />
    </>
  );
}
