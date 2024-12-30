import { z } from 'zod'
 
export const SignupFormSchema = z.object({
  email: z.string().email({ message: 'Введите действительный адрес электронной почты.' }).trim(),
  password: z
    .string()
    .min(8, { message: 'Длина пароля должна быть не менее 8 символов.' })
    .regex(/[a-zA-Z]/, { message: 'Пароль должен содержать как минимум одну букву.' })
    .regex(/[0-9]/, { message: 'Пароль должен содержать как минимум одно число.' })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'Пароль должен содержать хотя бы один специальный символ.',
    })
    .trim(),
  name: z
    .string()
    .min(2, { message: 'Имя должно быть длиной не менее 2 символов.' })
    .trim(),
})
 
export type FormState =
  | {
      errors?: {
        email?: string[]
        password?: string[]
        name?: string[]
      }
      message?: string
    }
  | undefined