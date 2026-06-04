import { APIRequestContext } from '@playwright/test';

export class ApiUtils {
    readonly apiContext: APIRequestContext;

    constructor(apiContext: APIRequestContext) {
        this.apiContext = apiContext;
    }

    /**
     * Re-usable GET Request 
     * @param endpoint Target API Path 
     */

    async get(endpoint: string): Promise<any> {
        const response = await this.apiContext.get(endpoint);
        const responseText = await response.text();
        return JSON.parse(responseText)
    }

    /**
     * Re-usable POST Request 
     * @param endpoint Target API Path 
     * @param payload Key-Value pairs to send in the request body
     */

    async postCall(endpoint: string, payload: Record<string, unknown>): Promise<any> {
        const response = await this.apiContext.post(endpoint, {
            data: payload
        });
        const responseText = await response.text();
        return JSON.parse(responseText);
    }

    /**
     * Re-usable PUT Request 
     * @param endpoint Target API Path 
     * 
     */

    async put(endpoint: string , payload : Record<string , unknown>) : Promise<any> {
        const response = await this.apiContext.put(endpoint, {
            data : payload
        })
        const responseText = await response.text();
        return JSON.parse(responseText);
    }

    /**
     * Re-usable POST Request (Form Urlencoded Payload)
     * Required for endpoints that expect form parameters (e.g. /api/searchProduct)
     */
    async postForm(endpoint: string, formPayload: Record<string, string>): Promise<any> {
        const response = await this.apiContext.post(endpoint, {
            form: formPayload
        });
        const responseText = await response.text();
        return JSON.parse(responseText);
    }
}

