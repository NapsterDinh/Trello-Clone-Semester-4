const configuration = {
    ApiUrl: "http://localhost:3000",
    ApiRequestToken: "",
  };
  
  export const setApiRequestToken = (token) => {
    Object.assign(configuration, { ApiRequestToken: token });
  };
  
export default configuration;
  