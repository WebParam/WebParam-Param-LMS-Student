import { Diagnostic } from "../lib/util-logger";


const axios = require("axios").default;

const token = "";
console.log(token);
let header: any;

if (
  !process.env.NEXT_PUBLIC_CLIENTKEY ||
  process.env.NEXT_PUBLIC_CLIENTKEY.length < 0
) {
  throw "ClientKey not available";
}

  header = {

    // Authorization: `Bearer ${token}`
    Authorization:"Basic YWRtaW46cmpPdjJhU1omPXxuRDYpJQ==",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "X-Requested-With",
    "ngrok-skip-browser-warning":"any",
    "Client-Key": process.env.NEXT_PUBLIC_CLIENTKEY,

}

export async function GET(endPoint: string) {
  try {
    // const result = await axios.get(`${endPoint}`, {auth: {
    //   username: "admin",
    //   password: "rjOv2aSZ&=|nD6)%"
    // }} );
    const result =  fetch(endPoint, {
      method: 'get',
      headers: header,
      // body: JSON.stringify(opts)
    }).then(function(response) {
      return response.json();
    })

    return result;
  } catch (error:any) {
    console.log(
      `[API ERROR  : Method: GET; Endpoint: ${endPoint}]`,
      error.toJSON()
    );
    return error.response;
  }
}

export async function POST(endPoint: string, payload: Object) {
  try {
  
    const result = await axios.post(`${endPoint}`, payload, {
      headers: header,
    });
    Diagnostic("SUCCESS ON POST, returning", result);
    return result.data;
  } catch (error:any) {
    
    console.log(`[API ERROR : Method: POST; Endpoint: ${endPoint}]`, error);
    Diagnostic("ERROR ON POST, returning", error);
    return error.response;
  }
}
export function DELETE(endPoint: string): Promise<any> {
  let HEADER = {
    "Authorization": "Basic YWRtaW46cmpOdjJhU1omPXxuRDYpJQ==",
    "Access-Control-Allow-Origin": "*",
    "Client-Key": process.env.NEXT_PUBLIC_CLIENTKEY
  };

  // Return the axios promise directly
  return axios
    .delete(`${endPoint}`, { headers: HEADER })
    .then((result: any) => {
      // Assuming result.data is the actual data returned from the API
      return result.data;
    })
    .catch((error: any) => {
      // Returning an error object or throwing an error, based on your preference
      return error;
    });
}
export function PUT(endPoint: string, payload: Object): Promise<any> {
  let HEADER = {
    "Authorization": "Basic YWRtaW46cmpOdjJhU1omPXxuRDYpJQ==",
    "Access-Control-Allow-Origin": "*",
    "Client-Key": process.env.NEXT_PUBLIC_CLIENTKEY
  };

  // Return the axios promise directly
  return axios
    .put(`${endPoint}`, payload, { headers: HEADER })
    .then((result: any) => {
      // Assuming result.data is the actual data returned from the API
      return result.data;
    })
    .catch((error: any) => {
      // Returning an error object or throwing an error, based on your preference
      return error;
    });
}