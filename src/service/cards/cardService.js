import { get } from "../service-default/service-default";

class CardService {
  get = async (url, objQueryParams) => {
    try {
      let queryParams = objQueryParams ?? "";
      if (queryParams.length > 0) {
        queryParams = "?" + queryParams;
      }

      const apiData = await get(`${url}${queryParams}`);

      return apiData;
    } catch (error) {
      console.error("Não foi possível efetuar a requisição.", error);
    }
  };
}

export default CardService;
