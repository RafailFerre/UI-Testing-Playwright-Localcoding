//@ts-check
const { test, expect } = require('@playwright/test')
import { signIn } from '../common/sign-in'

test.describe('AUTHENTICATION', () => {
    test.describe('POSITIVE', () => {
        test.beforeEach(async ({ page }) => {
            await signIn(page, process.env.EMAIL, process.env.PASSWORD)
            // await page.goto('https://coding.pasv.us/user/login')
            // await page.locator('#normal_login_email').fill('raf-test@gmail.com')
            // await page.locator('#normal_login_password').fill('12345')
            // await page.locator('button[type="submit"]').click()
        })

        test('Sign in with existing valid credentials', async ({ page }) => {
            await expect(page.locator('.ant-avatar-square')).toBeVisible()
        })
    })
    test.describe('NEGATIVE', () => {
        test.beforeEach(async ({ page }) => {
            await signIn(page, 'invalid@gmail.com', 'invalid_password')
        })
        test('Sign in with invalid credentials', async ({ page }) => {
            const toast = page.locator('.ant-notification-notice-message')
            await expect(toast).toBeVisible()
            await expect(toast).toHaveText('User login. Fail')
        })
    })
})
