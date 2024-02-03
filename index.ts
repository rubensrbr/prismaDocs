import { PrismaClient } from "@prisma/client";
import { profile } from "console";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      name: "Abes Tado",
      email: "abestado@prisma.io",
      posts: {
        create: { title: "Eh noix!!!" },
      },
      profile: {
        create: { bio: "I like turtles" },
      },
    },
  });

  // ... you will write your Prisma Client queries here
  const allUsers = await prisma.user.findMany({
    include: {
      posts: true,
      profile: true,
    },
  });
  console.log(allUsers, { depth: null });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
