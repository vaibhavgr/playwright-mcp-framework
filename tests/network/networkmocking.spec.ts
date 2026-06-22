import { test } from '@fixtures/baseTest';
import { expect } from '@playwright/test';
import { Logger } from '@utils/Logger';

test.describe('Advanced Network Interception & Observability', () => {
      test('TC_NET_01: Mock API Interception - Mock Brand List', async ({ page }) => {

            const mockBrands = [
                  { id: 999, name: "Mocking API with Brand" },
                  { id: 1000, name: "Mocking Brand Elite" },
            ];
            await page.route('**/api/brandsList', async (route) => {
                  Logger.info('Injecting mock response');
                  await route.fulfill({
                        status: 200,
                        contentType: 'application/json',
                        body: JSON.stringify({
                              responseCode: 200,
                              brands: mockBrands
                        })
                  })
            })
            await page.goto('/')
            const response = await page.evaluate(async () => {
                  const res = await fetch('/api/brandsList');
                  return res.json();
            })
            Logger.info(`Mock Response Received: ${JSON.stringify(response)}`);
            // Assertions
            expect(response.responseCode).toBe(200);
            expect(response.brands[0].name).toBe("Mocking API with Brand");
            expect(response.brands[1].name).toBe("Mocking Brand Elite");
      });


      test('TC_NET_02 : Simulate Server Crash(500 Error)', async ({page})=>{
            
      })
});
