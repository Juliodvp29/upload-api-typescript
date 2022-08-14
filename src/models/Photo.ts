import {model, Document, Schema} from 'mongoose';

const schema = new Schema({
    title: String,
    description: String,
    imagePath: String,
    url: String,

})

interface IPhoto extends Document {
    title: string;
    description: string;
    imagePath: string;
    url: string;
}

export default model<IPhoto>('Photo', schema);