import { SignupFormSchema } from "@/lib/definitions";
import { Prisma, PrismaClient } from "@prisma/client";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const user = await request.json();
  const validationResult = SignupFormSchema.safeParse({ email: user.email, password: user.password, name: user.name })
  if(!validationResult.success) {
    const result = validationResult.error?.format();
    if(result?.email?._errors) {
      const errorMessage = result?.email._errors.join();
      return NextResponse.json({message: errorMessage, error: result}, {status: 422})
    }
    if(result?.password?._errors) {
      const errorMessage = result?.password._errors.join();
      return NextResponse.json({message: errorMessage, error: result}, {status: 422})
    }
    if(result?.name?._errors) {
      const errorMessage = result?.name._errors.join();
      return NextResponse.json({message: errorMessage, error: result}, {status: 422})
    }
    return NextResponse.json({message: 'Ошибка валидации', error: result}, {status: 422})
  }
  try {
    const result = await prisma.user.create({
      data: {
        email: user.email,
        password: user.password,
        name: user.name
      },
    })
    return NextResponse.json({ message: 'Регистрация прошла успешно' })
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2002') {
        return NextResponse.json(
          { message: 'Пользователь с таким email уже существует' },
          { status: 400 }
        )
      }
    }
  }
}
