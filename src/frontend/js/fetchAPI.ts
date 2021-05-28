// TODO: ある程度処理を纏めたい
import axios from "axios";
require("dotenv").config();

const customAxios = axios.create({
  baseURL: process.env.API_BASEURL ?? "http://localhost:3000",
  headers: { "X-Custom-Header": "foobar" },
});

const CancelToken = axios.CancelToken;
const source = CancelToken.source();

export const fetchFiles = async () => {
  return await customAxios
    .get("/files")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const fetchProgress = async () => {
  return await customAxios
    .get("/progress")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
};
