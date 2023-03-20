import axios from "axios";

const httpApiClient = axios.create({
  baseURL: import.meta.env.VITE_OMDB_LAYER_API || import.meta.env.VITE_OMDB_API,
});

// add the apikey as query
httpApiClient?.interceptors.request.use(function (config) {
  config.params = config.params || {};
  config.params.apikey = import.meta.env.VITE_OMDB_API_KEY;
  return config;
});

export default httpApiClient;
