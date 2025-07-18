import { PostController } from "@/core/controllers/post.controller";
import { NextRequest } from "next/server";

const postController = new PostController();

export async function GET(request: NextRequest) {
  return postController.getPosts(request);
}

export async function POST(request: NextRequest) {
  return postController.createPost(request);
}
