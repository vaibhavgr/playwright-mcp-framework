import { test } from '@fixtures/baseTest';
import { expect } from '@playwright/test';

test.describe('API Testing - Products using ApiUtils', () => {
    test('TC_API_01_Get - all product list', async ({ apiUtil }) => {
        const response = await apiUtil.get('/api/productsList');
        expect(response.responseCode).toBe(200);
        // in api response, it will check if products name key exist in response or not
        expect(response.products).toBeDefined();
        expect(Array.isArray(response.products)).toBe(true);
        expect(response.products.length).toBeGreaterThan(0);
    });

    test('TC_API_02_POST to all products list - returns 405 Method Not Allowed', async ({ apiUtil }) => {
        const response = await apiUtil.postCall('api/productsList', {});
        expect(response.responseCode, 'API response code should be 405').toBe(405);
        expect(response.message, 'verify error message to be This request method is not supported.').toBe('This request method is not supported.');
    });


    test('TC_API_03_Get All Brands List - returns 200', async ({ apiUtil }) => {
        const response = await apiUtil.get('api/brandsList');
        expect(response.responseCode).toBe(200);
        expect(response.brands).toBeDefined();
        expect(Array.isArray(response.brands)).toBe(true);
        expect(response.brands.length).toBeGreaterThan(0);
    });

    test('TC_API_04: PUT To All Brands List - returns 405', async ({ apiUtil }) => {
        const response = await apiUtil.put('api/brandsList', {});
        expect(response.responseCode).toBe(405);
        expect(response.message, 'verify error message to be This request method is not supported.').toBe('This request method is not supported.');
    });

    test.only('TC_API_05_ POST To Search Product - returns 200', async ({ apiUtil }) => {
        const searchProduct = "tshirt"
        const response = await apiUtil.postForm('api/searchProduct', {
            search_product: searchProduct
        });
        expect(response.responseCode).toBe(200);
        expect(response.products, 'products key should be defined').toBeDefined();
        expect(Array.isArray(response.products), 'products should be an array').toBe(true);
        expect(response.products.length, 'products list should not be empty').toBeGreaterThan(0)


    });
});