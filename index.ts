import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {

    const count = await prisma.user.count();

    if (count === 0) {
        console.log("");
        console.log("# create");
        await prisma.user.create({
            data: {
                name: 'Alice',
                email: 'alice@prisma.io',
                posts: {
                    create: { title: 'Hello World' },
                },
                profile: {
                    create: { bio: 'I like turtles' },
                },
            },
        })
    }

    console.log("");
    console.log("# findMany");
    const allUsers = await prisma.user.findMany({
        include: {
            posts: true,
            profile: true,
        },
    })

    console.dir(allUsers, { depth: null })

    // update
    console.log("");
    console.log("# update");
    const post = await prisma.post.update({
        where: { id: 1 },
        data: { published: true },
    })
    console.log(post)

}

main()
    .catch((e) => {
        throw e
    })
    .finally(async () => {
        await prisma.$disconnect()
    })