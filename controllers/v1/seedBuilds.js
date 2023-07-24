import axios from 'axios';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const seedBuilds = async (req, res) => {
  try{
    const data = await axios.get(
        'https://gist.githubusercontent.com/CalebStephens/87f26088808256115b04c0b8918b6412/raw/d6326f3c471bb16c884045406b2a851056569106/rpgRoles.json'
      );
      await prisma.build.createMany({ data: data.data });
      return res.status(200).json({data: data.data})
  }catch(error){
    return res.status(500).json({error: error.message});
  }

    

}

export default seedBuilds;