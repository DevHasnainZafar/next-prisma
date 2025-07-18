import { IPostRepository } from "@/core/repositories/interfaces/post.repository.interface";

export class DeletePostUseCase {
  constructor(private postRepository: IPostRepository) {}

  async execute(id: string, userId: string): Promise<void> {
    const existingPost = await this.postRepository.findById(id);
    if (!existingPost) {
      throw new Error("Post not found");
    }

    if (existingPost.authorId !== userId) {
      throw new Error("Forbidden");
    }
    await this.postRepository.delete(id);
  }
}
