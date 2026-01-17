import { prisma } from "../src/config/prisma";
import bcrypt from "bcryptjs";


    async function main() {
    const hashedPassword = await bcrypt.hash("senha123", 10);

    const user = await prisma.user.create({
        data: {
            name: "Administrador",
            email: "admin@estoque.com",
            password: hashedPassword,
            role: "ADMINISTRADOR",
        },
    });

    console.log("Usuário criado:", user);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });