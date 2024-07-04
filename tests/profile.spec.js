// import { test, expect } from '@playwright/test'
import { test, expect } from '../common/test'
import { signIn } from '../common/sign-in'

test.describe('PROFILE', () => {
    test.beforeEach(async ({ page, loginPage }) => {
        await signIn(page, process.env.EMAIL, process.env.PASSWORD)
        // await loginPage.open()
        // await loginPage.logIn(process.env.EMAIL, process.env.PASSWORD)

    })
    test('Image avatar and dropdown on profile page', async ({ page, profilePage }) => {
        await expect(profilePage.imageAvatar).toBeVisible()
        await expect(profilePage.dropDownUserName).toBeVisible()
    })

    test('Logout', async ({ page, profilePage }) => {
        await profilePage.dropDownUserName.click()
        await profilePage.logoutButton.click()
        // await profilePage.logOut()
        await expect(page).toHaveURL('/')
       
    })
})