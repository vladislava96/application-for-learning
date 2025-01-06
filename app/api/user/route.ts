import { SignupFormSchema } from "@/lib/definitions";
import { Prisma, PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const user = await request.json();
  const validationResult = SignupFormSchema.safeParse({ email: user.email, password: user.password, name: user.name });

  if(!validationResult.success) {
    const result = validationResult.error?.format();
    let message = '';

    if(result?.email?._errors) {
      message += result?.email._errors.join();
    }
    if(result?.password?._errors) {
      message += result?.password._errors.join();
    }
    if(result?.name?._errors) {
      message += result?.name._errors.join();
    }

    return NextResponse.json({message}, {status: 422})
  };

  const hashPassword = bcrypt.hashSync(user.password, 5646 )
  try {
    const result = await prisma.user.create({
      data: {
        email: user.email,
        password: hashPassword,
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
