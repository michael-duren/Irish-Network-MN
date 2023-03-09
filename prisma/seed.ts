import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { teamScript } from "./team-script";

const prisma = new PrismaClient();
async function main() {
  // delete old data
  await prisma.news.deleteMany();
  await prisma.team.deleteMany();
  await prisma.event.deleteMany();
  await prisma.contact.deleteMany();

  // team members
  teamScript(prisma, faker);

  // events
  for (let i = 0; i < 10; i++) {
    await prisma.event.create({
      data: {
        id: faker.datatype.uuid(),
        slug: faker.lorem.slug(),
        title: faker.company.name(),
        date: faker.date.future(),
        address: faker.address.streetAddress(),
        location: faker.company.name(),
        excerpt: faker.lorem.sentence(),
        description: faker.lorem.paragraphs(),
        additionalInformation: faker.lorem.sentence(),
        featuredImage: faker.image.city(undefined, undefined, true),
        price: faker.commerce.price(),
        ticketLink: faker.internet.url(),
        register: faker.datatype.boolean(),
      },
    });
  }

  for (let i = 0; i < 20; i++) {
    await prisma.event.create({
      data: {
        id: faker.datatype.uuid(),
        slug: faker.lorem.slug(),
        title: faker.company.name(),
        date: faker.date.past(),
        address: faker.address.streetAddress(),
        location: faker.company.name(),
        excerpt: faker.lorem.sentence(),
        description: faker.lorem.paragraphs(),
        additionalInformation: faker.lorem.sentence(),
        featuredImage: faker.image.city(undefined, undefined, true),
        price: faker.commerce.price(),
        ticketLink: faker.internet.url(),
        register: faker.datatype.boolean(),
      },
    });
  }

  // contact
  for (let i = 0; i < 20; i++) {
    await prisma.contact.create({
      data: {
        id: faker.datatype.uuid(),
        name: faker.name.fullName(),
        email: faker.internet.email(),
        title: faker.lorem.sentence(),
        message: faker.lorem.paragraph(),
      },
    });
  }
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
