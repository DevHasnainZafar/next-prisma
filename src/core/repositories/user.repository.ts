import { User } from "@prisma/client";
import { IUserRepository } from "./interfaces/user.repository.interface";
import { prisma } from "@/shared/config/prismaClient";
import { UserWithoutPassword } from "@/shared/types";

export class UserRepository implements IUserRepository {
  async findById(id: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { id },
    });
  }
  async findByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { email },
    });
  }

  async findByUsername(username: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { username },
    });
  }

  async findByEmailOrUsername(
    email: string,
    username: string
  ): Promise<User | null> {
    return await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });
  }

  async findAll(): Promise<UserWithoutPassword[]> {
    const users = await prisma.user.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "desc" },
    });
    return users;
  }

  async create(
    data: Omit<User, "id" | "createdAt" | "updatedAt">
  ): Promise<User> {
    return await prisma.user.create({
      data,
    });
  }

  async update(id: string, data: Partial<User>): Promise<User> {
    return await prisma.user.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.user.delete({
      where: { id },
    });
  }
}
