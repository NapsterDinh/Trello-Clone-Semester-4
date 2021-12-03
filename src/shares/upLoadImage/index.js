// const cloudinary = require("cloudinary").v2;
import cloudinary from "cloudinary";
cloudinary.v2;
export const cloud = cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// export const upLoad = async (data) => {
//   try {
//     const result = await cloudinary.uploader.upload(data);
//     return result;
//   } catch (err) {
//     console.log(err);
//   }
// };
