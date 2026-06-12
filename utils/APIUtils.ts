import { APIRequestContext } from '@playwright/test';
import { Logger } from '@utils/Logger';


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
        Logger.info(`Sending Get Request to : ${endpoint}`)
        const response = await this.apiContext.get(endpoint);
        const responseText = await response.text();
        Logger.info(`Response received from GET ${endpoint}: Status ${response.status()}`);
        return JSON.parse(responseText)
    }

    /**
     * Re-usable POST Request 
     * @param endpoint Target API Path 
     * @param payload Key-Value pairs to send in the request body
     */

    async postCall(endpoint: string, payload: Record<string, unknown>): Promise<any> {
        Logger.info(`Sending POST request to: ${endpoint}`);
        const response = await this.apiContext.post(endpoint, {
            data: payload
        });
        const responseText = await response.text();
        Logger.info(`Response received from POST ${endpoint}: Status ${response.status()}`);
        return JSON.parse(responseText);
    }
    /**
     * Re-usable PUT Request 
     * @param endpoint Target API Path 
     * 
     */

    async put(endpoint: string, payload: Record<string, unknown>): Promise<any> {
        Logger.info(`Sending PUT request to: ${endpoint}`);
        const response = await this.apiContext.put(endpoint, {
            data: payload
        })
        const responseText = await response.text();
        Logger.info(`Response received from PUT ${endpoint}: Status ${response.status()}`);
        return JSON.parse(responseText);
    }

    /**
     * Re-usable POST Request (Form Urlencoded Payload)
     * Required for endpoints that expect form parameters (e.g. /api/searchProduct)
     */
    async postForm(endpoint: string, formPayload: Record<string, string>): Promise<any> {
        Logger.info(`Sending POST Form request to: ${endpoint}`);
        const response = await this.apiContext.post(endpoint, {
            form: formPayload
        });
        const responseText = await response.text();
        Logger.info(`Response received from POST Form ${endpoint}: Status ${response.status()}`);
        return JSON.parse(responseText);
    }
}

