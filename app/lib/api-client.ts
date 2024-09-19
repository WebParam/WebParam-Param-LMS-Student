
import axios from 'axios';
import { LOG_DIAGNOSTIC, LOG_ERROR } from './logger';
import Cookies from 'universal-cookie';


const clientKey = process.env.NEXT_PUBLIC_CLIENTKEY;
const clientName = process.env.NEXT_PUBLIC_SITENAME;
const cookies = new Cookies();
const email = btoa(`${cookies.get('userEmail')}-${clientName}`);

export async function POST_MULTIPART(url: string, formData: any): Promise<any> {
    const trackingId = `${email}-${url}`;
    try {
        const response = await axios.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Client-Key': clientKey,
            },
        });

        var _diag = {
            code: response?.status,
            status:response?.statusText,
            request: JSON.stringify(response?.request),
            response: JSON.stringify(response?.data)
        }

        LOG_DIAGNOSTIC(`GET-${trackingId} [SUCCESS:${response.status}] `, _diag);

    } catch (error) {

        LOG_ERROR(`POST_MULTIPART-${trackingId} [ERROR] `, error);
        return null;

    } finally {
        LOG_DIAGNOSTIC(`POST_MULTIPART-${trackingId} [COMPLETE] `, null);
    }
}

export async function POST(payload: any, url: string): Promise<any> {
    const trackingId = `${email}-${url}`;
    try {
        const response = await axios.post(url, payload, {
            headers: {
                'Content-Type': 'application/json',
                'Client-Key': clientKey,
            },
        });

        var _diag = {
            code: response?.status,
            status:response?.statusText,
            request: JSON.stringify(response?.request),
            response: JSON.stringify(response?.data)
        }

        LOG_DIAGNOSTIC(`GET-${trackingId} [SUCCESS:${response.status}] `, _diag);

        return response;

    } catch (error) {

        LOG_ERROR(`GET-${trackingId} [ERROR] `, error);
        return null;

    } finally {
        LOG_DIAGNOSTIC(`GET-${trackingId} [COMPLETE] `, null);
    }

}




export async function PUT(payload: any, url: string): Promise<any> {
    const trackingId = `${email}-${url}`;
    try {
        debugger;
        const response = await axios.put(url, payload, {
            headers: {
                'Content-Type': 'application/json',
                'Client-Key': clientKey,
            },
        });

        var _diag = {
            code: response?.status,
            status:response?.statusText,
            request: JSON.stringify(response?.request),
            response: JSON.stringify(response?.data)
        }

        LOG_DIAGNOSTIC(`PUT-${trackingId} [SUCCESS:${response.status}] `, _diag);

        return response;

    } catch (error) {

        LOG_ERROR(`PUT-${trackingId} [ERROR] `, error);
        return null;

    } finally {
        LOG_DIAGNOSTIC(`PUT-${trackingId} [COMPLETE] `, null);
    }

}

export async function PUT_MULTIPART(payload: any, url: string): Promise<any> {
    const trackingId = `${email}-${url}`;
    try {
        debugger;
        const response = await axios.put(url, payload, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Client-Key': clientKey,
            },
        });

        var _diag = {
            code: response?.status,
            status:response?.statusText,
            request: JSON.stringify(response?.request),
            response: JSON.stringify(response?.data)
        }

        LOG_DIAGNOSTIC(`PUT-${trackingId} [SUCCESS:${response.status}] `, _diag);

        return response;

    } catch (error) {

        LOG_ERROR(`PUT-${trackingId} [ERROR] `, error);
        return null;

    } finally {
        LOG_DIAGNOSTIC(`PUT-${trackingId} [COMPLETE] `, null);
    }

}


export async function GET(url: string): Promise<any> {
    const trackingId = `${email}-${url}`;
    try {
        const response = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'Client-Key': clientKey,
            },
        });
        
        var _diag = {
            code: response?.status,
            status:response?.statusText,
            request: JSON.stringify(response?.request),
            response: JSON.stringify(response?.data)
        }

        LOG_DIAGNOSTIC(`GET-${trackingId} [SUCCESS:${response.status}] `, _diag);

        return response;

    } catch (error) {

        LOG_ERROR(`GET-${trackingId} [ERROR] `, error);
        return null;

    } finally {
        LOG_DIAGNOSTIC(`GET-${trackingId} [COMPLETE] `, null);
    }

}



export async function DELETE(payload: any, url: string): Promise<any> {
    const trackingId = `${email}-${url}`;
    try {
        const response = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'Client-Key': clientKey,
            },
        });

        var _diag = {
            code: response?.status,
            status:response?.statusText,
            request: JSON.stringify(response?.request),
            response: JSON.stringify(response?.data)
        }

        LOG_DIAGNOSTIC(`GET-${trackingId} [SUCCESS:${response.status}] `, _diag);

        return response;

    } catch (error) {

        LOG_ERROR(`GET-${trackingId} [ERROR] `, error);
        return null;

    } finally {
        LOG_DIAGNOSTIC(`GET-${trackingId} [COMPLETE] `, null);
    }

}


export async function GET_DOCUMENT(url: string): Promise<any> {
    const trackingId = `${email}-${url}`;
    try {
        const response = await axios.get(url, {
            headers: {
                'Content-Type': 'application/pdf',
                'Client-Key': clientKey,
            },
            responseType: 'blob',  // Expect the response to be a blob (binary data)
        });

        const _diag = {
            code: response?.status,
            status: response?.statusText,
            request: JSON.stringify(response?.request),
            // Note: Don't stringify the blob data as it's binary data.
            response: response?.data, 
        };

        LOG_DIAGNOSTIC(`GET-${trackingId} [SUCCESS:${response.status}] `, _diag);

        return response;

    } catch (error) {
        LOG_ERROR(`GET-${trackingId} [ERROR] `, error);
        return null;

    } finally {
        LOG_DIAGNOSTIC(`GET-${trackingId} [COMPLETE] `, null);
    }
}