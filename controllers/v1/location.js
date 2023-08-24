/**
 * Handles all location crelated endpoints
 */

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const getLocations = async (req, res) => {
    try{
        const locations = await prisma.location.findMany();
    }catch(e){
        return res.status(500).json({error: error.message});
    }
};

export {getLocations}