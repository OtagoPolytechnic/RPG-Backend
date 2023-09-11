/**
 * Handles all character related endpoints
 */

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const createCharacter = async (req, res) => {
    try{
        // Extract the user id from the request
        const { id } = req.user;
        const {buildId} = req.body;

       // const {buildId} = req.body.build;
        // Find the user using the extracted user id
        const user = await prisma.user.findUnique({ where: { id: Number(id) } });

        const build = await prisma.build.findUnique({ where: { id: Number(buildId)  } });
         // Check if the user exists
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Create a new character associated with the user
        const player = await prisma.character.create({
            data: {
                name: req.body.name,
                gender: req.body.gender,
                stats: {...build.stats},
                buildId: req.body.buildId,
                userId: user.id, // Assign the user id to the character
                locationId: 1
            },});

        return res.status(200).json({data: player});
    }catch(error){
        return res.status(500).json({error: error.message});
    }

}

const getAllCharacters = async (req, res) => {

    try{
        // Extract the user id from the request
        const {id} = req.user;
        // Fetch all characters associated with the user
        const characters = await prisma.character.findMany({
            where: {
                userId: Number(id)// Filter characters by the user's id
            },
            include: {
                build: true // Include the associated build data
            }
        });
        
        // Return the fetched characters' data
        return res.status(200).json({data: characters});
    }catch(error){
        return res.status(500).json({error: error.message});
    }
}

const getCharacter = async (req, res) => {
    try{
        // Extract the user id from the request
        const {id} = req.user;
        // Fetch a character with the given name and associated with the user
        const character = await prisma.character.findUnique({
            where: {
                name: req.params.name,//Character's name from the request parameter
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

// Get all items for a character
const characterItems = async (req, res) => {
    try{
        const {id} = req.user;
        const user = await prisma.user.findUnique({ where: { id: Number(id) },
        include: {
            characters: true
        }
         });
         
         //check if the character belongs to the user
         const characterAvailable = user.characters.find(character => character.id === Number(req.body.characterId));
         if(!characterAvailable){
                return res.status(401).json({error: 'You are not authorized to view this character'});
         }
            
        
        const data = await prisma.itemChraracter.findMany({
            where: {
                characterId: Number(req.body.characterId)
            },
            select: {
                item: true
            }

        });
        return res.status(200).json({data: data});
    }catch(error){
        return res.status(500).json({error: error.message});
    }
}

// Add an item to a character
const addItemToCharacter = async (req, res) => {
  try {
    const data = await prisma.itemChraracter.create({
      data: {
        characterId: Number(req.body.characterId),
        itemId: Number(req.body.itemId),
      },
    });
    return res.status(200).json({ data: data });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export { createCharacter, getAllCharacters, getCharacter, characterItems, addItemToCharacter };
