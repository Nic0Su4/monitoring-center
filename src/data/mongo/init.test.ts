import mongoose from "mongoose";
import { MongoDatabase } from "./init";

describe('init MongoDB', () => {

  afterAll(async () => {
    mongoose.connection.close();
  });
  
  test('should connect to mongoDB', async () => {
    
    const connected = await MongoDatabase.connect({
      dbName: process.env.MONGO_DB_NAME!,
      mongoUrl: process.env.MONGO_URL!,
    })

    expect(connected).toBeTruthy();

  });

  test('should throw an error', async () => {

    try {
      const connected = await MongoDatabase.connect({
        dbName: process.env.MONGO_DB_NAME!,
        mongoUrl: 'mongodb://nicolas:123456@localhost:27017/NOC-TEST-ERROR',
      })
      expect(true).toBe(false);
      
    } catch (error) {
      
    }


  })

})