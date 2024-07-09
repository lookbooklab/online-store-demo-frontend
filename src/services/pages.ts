import axios from "axios";
import { BASE_URL } from "@/static/const";
import { PagesInterface } from "@/types/api/pages";

export default function usePagesService() {
  /**
   * Retrieves a list of brands from the server.
   *
   * @return {PagtesInterface} An pages objects.
   */
  const getPageInfo = async (pageName: string) => {
    const req = await axios.get(BASE_URL + pageName + "-section", {
      params: {
        populate: ["sections"],
      },
    });

    return req.data.data as PagesInterface;
  };

  return {
    getPageInfo,
  };
}
