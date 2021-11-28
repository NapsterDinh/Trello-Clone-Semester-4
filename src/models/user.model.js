import Joi from "joi";
import { getDB } from "../config/mongodb";
import { ObjectId } from "mongodb";
import { ColumnModel } from "./column.model";
import { CardModel } from "./card.model";

//define board
export const userCollectionName = "user";
export const userCollectionSchema = Joi.object({
  name: Joi.string().required().min(5).max(20).trim(),
  email: Joi.string().required().trim(),
  password: Joi.string().required().min(6).trim(),
  avatar: Joi.string().default(
    "https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png"
  ),
  isEmailVerified: Joi.boolean().default(false),
  createAt: Joi.date().timestamp().default(Date.now()),
  updateAt: Joi.date().timestamp().default(null),
});

const validateSchema = async (data) => {
  return await userCollectionSchema.validateAsync(data, { abortEarly: false });
};

const creatNewUser = async (data) => {
  try {
    const value = await validateSchema(data);
    const result = await getDB()
      .collection(userCollectionName)
      .insertOne(value);
    return { ...result, ...value };
  } catch (error) {
    throw new Error(error);
  }
};

// const activationUser = async (data) => {
//   try {
//     const value = await validateSchema(data);
//     const result = await getDB().collection(userCollectionName);
//     findOneAndUpdate(
//       {
//         _id: sub,
//       },
//       {
//         isEmailVerified: true,
//       }
//     );
//     return result;
//   } catch (error) {
//     throw new Error(error);
//   }
// };

export const UserModel = {
  creatNewUser,
};
