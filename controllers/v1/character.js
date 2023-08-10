import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const createCharacter = async (req, res) => {
    try{
        const { id } = req.user;
        console.log(id)
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

        console.log(player)
        return res.status(200).json({data: player});
    }catch(error){
        return res.status(500).json({error: error.message});
    }

}

export { createCharacter };