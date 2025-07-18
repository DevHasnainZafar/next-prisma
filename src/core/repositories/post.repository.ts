import {
  PaginationParams,
  PaginationResult,
  PostWithAuthor,
} from "@/shared/types";
import { IPostRepository } from "./interfaces/post.repository.interface";
import { prisma } from "@/shared/config/prismaClient";
import { Post } from "@prisma/client";

export class PostRepository implements IPostRepository {
  async findById(id: string): Promise<PostWithAuthor | null> {
    return await prisma.post.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            firstName: true,
            lastName: true,
            email: true,
            role: true,
            isActive: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });
  }

  async findBySlug(slug: string): Promise<Post | null> {
    return await prisma.post.findUnique({
      where: { slug },
    });
  }
  async findAll(
    params: PaginationParams & { search?: string }
  ): Promise<PaginationResult<PostWithAuthor>> {
    const { page, limit, search } = params;
    const skip = (page - 1) * limit;

    const where = {
      published: true,
      ...(search && {
        OR: [
          { title: { contains: search, mode: "insensitive" as const } },
          { content: { contains: search, mode: "insensitive" as const } },
        ],
      }),
    };

    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where,
        include: {
          author: {
            select: {
              id: true,
              username: true,
              firstName: true,
              lastName: true,
              email: true,
              role: true,
              isActive: true,
              createdAt: true,
              updatedAt: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.post.count({ where }),
    ]);

    return {
      data: posts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async create(
    data: Omit<Post, "id" | "createdAt" | "updatedAt">
  ): Promise<PostWithAuthor> {
    return await prisma.post.create({
      data,
      include: {
        author: {
          select: {
            id: true,
            username: true,
            firstName: true,
            lastName: true,
            email: true,
            role: true,
            isActive: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });
  }

  async update(id: string, data: Partial<Post>): Promise<PostWithAuthor> {
    return await prisma.post.update({
      where: { id },
      data,
      include: {
        author: {
          select: {
            id: true,
            username: true,
            firstName: true,
            lastName: true,
            email: true,
            role: true,
            isActive: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.post.delete({
      where: { id },
    });
  }

  async findByAuthor(authorId: string): Promise<PostWithAuthor[]> {
    return await prisma.post.findMany({
      where: { authorId },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            firstName: true,
            lastName: true,
            email: true,
            role: true,
            isActive: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  }
}
