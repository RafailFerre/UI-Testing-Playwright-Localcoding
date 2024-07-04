import BasePage from './base'

export default class LoginPage extends BasePage {
    constructor(page) {
        super(page)  // import BasePage constructor
        //this.page = page

        this.inputEmail = page.locator('#normal_login_email')
        this.inputPassword = page.locator('#normal_login_password')
        this.buttonSubmit = page.locator('button[type="submit"]')

        // this.input = {
        //   email: page.locator('#normal_login_email'),
        //   password: page.locator('#normal_login_password'),
        // }

        // this.button = {
        //     submit: page.locator('button[type="submit"]'),
        // }
    }

    async open() {
        await this.page.goto('/user/login')
    }

    async logIn(email, password) {
        await this.inputEmail.fill(email)
        await this.inputPassword.fill(password)
        await this.buttonSubmit.click()

        // await this.input.email.fill(email)
        // await this.input.password.fill(password)
        // await this.button.submit.click()
    }
}
