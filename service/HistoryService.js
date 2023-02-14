import axios from "axios";

export const getAllHistories = async () => {
    const response = await axios.get("https://lucky-gift.vercel.app/api/history/");
    return response.data.histories
}
