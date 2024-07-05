// import { test, expect } from '@playwright/test'
import { test, expect } from '../common/test'
import { signIn } from '../common/sign-in'

test.describe('PROFILE', () => {
    test.beforeEach(async ({ page, loginPage }) => {

        

        await signIn(page, process.env.EMAIL, process.env.PASSWORD)
        // await loginPage.open()
        // await loginPage.logIn(process.env.EMAIL, process.env.PASSWORD)

    })

    test('MOCK: Email confirmation alert is not visible, dropdown Name is changed', async ({page, profilePage}) => {
        await page.route('**/user/auth', async route => {
            const response = await route.fetch()
            const json = await response.json()
            json.payload.emailConfirmation.confirmed = true
            json.payload.name = 'Mock Name'
            json.payload.firstName = 'It'
            json.payload.lastName = 'Works'
            await route.fulfill({response, json})
          })

        await page.waitForLoadState('networkidle')
        await expect(profilePage.alert).not.toBeVisible()
        await expect(profilePage.dropDownUserName).toHaveText('Mock Name')
        
        // test.setTimeout(650000)
        // await page.waitForTimeout(650000)
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