import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const createCharacter = async (req, res) => {
    try{
        const { id } = req.user;
        const user = await prisma.user.findUnique({ where: { id: Number(id) } });

        if (!user) {
            console.log(user)
            return res.status(404).json({ error: 'User not found' });
        }

        const player = await prisma.character.create({
            data: {
                name: req.body.name,
                buildId: req.body.build,
                gender: req.body.gender,
                health: req.body.health,
                attack: 1,
                defense: 1,
                mana: 1,
                agility: 1,
                userId: user.id
            },});

        return res.status(200).json({data: player});
    }catch(error){
        return res.status(500).json({error: error.message});
    }

}

const getAllCharacters = async (req, res) => {

    try{
        const {id} = req.user;
        const characters = await prisma.character.findMany({
            where: {
                userId: Number(id)
            },
            include: {
                build: true
            }
        });
        
        return res.status(200).json({data: characters});
    }catch(error){
        return res.status(500).json({error: error.message});
    }
}

const getCharacter = async (req, res) => {
    try{
        const {id} = req.user;
        const character = await prisma.character.findUnique({
            where: {
                name: req.params.name,
                userId: Number(id)

            },
            include: {
                build: true
            }
        });
        return res.status(200).json({data: character});
    }catch(error){
        return res.status(500).json({error: error.message});
    }
}


export { createCharacter, getAllCharacters, getCharacter };