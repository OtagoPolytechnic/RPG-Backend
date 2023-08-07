import axios from 'axios';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const seedBuilds = async (req, res) => {
  try{
    const data = await axios.get(
        'https://gist.githubusercontent.com/CalebStephens/87f26088808256115b04c0b8918b6412/raw/b0061455b5c0c9681e2eb51f813f91884dee6ea0/rpgRoles.json'
      );
      await prisma.build.createMany({ data: data.data });
      return res.status(200).json({data: data.data})
  }catch(error){
    return res.status(500).json({error: error.message});
  }
}

export default seedBuilds;