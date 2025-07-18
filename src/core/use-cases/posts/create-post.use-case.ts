import { CreatePostRequest, PostResponse } from "@/core/dtos/post.dto";
import { IPostRepository } from "@/core/repositories/interfaces/post.repository.interface";
import { createSlug } from "@/shared/utils/createSlug.utils";

export class CreatePostUseCase {
  constructor(private postRepository: IPostRepository) {}

  async execute(
    data: CreatePostRequest,
    authorId: string
  ): Promise<PostResponse> {
    const { title, content, published } = data;
    const slug = createSlug(title);

    const existingPost = await this.postRepository.findBySlug(slug);
    if (existingPost) {
      throw new Error("Post with this title already exists");
    }

    const post = await this.postRepository.create({
      title,
      content,
      slug,
      published: published || false,
      authorId,
    });

    return {
      id: post.id,
      title: post.title,
      content: post.content,
      slug: post.slug,
      published: post.published,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      author: {
        id: post.author.id,
        username: post.author.username,
        firstName: post.author.firstName || undefined,
        lastName: post.author.lastName || undefined,
      },
    };
  }
}
