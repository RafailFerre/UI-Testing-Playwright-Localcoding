import { test, expect } from '@playwright/test';
import { signIn } from '../common/sign-in';

test.describe('NAVIGATION', () => {
    test.beforeEach(async ({ page }) => {
        await signIn(page,'raf-test@gmail.com','12345')
        // await page.goto('/user/login')
        // await page.locator('#normal_login_email').fill('raf-test@gmail.com')
        // await page.locator('#normal_login_password').fill('12345')
        // await page.locator('button[type="submit"]').click()
    })
    test('Navigation - Courses', async ({ page }) => {
        await page.getByTestId('topmenu-Courses').click()
        await expect(page).toHaveURL('/course')
        await expect(page.getByText('Interactive Courses')).toBeVisible()
    });
    test('Navigation - Challenges', async ({ page }) => {
        await page.getByTestId('topmenu-Challenges').click()
        await expect(page).toHaveURL('/challenge?limit=30&page=1')
        await expect(page.getByText('Coding challenges')).toBeVisible()
    });
    test('Navigation - Interview Questions', async ({ page }) => {
        await page.getByTestId('topmenu-Interview Questions').click()
        await expect(page).toHaveURL('/flash')
        await expect(page.getByText('Interview practice cards')).toBeVisible()
    });
    test('Navigation - Diary', async ({ page }) => {
        await page.getByTestId('topmenu-Diary').click()
        await expect(page).toHaveURL('/diary?page=1')
        await expect(page.getByText('Diary of progress')).toBeVisible()
    });
});