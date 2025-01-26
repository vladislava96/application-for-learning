import { Prisma, PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { createSession } from "@/lib/session";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const loginData = await request.json();
  try {
    const user = await prisma.user.findFirst({where: {email: loginData.email}});
    if (!user) {
      return NextResponse.json(
        { message: "Пользователь с таким email не существует" },
        { status: 400 }
      );
    };
    const validPassword = bcrypt.compareSync(loginData.password, user.password);
    if (!validPassword) {
      return NextResponse.json(
        { message: "Введен неверный пароль" },
        { status: 400 }
      );
    }
    await createSession(loginData.id);
    return NextResponse.json({ message: "Вход выполнен" });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json(
        { message: e },
        { status: 400 }
      );
    }
  }
}