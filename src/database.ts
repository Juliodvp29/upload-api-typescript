import mongoose from 'mongoose';

export async function connect(){
   await mongoose.connect('mongodb://localhost/galery-db');
    console.log("Database connected");
}