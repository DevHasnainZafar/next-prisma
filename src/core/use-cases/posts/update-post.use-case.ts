import { UpdatePostRequest, PostResponse } from "@/core/dtos/post.dto";
import { IPostRepository } from "@/core/repositories/interfaces/post.repository.interface";
import { createSlug } from "@/shared/utils/createSlug.utils";

export class UpdatePostUseCase {
  constructor(private postRepository: IPostRepository) {}

  async execute(
    id: string,
    data: UpdatePostRequest,
    userId: string
  ): Promise<PostResponse> {
    const existingPost = await this.postRepository.findById(id);
    if (!existingPost) {
      throw new Error("Post not found");
    }

    if (existingPost.authorId !== userId) {
      throw new Error("Forbidden");
    }

    const updateData: any = {};
    if (data.title) {
      updateData.title = data.title;
      updateData.slug = createSlug(data.title);
    }
    if (data.content) updateData.content = data.content;
    if (data.published !== undefined) updateData.published = data.published;

    const updatedPost = await this.postRepository.update(id, updateData);

    return {
      id: updatedPost.id,
      title: updatedPost.title,
      content: updatedPost.content,
      slug: updatedPost.slug,
      published: updatedPost.published,
      createdAt: updatedPost.createdAt,
      updatedAt: updatedPost.updatedAt,
      author: {
        id: updatedPost.author.id,
        username: updatedPost.author.username,
        firstName: updatedPost.author.firstName || undefined,
        lastName: updatedPost.author.lastName || undefined,
      },
    };
  }
}
