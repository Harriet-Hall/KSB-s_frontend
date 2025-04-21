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

    } else {

      await setUserSession(event, {
        user: {
          name: 'John Doe restricted access',
          role: 'user'
        }
      })
      throw createError({
        statusCode: 401,
        message: 'Bad credentials'
    
      })
    }
  
  } catch{

    throw createError({
      statusCode: 401,
      message: 'Bad credentials'
  
    })
  }
})