import { PostController } from "@/core/controllers/post.controller";
import { NextRequest } from "next/server";

const postController = new PostController();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return postController.getPost(request, params.id);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return postController.updatePost(request, params.id);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return postController.deletePost(request, params.id);
}
