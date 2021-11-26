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

const createNew = async (data) => {
  try {
    const isCheckUserCreateWP = await getDB()
      .collection(workSpaceCollectionName)
      .findOne({ userCreate: data?.user.sub });
    console.log("====", isCheckUserCreateWP);
    if (!isCheckUserCreateWP) {
      return {
        result: false,
        msg: "You is not permission update board ",
        data: [],
      };
    } else {
      const value = await validateSchema(data?.body);
      console.log("value", value);
      const result = await getDB()
        .collection(boardCollectionName)
        .insertOne(value);
      console.log("model", result);
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
    console.log(error);
    throw new Error(error);
  }
};

const refBoard = async (boardId) => {
  console.log("boardId", boardId);
  try {
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

    return result[0] || {};
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

const getFullBoard = async (data) => {
  try {
    const isCheckUser = await getDB()
      .collection(boardCollectionName)
      .findOne({ _id: ObjectId(data?.boardId) });
    const isCheckUserCreateWP = await getDB()
      .collection(workSpaceCollectionName)
      .findOne({ _id: ObjectId(isCheckUser?.workSpaceId) });

    console.log("aaaa", isCheckUser);
    if (
      isCheckUser?.userId.includes(data?.userId) ||
      isCheckUserCreateWP?.userCreate === data?.userCreate
    ) {
      const board = await refBoard(data?.boardId);
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
    console.log("====", isCheckUserCreateWP);
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
  console.log("data", data);

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
    console.log("====", isCheckUserCreateWP);
    if (!isCheckUserCreateWP) {
      return {
        result: false,
        msg: "You is not permission add user to board ",
        data: [],
      };
    } else {
      const { _id, userId } = data?.body;
      console.log("===", data);
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
    console.log(error);
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
};
