import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


// Create a new item
const createItem = async (req, res) => {
    try{
        // Extract the user id from the request
        const { id } = req.user;

        // Find the user using the extracted user id
        const user = await prisma.user.findUnique({ where: { id: Number(id) } });
        console.log()

        if(user.role !== 'SUPER_ADMIN'){
            return res.status(401).json({error: 'You are not authorized to create an item'});
        }

        const item = await prisma.item.create({
            data: { ...req.body }
        });

        return res.status(200).json({data: item});
    }catch(error){
        return res.status(500).json({error: error.message});
    }
}

// Get all items
const getAllItems = async (req, res) => {
    try{
    const data = await prisma.item.findMany();
    return res.status(200).json({data: data});
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
    try{
        const data = await prisma.itemChraracter.create({
            data: {
                characterId: Number(req.body.characterId),
                itemId: Number(req.body.itemId)
            }
        });
        return res.status(200).json({data: data});
    }catch(error){
        return res.status(500).json({error: error.message});
    }
}


export {createItem, getAllItems, characterItems, addItemToCharacter};