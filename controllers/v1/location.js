/**
 * Handles all location crelated endpoints
 */

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const getLocations = async (req, res) => {
    try{
        const locations = await prisma.location.findMany();
        return res.status(200).json({data: locations});
        
    }catch(e){
        return res.status(500).json({error: error.message});
    }
};

const getLocation = async (req, res) => {
    try{
        const locationId = req.params.id;
        
        const location = await prisma.location.findUnique({where: {id: Number(locationId)}});
        console.log(location);
        return res.status(200).json({data: location});

    }catch(e){
        return res.status(500).json({error: e.message});
    }
};

export {getLocations, getLocation}