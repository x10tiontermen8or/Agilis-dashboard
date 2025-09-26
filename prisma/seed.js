// 📂 prisma/seed.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');
  await prisma.junction.createMany({
    data: [
      { name: "Junction Alpha", location: "Main St & 1st Ave", status: "normal", vehicleCount: 23, queueLength: 5, waitTime: "1.2 min", coordsLat: 28.6139, coordsLon: 77.2090 },
      { name: "Junction Beta", location: "Broadway & 2nd St", status: "congested", vehicleCount: 47, queueLength: 15, waitTime: "4.8 min", coordsLat: 28.6304, coordsLon: 77.2177 },
      { name: "Junction Gamma", location: "Park Ave & 3rd St", status: "normal", vehicleCount: 12, queueLength: 8, waitTime: "2.1 min", coordsLat: 28.5921, coordsLon: 77.2183 },
      { name: "Junction Delta", location: "Oak St & 4th Ave", status: "normal", vehicleCount: 31, queueLength: 7, waitTime: "2.5 min", coordsLat: 28.5562, coordsLon: 77.1000 },
    ],
    skipDuplicates: true,
  });
  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });