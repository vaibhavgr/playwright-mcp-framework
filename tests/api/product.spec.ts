import { test } from '@fixtures/baseTest';
import { expect } from '@playwright/test';

test.describe('API Testing - Products using ApiUtils', () => {
    test.only('Get - all product list', async ({ apiUtil }) => {
        const response = await apiUtil.get('/api/productsList');
        expect(response.responseCode).toBe(200);
        expect(response.products).toBeDefined();
        expect(Array.isArray(response.products)).toBe(true);
        expect(response.products.length).toBeGreaterThan(0);
        
    })
})