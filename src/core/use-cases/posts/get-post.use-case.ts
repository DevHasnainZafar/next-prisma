import { PostResponse } from "@/core/dtos/post.dto";
import { IPostRepository } from "@/core/repositories/interfaces/post.repository.interface";

export class GetPostUseCase {
  constructor(private postRepository: IPostRepository) {}

  async execute(id: string): Promise<PostResponse> {
    const post = await this.postRepository.findById(id);
    if (!post) {
      throw new Error("Post not found");
    }

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
