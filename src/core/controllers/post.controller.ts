import { NextRequest } from "next/server";
import { PostService } from "@/core/services/post.service";
import { CreatePostDto, UpdatePostDto } from "@/core/dtos/post.dto";
import { successResponse, errorResponse } from "@/shared/utils/response.utils";
import { getUserFromHeaders } from "@/shared/utils/auth-header.utils";

export class PostController {
  private postService: PostService;

  constructor() {
    this.postService = new PostService();
  }

  async createPost(request: NextRequest) {
    try {
      const { userId } = getUserFromHeaders(request);
      const body = await request.json();
      const validation = CreatePostDto.safeParse(body);
      if (!validation.success) {
        return errorResponse("Invalid input data", 400);
      }
      const result = await this.postService.createPost(validation.data, userId);
      return successResponse(result, "Post created successfully");
    } catch (error) {
      return errorResponse(
        error instanceof Error ? error.message : "Failed to create post",
        500
      );
    }
  }

  async getPosts(request: NextRequest) {
    try {
      const { searchParams } = new URL(request.url);
      const page = parseInt(searchParams.get("page") || "1");
      const limit = parseInt(searchParams.get("limit") || "10");
      const search = searchParams.get("search") || undefined;

      const result = await this.postService.getPosts({ page, limit, search });
      return successResponse(result);
    } catch (error) {
      return errorResponse(
        error instanceof Error ? error.message : "Failed to fetch posts",
        500
      );
    }
  }

  async getPost(request: NextRequest, id: string) {
    try {
      const result = await this.postService.getPost(id);
      return successResponse(result);
    } catch (error) {
      return errorResponse(
        error instanceof Error ? error.message : "Post not found",
        404
      );
    }
  }

  async updatePost(request: NextRequest, id: string) {
    try {
      const { userId } = getUserFromHeaders(request);
      const body = await request.json();
      const validation = UpdatePostDto.safeParse(body);
      if (!validation.success) {
        return errorResponse("Invalid input data", 400);
      }

      const result = await this.postService.updatePost(
        id,
        validation.data,
        userId
      );
      return successResponse(result, "Post updated successfully");
    } catch (error) {
      const status =
        error instanceof Error && error.message === "Forbidden" ? 403 : 500;
      return errorResponse(
        error instanceof Error ? error.message : "Failed to update post",
        status
      );
    }
  }

  async deletePost(request: NextRequest, id: string) {
    try {
      const { userId } = getUserFromHeaders(request);
      await this.postService.deletePost(id, userId);
      return successResponse(null, "Post deleted successfully");
    } catch (error) {
      const status =
        error instanceof Error && error.message === "Forbidden" ? 403 : 500;
      return errorResponse(
        error instanceof Error ? error.message : "Failed to delete post",
        status
      );
    }
  }
}
