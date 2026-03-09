import { PrismaClient } from "@prisma/client";
import argon2 from "argon2";
import { UserRole } from "@prisma/client";

const prisma = new PrismaClient();  
async function main() {
  const password = await argon2.hash("Puram@123");

  const admin = await prisma.user.create({
    data: {
      firstName: "Admin",
      lastName: "Puram",
      email: "puramconsultancy2@gmail.com",
      password,
      role: UserRole.ADMIN,
    },
  });

  console.log("Admin created:", admin.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
