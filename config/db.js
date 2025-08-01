import mongoose from "mongoose";

const connectdb = async() =>{
          try {
               const conne=await mongoose.connect(process.env.MONGO_URL) 
               console.log(`Mongodb connected ${mongoose.connection.host}`)    
          } catch (error) {
                console.log(`MOngoDb Error ${error} `)    
          }
}

export default connectdb;