import { cloud } from "../shares/upLoadImage";
import cloudinary from "cloudinary";
const upLoad = async (req, res) => {
  try {
    console.log("req", req.files.abc.tempFilePath);
    // Upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.files.abc.tempFilePath);

    console.log(result);
    res.json(result);
  } catch (err) {
    console.log(err);
  }
};

export const image = {
  upLoad,
};
