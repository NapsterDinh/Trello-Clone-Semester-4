//library component
import { ObjectId } from "mongodb";

//user component
import { getDB } from "../config/mongodb";
import { validateSchema, cardCollectionName } from "../models/card.model";
import { columnCollectionName } from "../models/column.model";
import { ColumnService } from "./column.service";
import { uploadFile, getFileStream } from "../shares/s3";

const createNew = async (data) => {
  try {
    const { image, fileName } = data;
    const s3Image = await uploadFile(image, fileName);

    const validatedValue = await validateSchema(data);
    const insertValue = {
      ...validatedValue,
      boardId: ObjectId(validatedValue.boardId),
      columnId: ObjectId(validatedValue.columnId),
      image: s3Image?.Location,
    };
    console.log("++++123", insertValue);
    const result = await getDB()
      .collection(cardCollectionName)
      .insertOne(insertValue);

    console.log("++++123", result);
    if (result?.acknowledged) {
      await ColumnService.pushCardOrder(
        data.columnId,
        result.insertedId.toString()
      );
      return {
        result: true,
        msg: "Create column success",
        data: { ...result, ...validatedValue },
      };
    } else {
      return {
        result: false,
        msg: "Create column fail",
        data: [],
      };
    }
  } catch (error) {
    throw new Error(error);
  }
};

const update = async (data) => {
  try {
    const { _id, title, description, image } = data;
    await getDB()
      .collection(cardCollectionName)
      .updateOne(
        { _id: ObjectId(_id) },
        { $set: { title: title, description: description, image: image } }
      );

    const result = await getDB()
      .collection(cardCollectionName)
      .findOne({ _id: ObjectId(_id) });
    if (result) {
      return {
        result: true,
        msg: "Update column success",
        data: result,
      };
    } else {
      return {
        result: false,
        msg: "Update column fail",
        data: [],
      };
    }
  } catch (error) {
    throw new Error(error);
  }
};

const deleteCart = async (data) => {
  try {
    const { _id } = data;

    const findColumnId = await getDB()
      .collection(cardCollectionName)
      .findOne({ _id: ObjectId(_id) });

    const result = await getDB()
      .collection(cardCollectionName)
      .findOneAndDelete({ _id: ObjectId(_id) }, { returnOriginal: false });
    if (result?.value) {
      const result = await getDB()
        .collection(columnCollectionName)
        .updateOne(
          { _id: ObjectId(findColumnId?.columnId) },
          { $pull: { cardOrder: { $in: [_id] } } }
        );
      return {
        result: true,
        msg: "Delete cart success",
        data: result,
      };
    } else {
      return {
        result: false,
        msg: "Delete cart fail",
        data: [],
      };
    }
  } catch (error) {
    throw new Error(error);
  }
};

export const CardService = {
  createNew,
  update,
  deleteCart,
};
