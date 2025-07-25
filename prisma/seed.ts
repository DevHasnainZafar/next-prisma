import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const userPassword = await bcrypt.hash("Test@123", 12);
  const user = await prisma.user.upsert({
    where: { email: "signatureartist90@gmail.com" },
    update: {},
    create: {
      email: "signatureartist90@gmail.com",
      username: "user",
      password: userPassword,
      firstName: "Muhammad",
      lastName: "Ahmad",
      isActive: true,
    },
  });

  await prisma.post.createMany({
    data: [
      {
        title: "Getting Started with Next.js",
        content:
          "Next.js is a React framework that enables functionality such as server-side rendering and generating static websites.",
        slug: "getting-started-with-nextjs",
        published: true,
        authorId: user.id,
      },
      {
        title: "Clean Architecture in Node.js",
        content:
          "Clean architecture is a software design philosophy that separates the elements of a design into ring levels.",
        slug: "clean-architecture-in-nodejs",
        published: true,
        authorId: user.id,
      },
      {
        title: "TypeScript Best Practices",
        content:
          "TypeScript is a strongly typed programming language that builds on JavaScript.",
        slug: "typescript-best-practices",
        published: false,
        authorId: user.id,
      },
    ],
  });

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
