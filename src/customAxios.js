import axios from "axios";

const customAxios = axios.create({
  method: "post",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Api-Key": "demoKeyOfApi",
  },
});

export default customAxios;
