import axios from "axios";
import { BASE_URL } from "@/static/const";
import { AdContentInterface } from "@/types/api/ads";

export default function useAdsService() {
  const getAdContent = async () => {
    const req = await axios.get(BASE_URL + "home-page-ad", {
      params: {
        populate: ["image"],
      },
    });
    return req.data.data as AdContentInterface;
  };

  return {
    getAdContent,
  };
}
