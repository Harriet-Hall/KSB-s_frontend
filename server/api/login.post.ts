import { z } from 'zod'
const config = useRuntimeConfig()
const bodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})

export default defineEventHandler(async (event) => {

  try{


    const { email, password } = await readValidatedBody(event, bodySchema.parse)

    if (email === config.private.adminEmail && password === config.private.adminPassword) {
   
      await setUserSession(event, {
        user: {
          name: 'John Doe full access',
          role: 'admin'
        }
      })
      return {}
    }
  
    // if (email === config.private.userEmail && password === config.private.userPassword) {
  
    //   await setUserSession(event, {
    //     user: {
    //       name: 'John Doe restricted access', 
    //       role: 'user'
    //     }
    //   })
    //   return {}
    // }
  } catch{


    throw createError({
      statusCode: 401,
      message: 'Bad credentials'
  
    })
  }
})