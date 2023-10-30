/**
 * Handles all location crelated endpoints
 */

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const sellItem = async (req, res) => {
    try{
        const {id} = req.user;
        console.log(id)

        const user = await prisma.user.findUnique({ where: { id: Number(id) } })

        // Check if the user exists
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const character = await prisma.character.findUnique({
            where: {
              id: Number(req.body.characterId),
            },
        });

        const item = await prisma.item.findUnique({
            where : {
                id: Number(req.body.itemId),
            }
        });

        console.log(item)

        if(character.locationId !== 3) {
            return res.status(401).json({ error: "You are not in the merchant location"});
        }


        character.currency += item.sellPrice;

        const updateCharacter = await prisma.character.update({
            where : {
                id: Number(req.body.characterId),
            },
            data: {
                currency: Number(character.currency)
            },
        });


        

        return res.status(200).json({ msg:"Item successfully sold, your new balance is " + character.currency});
    }catch(e){
        return res.status(500).json({error: e.message});
    }
};


export {sellItem}