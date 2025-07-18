import {
  CreatePostRequest,
  UpdatePostRequest,
  PostResponse,
} from "@/core/dtos/post.dto";
import { PostRepository } from "@/core/repositories/post.repository";
import { CreatePostUseCase } from "@/core/use-cases/posts/create-post.use-case";
import { GetPostsUseCase } from "@/core/use-cases/posts/get-posts.use-case";
import { GetPostUseCase } from "@/core/use-cases/posts/get-post.use-case";
import { UpdatePostUseCase } from "@/core/use-cases/posts/update-post.use-case";
import { DeletePostUseCase } from "@/core/use-cases/posts/delete-post.use-case";
import { PaginationParams, PaginationResult } from "@/shared/types";

export class PostService {
  private postRepository: PostRepository;
  private createPostUseCase: CreatePostUseCase;
  private getPostsUseCase: GetPostsUseCase;
  private getPostUseCase: GetPostUseCase;
  private updatePostUseCase: UpdatePostUseCase;
  private deletePostUseCase: DeletePostUseCase;

  constructor() {
    this.postRepository = new PostRepository();
    this.createPostUseCase = new CreatePostUseCase(this.postRepository);
    this.getPostsUseCase = new GetPostsUseCase(this.postRepository);
    this.getPostUseCase = new GetPostUseCase(this.postRepository);
    this.updatePostUseCase = new UpdatePostUseCase(this.postRepository);
    this.deletePostUseCase = new DeletePostUseCase(this.postRepository);
  }

  async createPost(
    data: CreatePostRequest,
    authorId: string
  ): Promise<PostResponse> {
    return await this.createPostUseCase.execute(data, authorId);
  }

  async getPosts(
    params: PaginationParams & { search?: string }
  ): Promise<PaginationResult<PostResponse>> {
    return await this.getPostsUseCase.execute(params);
  }

  async getPost(id: string): Promise<PostResponse> {
    return await this.getPostUseCase.execute(id);
  }

  async updatePost(
    id: string,
    data: UpdatePostRequest,
    userId: string
  ): Promise<PostResponse> {
    return await this.updatePostUseCase.execute(id, data, userId);
  }

  async deletePost(id: string, userId: string): Promise<void> {
    return await this.deletePostUseCase.execute(id, userId);
  }
}
