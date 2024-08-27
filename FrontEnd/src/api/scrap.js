import axios from "axios";

export const fetchUsers = async () => {
  axios.create({
    baseURL: "https://www.googleapis.com/",
  });
};


export const scrapPredict = () => {
  axios.create({
    baseURL: "https://www.googleapis.com/youtube/",
  });
};


