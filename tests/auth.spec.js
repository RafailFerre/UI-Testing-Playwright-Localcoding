//@ts-check
const { test, expect } = require('@playwright/test')

test.describe('AUTHENTICATION', () => {
    test.describe('POSITIVE', () => {
        test('Sign in with existing valid credentials', async ({ page }) => {
            await page.goto('https://coding.pasv.us/user/login')

            await page.locator('#normal_login_email').fill('raf-test@gmail.com')
            await page.locator('#normal_login_password').fill('12345')
            await page.locator('button[type="submit"]').click()

            await expect(page.locator('.ant-avatar-square')).toBeVisible()
        })
    })
    test.describe('NEGATIVE', () => {
        test('Sign in with invalid credentials', async ({ page }) => {
            await page.goto('https://coding.pasv.us/user/login')
            
            await page.locator('#normal_login_email').fill('invalid@email.com')
            await page.locator('#normal_login_password').fill('invalid_password')
            await page.locator('button[type="submit"]').click()

            const toast = page.locator('.ant-notification-notice-message')
            await expect(toast).toBeVisible()
            await expect(toast).toHaveText('User login. Fail')
        })
    })
})
