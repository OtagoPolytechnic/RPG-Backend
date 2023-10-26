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

        console.log(character);
        


    }catch(e){
        return res.status(500).json({error: e.message});
    }
};


// const addItemToCharacter = async (req, res) => {
//     try {
//       const { id } = req.user;
//       // Fetch the user from the database based on the user's ID.
//       const user = await prisma.user.findUnique({
//         where: { id: Number(id) },
//         include: {
//           characters: true,
//         },
//       });
//       console.log(user);
//       // Check if the character belongs to the user.
//       const characterAvailable = user.characters.find((character) => character.id === Number(req.body.characterId));
//       if (!characterAvailable) {
//         return res.status(401).json({ error: "You are not authorized to view this character" });
//       }
  
//       // Fetch the character from the database based on the character ID.
//       const character = await prisma.character.findUnique({
//         where: {
//           id: Number(req.body.characterId),
//         },
//       });
  
//       // Fetch the item from the database based on the item ID.
//       const item = await prisma.item.findUnique({
//         where: {
//           id: Number(req.body.itemId),
//         },
//       });
  
//       // Check if the character has enough currency to purchase the item.
//       if (character.currency < item.buyCost) {
//         return res.status(400).json({ error: "Insufficient funds" });
//       }
  
//       // Update the character's currency after purchasing the item.
//       const updatedCharacter = await prisma.character.update({
//         where: {
//           id: Number(req.body.characterId),
//         },
//         data: {
//           currency: Number(character.currency - item.buyCost),
//         },
//       });
  
//       // Create a record of the item being added to the character's inventory.
//       const data = await prisma.itemCharacter.create({
//         data: {
//           characterId: Number(req.body.characterId),
//           itemId: Number(req.body.itemId),
//         },
//       });
  
//       // Return a success response with relevant data.
//       return res.status(200).json({ data: data, updatedCharacter: updatedCharacter, message: "Item added" });
//     } catch (error) {
//       // Handle any errors that occur during the process.
//       return res.status(500).json({ error: error.message });
//     }
//   };

export {sellItem}