import axios, { AxiosResponse } from "axios";
import { DripParamsModel } from "../models/DripModel";

class DripService {
  static call = async (
    endpoint: string,
    method: string,
    params: DripParamsModel
  ) => {
    const baseURL = process.env.DRIP_BASE_URL || "https://api.getdrip.com/";

    let query = "";
    if (params.query) {
      query = "?";
      for (const key in params.query) {
        query += `${key}=${params.query[key]}&`;
      }
    }

    let config = {};
    if (params.headers) {
      config = {
        headers: params.headers,
      };
    }

    const dripURL = `${baseURL}${endpoint}${query}`;

    try {
      let response: AxiosResponse;
      let data: any;

      switch (method) {
        case "get": {
          response = await axios.get(dripURL, config);
          data = response.data || null;
          break;
        }
        case "post": {
          response = await axios.post(dripURL, params.body, config);
          data = response.data || null;
          break;
        }
        case "put": {
          response = await axios.put(dripURL, params.body, config);
          data = response.data || null;
          break;
        }
        case "patch": {
          response = await axios.patch(dripURL, params.body, config);
          data = response.data || null;
          break;
        }
        case "delete": {
          response = await axios.delete(dripURL, config);
          data = response.data || null;
          break;
        }
      }
    } catch (error) {
      console.log(`Drip API call error on endpoint: ${endpoint}`, error);
    }
  };
}

export default DripService;
