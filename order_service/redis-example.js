require("dotenv").config()

const  redis = require(  'redis');

const url = `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}`

async function connectRedis() {
    const client = redis.createClient({
        url
        //host: process.env.REDIS_HOST,
      
        //password: process.env.REDIS_PASSWORD,
       
        //database: 'restdb'
      });
    
      client.on('error', (err) => console.log('Redis Client Error', err));
    
      await client.connect();
      return client;
}
  
async function setCache(key, data) {
    const client = await connectRedis()
    client.set(key, JSON.stringify(data))
}

async function getCache(key) {
    const client = await connectRedis()
    const resp = await client.get(key)
    console.log("CAche is resp", resp)
    if (resp) {
        return JSON.parse(resp)
    }
}



async function delCache(key) {
    const client = await connectRedis()
    const resp = await client.del(key)
   
}


// add menus, reviews etc
// setCache("1111111111", {restaurent: {id: '1111111111'}} )

getCache("1111111111")

// delCache("1111111111")