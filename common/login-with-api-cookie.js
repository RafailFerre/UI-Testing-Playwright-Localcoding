// export const logInWithApi = async (page, request, context, email, password) => {
//   const response = await request.post(
//     `${process.env.API_BASE_URL}/user/login`,
//     {
//       data: {
//         email,
//         password,
//       }
//     }
//   )

//   const headers = response.headers()
//   const cookies = headers['set-cookie'].split('\n')
//   const setCookies = []

//   for (const cookie of cookies) {
//     const pairs = cookie.split('; ')
//     const object = {}

//     const [name, value] = pairs.shift().split('=')
//     object['name'] = name
//     object['value'] = value

//     for (const pair of pairs) {
//       let [key, value] = pair.split('=')

//       if (key === 'Expires') {
//         value = Date.parse(value) / 1000
//       }

//       object[`${key.charAt(0).toLowerCase() + key.slice(1)}`] = value || true
//     }

//     setCookies.push(object)
//   }

//   await page.goto('/')
//   await context.addCookies(setCookies)
//   await page.reload()
// }





export const logInWithApi = async (page, apiContext, context, email, password) => {

    //console.log(`Logging in with email: ${email}`); // success

    const response = await apiContext.post(
      `${process.env.API_BASE_URL}/user/login`,
      {
        data: {
          email,
          password,
        }
      }
    )

    if (!response.ok()) {
        throw new Error(`Failed to login: ${response.status()} ${response.statusText()}`);  // no error message
    }
    const body = await response.json();
    //console.log(`Login response body: ${JSON.stringify(body)}`);



  
    const headers = response.headers()
    const cookies = headers['set-cookie'].split('\n')

    if (!cookies) {
      throw new Error('No set-cookie header in response');  // no error message
  }

    const setCookies = []
  
    for (const cookie of cookies) {
      const pairs = cookie.split('; ')
      const object = {}
  
      const [name, value] = pairs.shift().split('=')
      object['name'] = name
      object['value'] = value
  
      for (const pair of pairs) {
        let [key, value] = pair.split('=')
  
        if (key === 'Expires') {
          value = Date.parse(value) / 1000
        }
  
        object[`${key.charAt(0).toLowerCase() + key.slice(1)}`] = value || true
      }

      //object['url'] = process.env.API_BASE_URL;  // Добавляем URL для контекста
  
      setCookies.push(object)
    }




    

    //console.log(`Set cookies: ${JSON.stringify(setCookies)}`);  // show all cookies

    await page.goto('/')
    await context.addCookies(setCookies)
    await page.reload()

    const cookiesInBrowser = await context.cookies();
    console.log(`Cookies set in browser: ${JSON.stringify(cookiesInBrowser)}`);

  }
