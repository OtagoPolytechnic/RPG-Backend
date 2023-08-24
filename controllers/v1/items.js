import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const createItem = async (req, res) => {
    try{
        // Extract the user id from the request
        const { id } = req.user;

       // const {buildId} = req.body.build;
        // Find the user using the extracted user id
        const user = await prisma.user.findUnique({ where: { id: Number(id) } });

        if(user.role !== 'SUPER_ADMIN'){

            //IMPLETEMENT LOGIC TO CHECK IF USER HAS ACCESS TO BUILD
        }

        // const item = {...req.body};
        console.log(req.body);

        const item = await prisma.item.create({
            data: { ...req.body }
        });

        return res.status(200).json({data: item});
    }catch(error){
        return res.status(500).json({error: error.message});
    }

}

const getAllItems = async (req, res) => {
    try{
    const data = await prisma.item.findMany();
    return res.status(200).json({data: data});
    }catch(error){
        return res.status(500).json({error: error.message});
    }
}


export {createItem, getAllItems};