//Library component
import { ObjectId } from "mongodb";

//user component
import { getDB } from "../config/mongodb";
import { boardCollectionName, validateSchema } from "../models/board.model";
import { workSpaceCollectionName } from "../models/workSpace.model";
import { columnCollectionName } from "../models/column.model";
import { cardCollectionName } from "../models/card.model";
import { userCollectionName } from "../models/user.model";
import { sendEmailUser } from "../shares/sendMail";
import { userService } from "./user.service";

const createNew = async (data) => {
  try {
    const userCreate = data?.user?.sub;
    const isCheckUserCreateWP = await getDB()
      .collection(workSpaceCollectionName)
      .findOne({ userCreate: data?.user.sub });
    if (!isCheckUserCreateWP) {
      return {
        result: false,
        msg: "You is not permission update board ",
        data: [],
      };
    } else {
      const value = await validateSchema(data?.body);
      const result = await getDB()
        .collection(boardCollectionName)
        .insertOne(value);
      await getDB()
        .collection(boardCollectionName)
        .updateOne(
          { _id: result?.insertedId },
          {
            $push: {
              userId: userCreate,
            },
          }
        );
      if (result?.acknowledged) {
        await getDB()
          .collection(workSpaceCollectionName)
          .update(
            { _id: ObjectId(data?.body?.workSpaceId) },
            {
              $push: {
                boardId: result?.insertedId.toString(),
              },
            }
          );
        return {
          result: true,
          msg: "Create board success",
          data: { ...result, ...value },
        };
      } else {
        return {
          result: false,
          msg: "Create board fail",
          data: [],
        };
      }
    }
  } catch (error) {
    throw new Error(error);
  }
};

const refBoard = async (boardId) => {
  try {
    console.log("data", boardId);
    const result = await getDB()
      .collection(boardCollectionName)
      .aggregate([
        {
          $match: {
            _id: ObjectId(boardId),
          },
        },
        {
          $lookup: {
            from: columnCollectionName, //collection name
            localField: "_id",
            foreignField: "boardId",
            as: "columns",
          },
        },
        {
          $lookup: {
            from: cardCollectionName, //collection name
            localField: "_id",
            foreignField: "boardId",
            as: "cards",
          },
        },
      ])
      .toArray();

    console.log("result", result);

    return result[0] || {};
  } catch (error) {
    throw new Error(error);
  }
};

const getFullBoard = async (data) => {
  try {
    const isCheckUser = await getDB()
      .collection(boardCollectionName)
      .findOne({ _id: ObjectId(data?.query?.boardId) });
    const isCheckUserCreateWP = await getDB()
      .collection(workSpaceCollectionName)
      .findOne({ _id: ObjectId(isCheckUser?.workSpaceId) });

    if (
      isCheckUser?.userId.includes(data?.userId) ||
      isCheckUserCreateWP?.userCreate === data?.user?.sub
    ) {
      const board = await refBoard(data?.query?.boardId);
      if (!board || !board.columns) {
        throw new Error("Board not found");
      }
      //create cards in column
      board.columns.forEach((column) => {
        column.cards = board.cards.filter(
          (c) => c.columnId.toString() === column._id.toString()
        );
      });
      //delete card in board
      delete board.cards;

      return {
        result: true,
        msg: "Create board success",
        data: board,
      };
    } else {
      return {
        result: false,
        msg: "You is not permission access board ",
        data: [],
      };
    }
  } catch (error) {
    throw new Error(error);
  }
};

const getBoardById = async (data) => {
  try {
    const getBoard = await getDB()
      .collection(boardCollectionName)
      .find({ workSpaceId: data })
      .toArray();

    return getBoard;
  } catch (error) {
    throw new Error(error);
  }
};

const updateBoard = async (data) => {
  try {
    const { _id, title, userId } = data.body;

    const isCheckUser = await getDB()
      .collection(boardCollectionName)
      .findOne({ _id: ObjectId(_id) });
    const isCheckUserCreateWP = await getDB()
      .collection(workSpaceCollectionName)
      .findOne({ _id: ObjectId(isCheckUser?.workSpaceId) });

    if (isCheckUserCreateWP?.userCreate !== data?.user.sub) {
      return {
        result: false,
        msg: "You is not permission update board ",
        data: [],
      };
    } else {
      await getDB()
        .collection(boardCollectionName)
        .update(
          { _id: ObjectId(_id) },
          {
            $set: { title },
          }
        );
      const result = await getDB()
        .collection(boardCollectionName)
        .findOne({ _id: ObjectId(_id) });

      if (result) {
        return { result: true, msg: "Update board success", data: result };
      } else {
        return { result: false, msg: "Update board fail", data: [] };
      }
    }
  } catch (error) {
    throw new Error(error);
  }
};

const deleteBoard = async (data) => {
  try {
    const isCheckUserCreateWP = await getDB()
      .collection(workSpaceCollectionName)
      .findOne({ userCreate: data?.user.sub });
    if (!isCheckUserCreateWP) {
      return {
        result: false,
        msg: "You is not permission delete board ",
        data: [],
      };
    } else {
      const findWorkSpaceId = await getDB()
        .collection(boardCollectionName)
        .findOne({ _id: ObjectId(data?.body?._id) });

      const result = await getDB()
        .collection(boardCollectionName)
        .findOneAndDelete(
          { _id: ObjectId(data?.body?._id) },
          { returnOriginal: false }
        );
      if (result) {
        await getDB()
          .collection(workSpaceCollectionName)
          .updateOne(
            { _id: ObjectId(findWorkSpaceId?.workSpaceId) },
            { $pull: { boardId: { $in: [data?.body?._id] } } }
          );
        return { result: true, msg: "Delete board success", data: result };
      } else {
        return { result: false, msg: "Delete board fail", data: [] };
      }
    }
  } catch (error) {
    throw new Error(error);
  }
};

const getUserByEmail = async (data) => {
  const resultUser = await getDB()
    .collection(userCollectionName)
    .find({ email: { $in: data } })
    .toArray();

  return resultUser;
};

const addUserToBoard = async (data) => {
  try {
    const isCheckUserCreateWP = await getDB()
      .collection(workSpaceCollectionName)
      .findOne({ userCreate: data?.user.sub });
    if (!isCheckUserCreateWP) {
      return {
        result: false,
        msg: "You is not permission add user to board ",
        data: [],
      };
    } else {
      const { _id, userId } = data?.body;
      const getUser = await getUserByEmail(userId);
      const iduser = [];
      getUser.map((u) => iduser.push(u._id.toString()));

      const result = await getDB()
        .collection(boardCollectionName)
        .findOneAndUpdate(
          { _id: ObjectId(_id) },
          {
            $push: { userId: { $each: iduser } },
          },
          { returnOriginal: false }
        );

      if (result) {
        const mess = `You have been add ${result.value.title}`;
        userId.map((e) => sendEmailUser(e, mess));
        return {
          result: true,
          msg: "Add user into board success",
          data: result,
        };
      } else {
        return { result: false, msg: "Remove user into board fail", data: [] };
      }
    }
  } catch (error) {
    throw new Error(error);
  }
};

const removeUserToBoard = async (data) => {
  try {
    const isCheckUserCreateWP = await getDB()
      .collection(workSpaceCollectionName)
      .findOne({ userCreate: data?.user?.sub });

    if (!isCheckUserCreateWP) {
      return {
        result: false,
        msg: "You is not permission remove user to board",
        data: [],
      };
    } else {
      const { _id, userId } = data;
      const getUser = await getUserByEmail(userId);
      const iduser = [];
      getUser.map((u) => iduser.push(u._id.toString()));

      const result = await getDB()
        .collection(boardCollectionName)
        .findOneAndUpdate(
          { _id: ObjectId(_id) },
          {
            $pull: { userId: { $in: iduser } },
          },
          { returnOriginal: false }
        );

      if (result?.value) {
        const mess = `You have been remove ${result.value.title}`;
        userId.map((e) => sendEmailUser(e, mess));
        return {
          result: true,
          msg: "Remove user into board success",
          data: result?.value,
        };
      } else {
        return { result: false, msg: "Remove user into board fail", data: [] };
      }
    }
  } catch (error) {
    throw new Error(error);
  }
};

const pushColumnOrder = async (boardId, columnId) => {
  try {
    await getDB()
      .collection(boardCollectionName)
      .update(
        { _id: ObjectId(boardId) },
        {
          $push: {
            columnOrder: columnId,
          },
        }
      );
    const result = await getDB()
      .collection(boardCollectionName)
      .findOne({ _id: ObjectId(boardId) });
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const listUserBoard = async (data) => {
  try {
    const { _id, userCreate } = data.query;
    const isCheckUserCreateWP = await getDB()
      .collection(workSpaceCollectionName)
      .findOne({ userCreate: userCreate }); // data?.user?.sub

    if (isCheckUserCreateWP?.userCreate !== userCreate) {
      return {
        result: false,
        msg: "You is not permission seem user to board",
        data: [],
      };
    } else {
      const getBoard = await getDB()
        .collection(boardCollectionName)
        .findOne({ _id: ObjectId(_id) });

      const getUserWP = await getDB()
        .collection(workSpaceCollectionName)
        .findOne({ _id: ObjectId(getBoard?.workSpaceId) });

      const listIdUserNotBoard = getUserWP?.userId.filter(
        (item) => !getBoard?.userId.includes(item)
      );

      const itemObject = listIdUserNotBoard.map((s) => ObjectId(s));
      const userObject = getBoard?.userId.map((s) => ObjectId(s));

      const listNotUserBoard = await userService.getUserById(itemObject);
      const listUserBoard = await userService.getUserById(userObject);

      return {
        result: true,
        msg: "List user into board success",
        data: { listUserBoard, listNotUserBoard },
      };
    }
  } catch (error) {
    throw new Error(error);
  }
};

export const BoardService = {
  createNew,
  getFullBoard,
  updateBoard,
  deleteBoard,
  addUserToBoard,
  removeUserToBoard,
  pushColumnOrder,
  getBoardById,
  listUserBoard,
};