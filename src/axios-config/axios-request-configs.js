import axios from "axios";

const baseURL = "https://api.pokemontcg.io/v2";
const objAxiosRegent = axios.create({ baseURL });

export default objAxiosRegent;
