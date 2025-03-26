import { z } from 'zod'

const bodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})

export default defineEventHandler(async (event) => {
  const { email, password } = await readValidatedBody(event, bodySchema.parse)

  if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {

    await setUserSession(event, {
      user: {
        name: 'John Doe full access'
      }
    })
    return {}
  }

  if (email === process.env.USER_EMAIL && password === process.env.USER_PASSWORD) {

    await setUserSession(event, {
      user: {
        name: 'John Doe restricted access'
      }
    })
    return {}
  }
  throw createError({
    statusCode: 401,
    message: 'Bad credentials'
  })
})