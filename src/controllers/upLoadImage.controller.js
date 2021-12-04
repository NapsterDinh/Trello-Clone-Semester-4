import { cloud } from "../shares/upLoadImage";
import cloudinary from "cloudinary";
import fs from "fs";

const upLoad = async (req, res) => {
  try {
    console.log("req", req.files.abc.tempFilePath);
    // Upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.files.abc.tempFilePath);

    // const tmpFolderPath = path.resolve("tmp");
    // fs.rmdir(tmpFolderPath, function (err, data) {
    //   console.log(err);
    //   console.log(data);
    // });

    const dir = "tmp";

    // delete directory recursively
    fs.rmdir(dir, { recursive: true }, (err) => {
      if (err) {
        console.log(err);
      }
    });
    res.json(result);
  } catch (err) {
    console.log(err);
  }
};

export const image = {
  upLoad,
};
