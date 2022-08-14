import { Request, Response } from "express";
import Photo from "../models/Photo";
import path from "path";
import fs from "fs-extra";

export async function getPhotos(req: Request, res: Response): Promise<Response> {
   const photos = await Photo.find();
   return res.send({
      photos
   });
}

export async function getPhoto(req: Request, res: Response): Promise<Response> {
   const photo = await Photo.findById(req.params.id);
   return res.json(photo);
}

export async function createPhoto(req: Request, res: Response): Promise<Response> {
  const { title, description } = req.body;
  if(!req.file?.originalname.match(/\.(jpg|jpeg|png)$/)){
    return res.status(400).send({
      message: 'File type is not valid'
    });
  }else{
  const newPhoto = {
    title,
    description,
    imagePath:req.file?.path
  }

  const photo = new Photo(newPhoto);
  await photo.save();
  

  return res.json({ message: "Create photo success", photo });
}
}


export async function deletePhoto(req: Request, res: Response): Promise<Response> {
   const photo = await Photo.findByIdAndDelete(req.params.id);
   if(photo){
    await fs.unlink(path.resolve(photo.imagePath))
   }
    return res.json({ message: "Delete photo success" });


}

export async function updatePhoto(req: Request, res: Response): Promise<Response> {
    const { title, description } = req.body;
    const photo = await Photo.findByIdAndUpdate(req.params.id, {
        title,
        description
    }, { new: true });
    return res.json({ message: "Update photo success", photo });
}