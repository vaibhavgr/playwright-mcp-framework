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
     * Re-usable POST Request (Form/URL-Encoded)
     * @param endpoint Target API Path 
     * @param formParameters Key-Value pairs to send as form fields
     */
    async postForm(endpoint: string, formParameters: Record<string, string | number | boolean>): Promise<any> {
        const response = await this.apiContext.post(endpoint, {
            form: formParameters
        });
        const responseText = await response.text();
        return JSON.parse(responseText);
    }

    /**
     * Re-usable PUT Request (JSON payload)
     * @param endpoint Target API Path 
     * @param payload Key-Value pairs to send in the request body
     */
    async putCall(endpoint: string, payload: Record<string, unknown>): Promise<any> {
        const response = await this.apiContext.put(endpoint, {
            data: payload
        });
        const responseText = await response.text();
        return JSON.parse(responseText);
    }

    /**
     * Re-usable PUT Request (Form/URL-Encoded)
     * @param endpoint Target API Path 
     * @param formParameters Key-Value pairs to send as form fields
     */
    async putForm(endpoint: string, formParameters: Record<string, string | number | boolean>): Promise<any> {
        const response = await this.apiContext.put(endpoint, {
            form: formParameters
        });
        const responseText = await response.text();
        return JSON.parse(responseText);
    }

    /**
     * Re-usable DELETE Request (JSON payload)
     * @param endpoint Target API Path 
     * @param payload Key-Value pairs to send in the request body
     */
    async deleteCall(endpoint: string, payload?: Record<string, unknown>): Promise<any> {
        const response = await this.apiContext.delete(endpoint, {
            data: payload
        });
        const responseText = await response.text();
        return JSON.parse(responseText);
    }

    /**
     * Re-usable DELETE Request (Form/URL-Encoded)
     * @param endpoint Target API Path 
     * @param formParameters Key-Value pairs to send as form fields
     */
    async deleteForm(endpoint: string, formParameters?: Record<string, string | number | boolean>): Promise<any> {
        const response = await this.apiContext.delete(endpoint, {
            form: formParameters
        });
        const responseText = await response.text();
        return JSON.parse(responseText);
    }
}