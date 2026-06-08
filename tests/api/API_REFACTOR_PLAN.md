# API Automation Framework Refactoring Plan

This file outlines a clean, scalable, and modular setup to reduce repetition and follow the enterprise standards seen in `pc-gdp-test-automation-main`.

---

## 1. Custom Assertion Helpers
Create a file at `tests/api/support/apiAssertions.ts` to reuse expectations across all API tests.

```typescript
import { expect } from '@playwright/test';

// Common status assertion
export function assertResponseCode(response: any, expectedCode: number) {
    expect(response.responseCode, `Response code should be ${expectedCode}`).toBe(expectedCode);
}

// Products list schema validation
export function assertProductsList(products: any) {
    expect(products, 'Products list should be defined').toBeDefined();
    expect(Array.isArray(products), 'Products should be an array').toBe(true);
    expect(products.length, 'Products list should not be empty').toBeGreaterThan(0);
}

// Brands list schema validation
export function assertBrandsList(brands: any) {
    expect(brands, 'Brands list should be defined').toBeDefined();
    expect(Array.isArray(brands), 'Brands should be an array').toBe(true);
    expect(brands.length, 'Brands list should not be empty').toBeGreaterThan(0);
}

// Error message validation
export function assertErrorMessage(response: any, expectedMessage: string) {
    expect(response.message, 'Verify error message matches').toBe(expectedMessage);
}
```

---

## 2. API Wrapper Classes (POM pattern for APIs)
Instead of typing raw endpoint paths inside tests, wrap them in clean class controllers.

### `tests/api/support/ProductAPI.ts`
```typescript
import { ApiUtils } from '@utils/APIUtils';

export class ProductAPI {
    constructor(private apiUtil: ApiUtils) {}

    async getAllProducts() {
        return this.apiUtil.get('/api/productsList');
    }

    async postAllProducts() {
        return this.apiUtil.postCall('api/productsList', {});
    }

    async searchProduct(keyword: string) {
        return this.apiUtil.postForm('api/searchProduct', {
            search_product: keyword
        });
    }

    async searchProductWithoutParam() {
        return this.apiUtil.postForm('api/searchProduct', {});
    }
}
```

### `tests/api/support/BrandAPI.ts`
```typescript
import { ApiUtils } from '@utils/APIUtils';

export class BrandAPI {
    constructor(private apiUtil: ApiUtils) {}

    async getAllBrands() {
        return this.apiUtil.get('api/brandsList');
    }

    async putAllBrands() {
        return this.apiUtil.put('api/brandsList', {});
    }
}
```

---

## 3. Registering API Classes in Playwright Fixtures
Extend the `tests/fixtures/baseTest.ts` file to expose `productAPI` and `brandAPI` directly.

```typescript
// 1. Add imports at the top
import { ProductAPI } from '../api/support/ProductAPI';
import { BrandAPI } from '../api/support/BrandAPI';

// 2. Extend the MyFixtures type
type MyFixtures = {
    // ... your existing page objects
    apiUtil: ApiUtils;
    productAPI: ProductAPI;
    brandAPI: BrandAPI;
};

// 3. Register the instantiators inside test.extend()
export const test = baseTest.extend<MyFixtures>({
    // ... your page objects setup
    
    apiUtil: async ({ request }, use) => {
        const apiUtil = new ApiUtils(request);
        await use(apiUtil);
    },
    productAPI: async ({ apiUtil }, use) => {
        await use(new ProductAPI(apiUtil));
    },
    brandAPI: async ({ apiUtil }, use) => {
        await use(new BrandAPI(apiUtil));
    }
});
```

---

## 4. Refactored Test Specs
Now your spec files will be extremely clean, short, and focused.

### Refactored `tests/api/product.spec.ts`
```typescript
import { test } from '@fixtures/baseTest';
import { expect } from '@playwright/test';
import { assertResponseCode, assertProductsList, assertErrorMessage } from './support/apiAssertions';

test.describe('API Testing - Products', () => {

    test('TC_API_01: Get all products list - returns 200', async ({ productAPI }) => {
        const response = await productAPI.getAllProducts();
        
        assertResponseCode(response, 200);
        assertProductsList(response.products);
    });

    test('TC_API_02: POST to all products list - returns 405 Method Not Allowed', async ({ productAPI }) => {
        const response = await productAPI.postAllProducts();
        
        assertResponseCode(response, 405);
        assertErrorMessage(response, 'This request method is not supported.');
    });

    test('TC_API_05: POST To Search Product - returns 200 with matching items', async ({ productAPI }) => {
        const searchKeyword = "tshirt";
        const response = await productAPI.searchProduct(searchKeyword);
        
        assertResponseCode(response, 200);
        assertProductsList(response.products);

        const hasMatchingProduct = response.products.some((r: any) => 
            r.name.toLowerCase().includes(searchKeyword.toLowerCase())
        );
        expect(hasMatchingProduct, 'Search result should contain the keyword').toBe(true);
    });

    test('TC_API_06: POST To Search Product without search_product parameter - returns 400', async ({ productAPI }) => {
        const response = await productAPI.searchProductWithoutParam();
        
        assertResponseCode(response, 400);
        assertErrorMessage(response, 'Bad request, search_product parameter is missing in POST request.');
    });
});
```

### Refactored/New `tests/api/brand.spec.ts`
```typescript
import { test } from '@fixtures/baseTest';
import { assertResponseCode, assertBrandsList, assertErrorMessage } from './support/apiAssertions';

test.describe('API Testing - Brands', () => {

    test('TC_API_03: Get All Brands List - returns 200', async ({ brandAPI }) => {
        const response = await brandAPI.getAllBrands();
        
        assertResponseCode(response, 200);
        assertBrandsList(response.brands);
    });

    test('TC_API_04: PUT To All Brands List - returns 405', async ({ brandAPI }) => {
        const response = await brandAPI.putAllBrands();
        
        assertResponseCode(response, 405);
        assertErrorMessage(response, 'This request method is not supported.');
    });
});
```
