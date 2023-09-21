/**
 * Handles all location crelated endpoints
 */

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const sellItem = async (req, res) => {
    try{
        const {id} = req.user;

        const user = await prisma.user.findUnique({ where: { id: Number(id) } })

        // Check if the user exists
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const character = await prisma.character.findUnique({
            where: {
              id: Number(req.params.characterId),
            },
        });

        if (character.userId !== Number(id)) {
            return res.status(401).json({ error: "You are not authorized to view this character" });
          }

        if(character.locationId !== 3) {
            return res.status(401).json({ error: "You are not in the merchant location"});
        }

        const item = req.params.itemId;
        


    }catch(e){
        return res.status(500).json({error: error.message});
    }
};


export {sellItem}