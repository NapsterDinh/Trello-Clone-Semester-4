//library component
import { ObjectId } from "mongodb";

//user component
import { getDB } from "../config/mongodb";
import { cardCollectionName } from "../models/card.model";
import { columnCollectionName } from "../models/column.model";
import { boardCollectionName } from "../models/board.model";
import { validateSchema } from "../models/card.model";
import { ColumnService } from "./column.service";
import { BoardService } from "./board.service";
import { sendEmailUser } from "../shares/sendMail";
import { uploadFile, getFileStream } from "../shares/s3";
import { bigTaskService } from "./bigTask.service";
import { smallTaskService } from "./smallTask.service";

const createNew = async (data) => {
  try {
    // const { image, fileName } = data;
    // const s3Image = await uploadFile(image, fileName);

    // const insertValue = {
    //   ...validatedValue,
    //   boardId: ObjectId(validatedValue.boardId),
    //   columnId: ObjectId(validatedValue.columnId),
    //   image: s3Image?.Location,
    // };
    // console.log("++++123", insertValue);

    const isCheckUser = await getDB()
      .collection(boardCollectionName)
      .findOne({ _id: ObjectId(data?.body?.boardId) });

    if (isCheckUser?.userId.includes(data.user.sub)) {
      const userCreate = data.user.sub; // data.user.sub;
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
      await getDB()
        .collection(cardCollectionName)
        .updateOne(
          { _id: result?.insertedId },
          {
            $push: {
              userId: userCreate,
            },
          }
        );
      const result1 = await getDB()
        .collection(cardCollectionName)
        .findOne({ _id: result?.insertedId });

      if (result?.acknowledged) {
        await ColumnService.pushCardOrder(
          data.body.columnId,
          result.insertedId.toString()
        );
        return {
          result: true,
          msg: "Create cart success",
          data: { result1 },
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

const updateTitle = async (data) => {
  try {
    const { _id, title } = data.body;

    const isCheckUser = await getDB()
      .collection(cardCollectionName)
      .findOne({ _id: ObjectId(_id) });

    if (isCheckUser?.userCreate !== data.user.sub) {
      return {
        result: false,
        msg: "You is not permission update card ",
        data: [],
      };
    } else {
      await getDB()
        .collection(cardCollectionName)
        .updateOne({ _id: ObjectId(_id) }, { $set: { title: title } });

      const result = await getDB()
        .collection(cardCollectionName)
        .findOne({ _id: ObjectId(_id) });
      if (result) {
        return {
          result: true,
          msg: "Update cart success",
          data: result,
        };
      } else {
        return {
          result: false,
          msg: "Update cart fail",
          data: [],
        };
      }
    }
  } catch (error) {
    throw new Error(error);
  }
};

const updateDescription = async (data) => {
  try {
    const { _id, description } = data.body;

    const isCheckUser = await getDB()
      .collection(cardCollectionName)
      .findOne({ _id: ObjectId(_id) });

    if (isCheckUser?.userCreate !== data.user.sub) {
      return {
        result: false,
        msg: "You is not permission update card ",
        data: [],
      };
    } else {
      await getDB()
        .collection(cardCollectionName)
        .updateOne(
          { _id: ObjectId(_id) },
          { $set: { description: description } }
        );

      const result = await getDB()
        .collection(cardCollectionName)
        .findOne({ _id: ObjectId(_id) });
      if (result) {
        return {
          result: true,
          msg: "Update cart success",
          data: result,
        };
      } else {
        return {
          result: false,
          msg: "Update cart fail",
          data: [],
        };
      }
    }
  } catch (error) {
    throw new Error(error);
  }
};

const updateImage = async (data) => {
  try {
    const { _id, image } = data.body;

    const isCheckUser = await getDB()
      .collection(cardCollectionName)
      .findOne({ _id: ObjectId(_id) });

    if (isCheckUser?.userCreate !== data.user.sub) {
      return {
        result: false,
        msg: "You is not permission update card ",
        data: [],
      };
    } else {
      await getDB()
        .collection(cardCollectionName)
        .updateOne({ _id: ObjectId(_id) }, { $set: { image: image } });

      const result = await getDB()
        .collection(cardCollectionName)
        .findOne({ _id: ObjectId(_id) });
      if (result) {
        return {
          result: true,
          msg: "Update cart success",
          data: result,
        };
      } else {
        return {
          result: false,
          msg: "Update cart fail",
          data: [],
        };
      }
    }
  } catch (error) {
    throw new Error(error);
  }
};

const updateAttachment = async (data) => {
  try {
    const { _id, attachment } = data.body;

    const isCheckUser = await getDB()
      .collection(cardCollectionName)
      .findOne({ _id: ObjectId(_id) });

    if (isCheckUser?.userCreate !== data.user.sub) {
      return {
        result: false,
        msg: "You is not permission update card ",
        data: [],
      };
    } else {
      const removeItem = await getDB()
        .collection(cardCollectionName)
        .findOne({ _id: ObjectId(_id) });

      const removeAttachment = removeItem?.attachment.splice(
        0,
        removeItem?.attachment.length
      );

      await getDB()
        .collection(cardCollectionName)
        .updateOne(
          { _id: ObjectId(_id) },
          { $pull: { attachment: { $in: removeAttachment } } }
        );
      await getDB()
        .collection(cardCollectionName)
        .updateOne(
          { _id: ObjectId(_id) },
          { $push: { attachment: { $each: attachment } } }
        );

      const result = await getDB()
        .collection(cardCollectionName)
        .findOne({ _id: ObjectId(_id) });
      if (result) {
        return {
          result: true,
          msg: "Update cart success",
          data: result,
        };
      } else {
        return {
          result: false,
          msg: "Update cart fail",
          data: [],
        };
      }
    }
  } catch (error) {
    throw new Error(error);
  }
};

const updateDate = async (data) => {
  try {
    const { _id, dateTime } = data.body;

    const isCheckUser = await getDB()
      .collection(cardCollectionName)
      .findOne({ _id: ObjectId(_id) });

    if (isCheckUser?.userCreate !== data.user.sub) {
      return {
        result: false,
        msg: "You is not permission update card ",
        data: [],
      };
    } else {
      await getDB()
        .collection(cardCollectionName)
        .updateOne(
          { _id: ObjectId(_id) },
          { $set: { deadline: Date.parse(dateTime) } }
        );

      const result = await getDB()
        .collection(cardCollectionName)
        .findOne({ _id: ObjectId(_id) });
      if (result) {
        return {
          result: true,
          msg: "Update cart success",
          data: result,
        };
      } else {
        return {
          result: false,
          msg: "Update cart fail",
          data: [],
        };
      }
    }
  } catch (error) {
    throw new Error(error);
  }
};

const updateExpire = async (_id) => {
  try {
    console.log("_id", _id);
    await getDB()
      .collection(cardCollectionName)
      .updateOne({ _id: _id }, { $set: { _isExpired: true } });
  } catch (error) {
    throw new Error(error);
  }
};

const updateColor = async (data) => {
  try {
    const { _id, color } = data.body;

    const isCheckUser = await getDB()
      .collection(cardCollectionName)
      .findOne({ _id: ObjectId(_id) });

    if (isCheckUser?.userCreate !== data?.user?.sub) {
      return {
        result: false,
        msg: "You is not permission update card ",
        data: [],
      };
    } else {
      await getDB()
        .collection(cardCollectionName)
        .updateOne({ _id: ObjectId(_id) }, { $set: { color: color } });

      const result = await getDB()
        .collection(cardCollectionName)
        .findOne({ _id: ObjectId(_id) });
      if (result) {
        return {
          result: true,
          msg: "Update cart success",
          data: result,
        };
      } else {
        return {
          result: false,
          msg: "Update cart fail",
          data: [],
        };
      }
    }
  } catch (error) {
    throw new Error(error);
  }
};

const updateStatus = async (_id, status) => {
  try {
    console.log("_id", _id);
    await getDB()
      .collection(cardCollectionName)
      .updateOne({ _id: _id }, { $set: { status: status } });
  } catch (error) {
    throw new Error(error);
  }
};

const updatePercentageCard = async (_id, percentage) => {
  try {
    await getDB()
      .collection(cardCollectionName)
      .updateOne({ _id: _id }, { $set: { percentage: percentage } });
  } catch (error) {
    throw new Error(error);
  }
};

const deleteCart = async (data) => {
  try {
    const { _id } = data.query;

    const isCheckUser = await getDB()
      .collection(cardCollectionName)
      .findOne({ _id: ObjectId(_id) });

    if (isCheckUser?.userCreate !== data?.user?.sub) {
      return {
        result: false,
        msg: "You is not permission detele card ",
        data: [],
      };
    } else {
      const result = await getDB()
        .collection(cardCollectionName)
        .findOneAndDelete({ _id: ObjectId(_id) }, { returnOriginal: false });
      if (result?.value) {
        const result = await getDB()
          .collection(columnCollectionName)
          .updateOne(
            { _id: isCheckUser?.columnId },
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
    }
  } catch (error) {
    throw new Error(error);
  }
};

const addUserToCart = async (data) => {
  try {
    const { _id, listUser } = data.body;

    const isCheckUser = await getDB()
      .collection(cardCollectionName)
      .findOne({ _id: ObjectId(_id) });

    if (isCheckUser?.userCreate !== data?.user?.sub) {
      return {
        result: false,
        msg: "You is not permission add user card ",
        data: [],
      };
    } else {
      const getUser = await BoardService.getUserByEmail(listUser);
      const iduser = [];
      getUser.map((u) => iduser.push(u._id.toString()));

      const result = await getDB()
        .collection(cardCollectionName)
        .findOneAndUpdate(
          { _id: ObjectId(_id) },
          {
            $push: { userId: { $each: iduser } },
          },
          { returnOriginal: false }
        );
      console.log("result", result);
      if (result?.value) {
        const mess = `You have been add ${result.value.title}`;
        listUser.map((e) => sendEmailUser(e, mess));
        return {
          result: true,
          msg: "Add user into cart success",
          data: result?.value,
        };
      } else {
        return { result: false, msg: "Remove user into cart fail", data: [] };
      }
    }
  } catch (error) {
    throw new Error(error);
  }
};

const removeUserToCart = async (data) => {
  try {
    const { _id, listUser } = data.body;

    const isCheckUser = await getDB()
      .collection(cardCollectionName)
      .findOne({ _id: ObjectId(_id) });

    if (isCheckUser?.userCreate !== data?.user?.sub) {
      return {
        result: false,
        msg: "You is not permission remove user card ",
        data: [],
      };
    } else {
      const getUser = await BoardService.getUserByEmail(listUser);
      const iduser = [];
      getUser.map((u) => iduser.push(u._id.toString()));

      const result = await getDB()
        .collection(cardCollectionName)
        .findOneAndUpdate(
          { _id: ObjectId(_id) },
          {
            $pull: { userId: { $in: iduser } },
          },
          { returnOriginal: false }
        );
      console.log("result", result);
      if (result?.value) {
        const mess = `You have been remove ${result.value.title}`;
        listUser.map((e) => sendEmailUser(e, mess));
        return {
          result: true,
          msg: "Remove user into cart success",
          data: result?.value,
        };
      } else {
        return { result: false, msg: "Remove user into cart fail", data: [] };
      }
    }
  } catch (error) {
    throw new Error(error);
  }
};

const getCardById = async (data) => {
  try {
    const { _id } = data.query;

    const isCheckUser = await getDB()
      .collection(cardCollectionName)
      .findOne({ _id: ObjectId(_id) });

    if (isCheckUser?.userId.includes("61a1a97933d4478e2b2d3092")) {
      //data?.query?.userCreate
      let smallTask1;

      const objectIdArray = isCheckUser?.bigTaskOrder.map((s) => ObjectId(s));
      const listBigTAsk = await bigTaskService.getBigTaskById(objectIdArray);
      let totallength = [];
      let total = [];
      const abc = await Promise.all(
        listBigTAsk.map(async (small) => {
          console.log("----", small.smallStaskOrder);
          let cal = await smallTaskService.getSmallTaskById(
            small.smallStaskOrder.map((s) => ObjectId(s))
          );
          let totalDone = 0;

          let C = cal.map(function (e) {
            if (e.isDone) {
              totalDone++;
            }
          });

          await bigTaskService.updatePercentage(
            small?._id,
            totalDone / C.length
          );
          totallength.push(C.length);
          total.push(totalDone);
          return cal;
        })
      );
      smallTask1 = abc;

      const lengthTask = totallength.reduce((a, b) => a + b, 0);
      const taskDone = total.reduce((a, b) => a + b, 0);

      return {
        result: true,
        msg: "Get task into cart ",
        data: { smallTask1, lengthTask, taskDone },
      };
    }
  } catch (error) {
    throw new Error(error);
  }
};

export const CardService = {
  createNew,
  updateTitle,
  updateDescription,
  updateImage,
  updateAttachment,
  updateDate,
  updateExpire,
  updateColor,
  updateStatus,
  deleteCart,
  addUserToCart,
  removeUserToCart,
  getCardById,
  updatePercentageCard,
};
