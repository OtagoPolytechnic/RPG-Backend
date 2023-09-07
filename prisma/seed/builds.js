import axios from "axios";
import { PrismaClient } from "@prisma/client";

import { builds } from "../../data/builds.js";

const prisma = new PrismaClient();

const seedBuilds = async () => {
  await prisma.build.createMany({ data: builds });
  console.log("Builds Created");
};

seedBuilds()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  });

export default seedBuilds;
