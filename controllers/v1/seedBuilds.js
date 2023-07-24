import axios from 'axios';


const seedBuilds = async (req, res) => {
  

    const data = await axios.get(
        'https://gist.githubusercontent.com/CalebStephens/87f26088808256115b04c0b8918b6412/raw/f98ad5557a78be1087950606171770a54d2ba0f8/rpgRoles.json'
      );

      console.log(data)

}

export default seedBuilds;