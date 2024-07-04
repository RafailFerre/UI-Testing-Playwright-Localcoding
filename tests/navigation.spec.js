// import { test, expect } from '@playwright/test'
// import { signIn } from '../common/sign-in'
import { test, expect } from '../common/test'


test.describe('NAVIGATION', () => {
    test.beforeEach(async ({ page, loginPage }) => {               //test.beforeEach(async ({ page, loginPage }) => {
        // await signIn(page, process.env.EMAIL, process.env.PASSWORD)
        await loginPage.open()
        await loginPage.logIn(process.env.EMAIL, process.env.PASSWORD)
        // await page.goto('/user/login')
        // await page.locator('#normal_login_email').fill('process.env.EMAIL')
        // await page.locator('#normal_login_password').fill('process.env.PASSWORD')
        // await page.locator('button[type="submit"]').click()
    })
    test('Navigation - Courses', async ({ page, loginPage }) => {
        await loginPage.navbar.courses.click()
        // await page.getByTestId('topmenu-Courses').click()
        await expect(page).toHaveURL('/course')
        await expect(page.getByText('Interactive Courses')).toBeVisible()
    })
    test('Navigation - Challenges', async ({ page, loginPage }) => {
        await loginPage.navbar.challenges.click()
        // await page.getByTestId('topmenu-Challenges').click()
        await expect(page).toHaveURL('/challenge?limit=30&page=1')
        await expect(page.getByText('Coding challenges')).toBeVisible()
    })
    test('Navigation - Interview Questions', async ({ page, loginPage }) => {
        await loginPage.navbar.interview.click()
        // await page.getByTestId('topmenu-Interview Questions').click()
        await expect(page).toHaveURL('/flash')
        await expect(page.getByText('Interview practice cards')).toBeVisible()
    })
    test('Navigation - Diary', async ({ page, loginPage }) => {
        await loginPage.navbar.diary.click()
        // await page.getByTestId('topmenu-Diary').click()
        await expect(page).toHaveURL('/diary?page=1')
        await expect(page.getByText('Diary of progress')).toBeVisible()
    })
})
