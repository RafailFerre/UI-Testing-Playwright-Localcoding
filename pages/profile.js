import BasePage from "./base";

export default class ProfilePage extends BasePage {
    constructor(page) {
        super(page);
        //this.page = page

        this.imageAvatar = page.locator('.ant-avatar-square')
        this.dropDownUserName = page.locator('.ant-dropdown-trigger > .ms-2')
        this.logoutButton = page.locator('[data-qa="logout"]')

    }    

    async logOut() {
        await this.dropDownUserName.click()
        await this.logoutButton.click()
    }

}