import { z } from 'zod'
const config = useRuntimeConfig()
const bodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})

export default defineEventHandler(async (event) => {
  const { email, password } = await readValidatedBody(event, bodySchema.parse)

  if (email === config.public.adminEmail && password === config.public.adminPassword) {
 
    await setUserSession(event, {
      user: {
        name: 'John Doe full access',
        role: 'admin'
      }
    })
    return {}
  }

  if (email === config.public.userEmail && password === config.public.userPassword) {

    await setUserSession(event, {
      user: {
        name: 'John Doe restricted access', 
        role: 'user'
      }
    })
    return {}
  }
  throw createError({
    statusCode: 401,
    message: 'Bad credentials'
  })
})