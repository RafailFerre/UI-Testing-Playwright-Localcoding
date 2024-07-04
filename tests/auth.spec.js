// import { test, expect } from '@playwright/test'
import { test, expect } from '../common/test'
// import { signIn } from '../common/sign-in'

test.describe('AUTHENTICATION & AUTHORIZATION', () => {
    test.describe('POSITIVE', () => {
        test.beforeEach(async ({ page, loginPage }) => {
            await loginPage.open()
            // await signIn(page, process.env.EMAIL, process.env.PASSWORD)
            // await page.goto('https://coding.pasv.us/user/login')
            // await page.locator('#normal_login_email').fill('process.env.EMAIL')
            // await page.locator('#normal_login_password').fill('process.env.PASSWORD')
            // await page.locator('button[type="submit"]').click()
        })

        test('Sign in with existing valid credentials', async ({ page, loginPage }) => {
            await loginPage.logIn(process.env.EMAIL, process.env.PASSWORD)
            // await loginPage.input.email.fill(process.env.EMAIL)
            // await loginPage.input.password.fill(process.env.PASSWORD)
            // await loginPage.button.submit.click()

            await expect(page.locator('.ant-avatar-square')).toBeVisible()
        })
    })
    test.describe('NEGATIVE', () => {
        test.beforeEach(async ({ page, loginPage }) => {
            await loginPage.open()
        })
        test('Sign in with invalid credentials', async ({ page, loginPage }) => {
            await loginPage.logIn('invalid@mail.com', 'invalid_password')
            // await loginPage.inputEmail.fill('invalid@mail.com')
            // await loginPage.inputPassword.fill('invalid_password')
            // await loginPage.buttonSubmit.click()
            await expect(loginPage.toast).toBeVisible()
            await expect(loginPage.toast).toHaveText('User login. Fail')
        })
    })
})
