import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const getAllBuilds = async (req, res) => {
    try{
        const records = await prisma.build.findMany();
        return res.status(200).json({data: records});
    }catch(error){
        return res.status(500).json({error: error.message});
    }

}

export {getAllBuilds};
