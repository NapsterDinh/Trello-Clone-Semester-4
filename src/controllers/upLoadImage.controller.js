import { cloud } from "../shares/upLoadImage";
import cloudinary from "cloudinary";

const upLoad = async (req, res) => {
  try {
    // console.log("báe64", req.body.abc);

    // Upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.body.abc);

    // const tmpFolderPath = path.resolve("tmp");
    // fs.rmdir(tmpFolderPath, function (err, data) {
    //   console.log(err);
    //   console.log(data);
    // });

    // const dir = "tmp";

    // // delete directory recursively
    // fs.rmdir(dir, { recursive: true }, (err) => {
    //   if (err) {
    //     console.log(err);
    //   }
    // });
    console.log("abc", result);
    res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const image = {
  upLoad,
};
