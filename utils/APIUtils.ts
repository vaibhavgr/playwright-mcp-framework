import { APIRequestContext } from '@playwright/test';

export class ApiUtils {
    readonly apiContext: APIRequestContext;

    constructor(apiContext: APIRequestContext) {
        this.apiContext = apiContext;
    }
}