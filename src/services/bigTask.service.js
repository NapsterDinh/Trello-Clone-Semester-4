//library component
import { ObjectId } from "mongodb";

//user component
import { getDB } from "../config/mongodb";
import { bigTaskCollectionName } from "../models/bigTast.model";
import { columnCollectionName } from "../models/column.model";
import { boardCollectionName } from "../models/board.model";
import { ColumnService } from "./column.service";
import { BoardService } from "./board.service";
import { uploadFile, getFileStream } from "../shares/s3";
import { validateSchema } from "../models/card.model";

const createBigTask = async (data) => {
  try {
    const isCheckUser = await getDB()
      .collection(boardCollectionName)
      .findOne({ _id: ObjectId(data?.body?.boardId) });

    if (isCheckUser?.userId.includes(data?.user?.sub)) {
      const userCreate = data.user.sub;
      const addData = { ...data.body, ...{ userCreate } };
      const value = await validateSchema(addData);

      const insertValue = {
        ...value,
        boardId: ObjectId(value.boardId),
        columnId: ObjectId(value.columnId),
      };

      // const insertValue = {
      //   ...validatedValue,
      //   boardId: ObjectId(validatedValue.boardId),
      //   columnId: ObjectId(validatedValue.columnId),
      //   image: s3Image?.Location,
      // };
      // console.log("++++123", insertValue);
      const result = await getDB()
        .collection(cardCollectionName)
        .insertOne(insertValue);
      if (result?.acknowledged) {
        await ColumnService.pushCardOrder(
          data.body.columnId,
          result.insertedId.toString()
        );
        return {
          result: true,
          msg: "Create cart success",
          data: { ...result, ...addData },
        };
      } else {
        return {
          result: false,
          msg: "Create cart fail",
          data: [],
        };
      }
    } else {
      return {
        result: false,
        msg: "You is not permission create card ",
        data: [],
      };
    }
  } catch (error) {
    throw new Error(error);
  }
};

// const updateTitle = async (data) => {
//   try {
//     const { _id, title } = data.body;

//     const isCheckUser = await getDB()
//       .collection(cardCollectionName)
//       .findOne({ _id: ObjectId(_id) });

//     if (isCheckUser?.userCreate !== data.user.sub) {
//       return {
//         result: false,
//         msg: "You is not permission update card ",
//         data: [],
//       };
//     } else {
//       await getDB()
//         .collection(cardCollectionName)
//         .updateOne({ _id: ObjectId(_id) }, { $set: { title: title } });

//       const result = await getDB()
//         .collection(cardCollectionName)
//         .findOne({ _id: ObjectId(_id) });
//       if (result) {
//         return {
//           result: true,
//           msg: "Update cart success",
//           data: result,
//         };
//       } else {
//         return {
//           result: false,
//           msg: "Update cart fail",
//           data: [],
//         };
//       }
//     }
//   } catch (error) {
//     throw new Error(error);
//   }
// };

// const updateDescription = async (data) => {
//   try {
//     const { _id, description } = data.body;

//     const isCheckUser = await getDB()
//       .collection(cardCollectionName)
//       .findOne({ _id: ObjectId(_id) });

//     if (isCheckUser?.userCreate !== data.user.sub) {
//       return {
//         result: false,
//         msg: "You is not permission update card ",
//         data: [],
//       };
//     } else {
//       await getDB()
//         .collection(cardCollectionName)
//         .updateOne(
//           { _id: ObjectId(_id) },
//           { $set: { description: description } }
//         );

//       const result = await getDB()
//         .collection(cardCollectionName)
//         .findOne({ _id: ObjectId(_id) });
//       if (result) {
//         return {
//           result: true,
//           msg: "Update cart success",
//           data: result,
//         };
//       } else {
//         return {
//           result: false,
//           msg: "Update cart fail",
//           data: [],
//         };
//       }
//     }
//   } catch (error) {
//     throw new Error(error);
//   }
// };

// const updateImage = async (data) => {
//   try {
//     const { _id, image } = data.body;

//     const isCheckUser = await getDB()
//       .collection(cardCollectionName)
//       .findOne({ _id: ObjectId(_id) });

//     if (isCheckUser?.userCreate !== data.user.sub) {
//       return {
//         result: false,
//         msg: "You is not permission update card ",
//         data: [],
//       };
//     } else {
//       await getDB()
//         .collection(cardCollectionName)
//         .updateOne({ _id: ObjectId(_id) }, { $set: { image: image } });

//       const result = await getDB()
//         .collection(cardCollectionName)
//         .findOne({ _id: ObjectId(_id) });
//       if (result) {
//         return {
//           result: true,
//           msg: "Update cart success",
//           data: result,
//         };
//       } else {
//         return {
//           result: false,
//           msg: "Update cart fail",
//           data: [],
//         };
//       }
//     }
//   } catch (error) {
//     throw new Error(error);
//   }
// };

// const updateAttachment = async (data) => {
//   try {
//     const { _id, attachment } = data.body;

//     const isCheckUser = await getDB()
//       .collection(cardCollectionName)
//       .findOne({ _id: ObjectId(_id) });

//     if (isCheckUser?.userCreate !== data.user.sub) {
//       return {
//         result: false,
//         msg: "You is not permission update card ",
//         data: [],
//       };
//     } else {
//       const removeItem = await getDB()
//         .collection(cardCollectionName)
//         .findOne({ _id: ObjectId(_id) });

//       const removeAttachment = removeItem?.attachment.splice(
//         0,
//         removeItem?.attachment.length
//       );

//       await getDB()
//         .collection(cardCollectionName)
//         .updateOne(
//           { _id: ObjectId(_id) },
//           { $pull: { attachment: { $in: removeAttachment } } }
//         );
//       await getDB()
//         .collection(cardCollectionName)
//         .updateOne(
//           { _id: ObjectId(_id) },
//           { $push: { attachment: { $each: attachment } } }
//         );

//       const result = await getDB()
//         .collection(cardCollectionName)
//         .findOne({ _id: ObjectId(_id) });
//       if (result) {
//         return {
//           result: true,
//           msg: "Update cart success",
//           data: result,
//         };
//       } else {
//         return {
//           result: false,
//           msg: "Update cart fail",
//           data: [],
//         };
//       }
//     }
//   } catch (error) {
//     throw new Error(error);
//   }
// };

// const updateDate = async (data) => {
//   try {
//     const { _id, dateTime } = data.body;

//     const isCheckUser = await getDB()
//       .collection(cardCollectionName)
//       .findOne({ _id: ObjectId(_id) });

//     if (isCheckUser?.userCreate !== data.user.sub) {
//       return {
//         result: false,
//         msg: "You is not permission update card ",
//         data: [],
//       };
//     } else {
//       await getDB()
//         .collection(cardCollectionName)
//         .updateOne(
//           { _id: ObjectId(_id) },
//           { $set: { deadline: Date.parse(dateTime) } }
//         );

//       const result = await getDB()
//         .collection(cardCollectionName)
//         .findOne({ _id: ObjectId(_id) });
//       if (result) {
//         return {
//           result: true,
//           msg: "Update cart success",
//           data: result,
//         };
//       } else {
//         return {
//           result: false,
//           msg: "Update cart fail",
//           data: [],
//         };
//       }
//     }
//   } catch (error) {
//     throw new Error(error);
//   }
// };

// const updateExpire = async (_id) => {
//   try {
//     console.log("_id", _id);
//     await getDB()
//       .collection(cardCollectionName)
//       .updateOne({ _id: _id }, { $set: { _isExpired: true } });
//   } catch (error) {
//     throw new Error(error);
//   }
// };

// const updateColor = async (data) => {
//   try {
//     const { _id, color } = data.body;

//     const isCheckUser = await getDB()
//       .collection(cardCollectionName)
//       .findOne({ _id: ObjectId(_id) });

//     if (isCheckUser?.userCreate !== data?.user?.sub) {
//       return {
//         result: false,
//         msg: "You is not permission update card ",
//         data: [],
//       };
//     } else {
//       await getDB()
//         .collection(cardCollectionName)
//         .updateOne({ _id: ObjectId(_id) }, { $set: { color: color } });

//       const result = await getDB()
//         .collection(cardCollectionName)
//         .findOne({ _id: ObjectId(_id) });
//       if (result) {
//         return {
//           result: true,
//           msg: "Update cart success",
//           data: result,
//         };
//       } else {
//         return {
//           result: false,
//           msg: "Update cart fail",
//           data: [],
//         };
//       }
//     }
//   } catch (error) {
//     throw new Error(error);
//   }
// };

// const updateStatus = async (_id, status) => {
//   try {
//     console.log("_id", _id);
//     await getDB()
//       .collection(cardCollectionName)
//       .updateOne({ _id: _id }, { $set: { status: status } });
//   } catch (error) {
//     throw new Error(error);
//   }
// };

// const deleteCart = async (data) => {
//   try {
//     const { _id } = data;

//     const findColumnId = await getDB()
//       .collection(cardCollectionName)
//       .findOne({ _id: ObjectId(_id) });

//     const result = await getDB()
//       .collection(cardCollectionName)
//       .findOneAndDelete({ _id: ObjectId(_id) }, { returnOriginal: false });
//     if (result?.value) {
//       const result = await getDB()
//         .collection(columnCollectionName)
//         .updateOne(
//           { _id: ObjectId(findColumnId?.columnId) },
//           { $pull: { cardOrder: { $in: [_id] } } }
//         );
//       return {
//         result: true,
//         msg: "Delete cart success",
//         data: result,
//       };
//     } else {
//       return {
//         result: false,
//         msg: "Delete cart fail",
//         data: [],
//       };
//     }
//   } catch (error) {
//     throw new Error(error);
//   }
// };

export const bigTaskService = {
  createBigTask,
};
