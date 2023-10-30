/**
 * Handles all character related endpoints
 */

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const createCharacter = async (req, res) => {
  try {
    // Extract the user id from the request
    const { id } = req.user;
    const { buildId } = req.body;

    // const {buildId} = req.body.build;
    // Find the user using the extracted user id
    const user = await prisma.user.findUnique({ where: { id: Number(id) } });

    const build = await prisma.build.findUnique({ where: { id: Number(buildId) } });
    // Check if the user exists
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Create a new character associated with the user
    const player = await prisma.character.create({
      data: {
        name: req.body.name,
        gender: req.body.gender,
        stats: { ...build.stats },
        buildId: req.body.buildId,
        userId: user.id, // Assign the user id to the character
        locationId: 1,
        currency: 100,
        XP: 0,
      },
    });

    return res.status(200).json({ data: player });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getAllCharacters = async (req, res) => {
  try {
    // Extract the user id from the request
    const { id } = req.user;
    // Fetch all characters associated with the user
    const characters = await prisma.character.findMany({
      where: {
        userId: Number(id), // Filter characters by the user's id
      },
      include: {
        build: true, // Include the associated build data
      },
    });

    // Return the fetched characters' data
    return res.status(200).json({ data: characters });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getCharacter = async (req, res) => {
  try {
    // Fetch a character with the given name and associated with the user
    const character = await prisma.character.findUnique({
      where: {
        name: req.params.name,
      },
      include: {
        build: true,
      },
    });

    const { id } = req.user;
    if (character.userId !== Number(id)) {
      return res.status(401).json({ error: "You are not authorized to view this character" });
    }

    return res.status(200).json({ data: character });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Get all items for a character
const characterItems = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
      include: {
        characters: true,
      },
    });

    //check if the character belongs to the user
    const characterAvailable = user.characters.find((character) => character.id === Number(req.body.characterId));
    if (!characterAvailable) {
      return res.status(401).json({ error: "You are not authorized to view this character" });
    }

    const data = await prisma.itemCharacter.findMany({
      where: {
        characterId: Number(req.body.characterId),
      },
      select: {
        item: true,
      },
    });
    return res.status(200).json({ data: data });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const addItemToCharacter = async (req, res) => {
    try {
      const { id } = req.user;
      // Fetch the user from the database based on the user's ID.
      const user = await prisma.user.findUnique({
        where: { id: Number(id) },
        include: {
          characters: true,
        },
      });
      console.log(user);
      // Check if the character belongs to the user.
      const characterAvailable = user.characters.find((character) => character.id === Number(req.body.characterId));
      if (!characterAvailable) {
        return res.status(401).json({ error: "You are not authorized to view this character" });
      }
  
      // Fetch the character from the database based on the character ID.
      const character = await prisma.character.findUnique({
        where: {
          id: Number(req.body.characterId),
        },
      });
  
      // Fetch the item from the database based on the item ID.
      const item = await prisma.item.findUnique({
        where: {
          id: Number(req.body.itemId),
        },
      });
  
      // Check if the character has enough currency to purchase the item.
      if (character.currency < item.buyCost) {
        return res.status(400).json({ error: "Insufficient funds" });
      }
  
      // Update the character's currency after purchasing the item.
      const updatedCharacter = await prisma.character.update({
        where: {
          id: Number(req.body.characterId),
        },
        data: {
          currency: Number(character.currency - item.buyCost),
        },
      });
  
      // Create a record of the item being added to the character's inventory.
      const data = await prisma.itemCharacter.create({
        data: {
          characterId: Number(req.body.characterId),
          itemId: Number(req.body.itemId),
        },
      });
  
      // Return a success response with relevant data.
      return res.status(200).json({ data: data, updatedCharacter: updatedCharacter, message: "Item added" });
    } catch (error) {
      // Handle any errors that occur during the process.
      return res.status(500).json({ error: error.message });
    }
  };
  

const updateCharacter = async (req, res) => {
    try {
      const { id } = req.user;
      // Fetch the user from the database based on the user's ID.
      const user = await prisma.user.findUnique({
        where: { id: Number(id) },
        include: {
          characters: true,
        },
      });
  
      // Check if the character belongs to the user.
      const characterAvailable = user.characters.find((character) => character.id === Number(req.params.characterId));
      if (!characterAvailable) {
        return res.status(401).json({ error: "You are not authorized to view this character" });
      }
  
      // Fetch the character from the database based on the character ID.
      const character = await prisma.character.findUnique({
        where: {
          id: Number(req.params.characterId),
        },
      });
  
      if (!character) {
        return res.status(404).json({ error: "Character not found" });
      }
  
      // Destructure the request body into a data object.
      const { ...data } = req.body;
  
      // Define an array of fields that should not be updated.
      const noUpdate = ["id", "userId", "buildId", "gender", "name"];
      // Check if any of the disallowed fields are present in the update data.
      if (noUpdate.some((key) => Object.keys(data).includes(key))) {
        return res.status(400).json({ error: "A field you are trying to update is not allowed" });
      }
  
      // Update the character in the database.
      const updatedCharacter = await prisma.character.update({
        where: {
          id: Number(req.params.characterId),
        },
        data,
      });
  
      return res.json({
        msg: `${character.name} has been successfully updated`,
        data: updatedCharacter,
      });
    } catch (error) {
      // Handle any errors that occur during the process.
      return res.status(500).json({ error: error.message });
    }
  };
  

export { createCharacter, getAllCharacters, getCharacter, characterItems, addItemToCharacter, updateCharacter };
