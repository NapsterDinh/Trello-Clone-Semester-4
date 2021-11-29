//Library component
import { ObjectId } from "mongodb";

//user component
import { getDB } from "../config/mongodb";
import { workSpaceCollectionName } from "../models/workSpace.model";
import { workSpaceCollectionSchema } from "../models/workSpace.model";
import { workSpaceTypeCollectionName } from "../models/workSpaceType.model";
import { userService } from "./user.service";
import { sendEmail } from "../shares/sendMail";
import { BoardService } from "./board.service";
import { boardCollectionName } from "../models/board.model";

//variable
const { APP_SCHEMA, APP_HOST, APP_PORT } = process.env;

//coding
const validateSchema = async (data) => {
  return await workSpaceCollectionSchema.validateAsync(data, {
    abortEarly: false,
  });
};

const createWorkSpace = async (data) => {
  try {
    const userCreate = data.user.sub;
    const wpBody = { ...data.body, ...{ userCreate } };
    const value = await validateSchema(wpBody);
    let result = await getDB()
      .collection(workSpaceCollectionName)
      .insertOne(value);
    result = { ...result, ...value };
    if (result) {
      await getDB()
        .collection(workSpaceTypeCollectionName)
        .updateOne(
          { _id: ObjectId(data?.body?.workspacetypeId) },
          {
            $push: {
              workSpaceId: result?.insertedId.toString(),
            },
          }
        );
      return { result: true, msg: "Create workspace success", data: result };
    } else {
      return { result: false, msg: "Create workspace fail", data: [] };
    }
  } catch (error) {
    throw new Error(error);
  }
};

const getWorkSpace = async (data) => {
  try {
    const result = await getDB()
      .collection(workSpaceCollectionName)
      .find(data)
      .toArray();
    if (result) {
      return { result: true, msg: "Get workspace success", data: result };
    } else {
      return { result: false, msg: "Get workspace fail", data: [] };
    }
  } catch (error) {
    throw new Error(error);
  }
};

const updateWorkSpace = async (data) => {
  try {
    const { _id, name, descsription } = data.body;
    const findUserCreateWP = await getDB()
      .collection(workSpaceCollectionName)
      .findOne({ _id: ObjectId(_id) });
    if (findUserCreateWP?.userCreate !== data.user.sub) {
      return {
        result: false,
        msg: "You is not permission update to workSpace",
        data: [],
      };
    } else {
      const result = await getDB()
        .collection(workSpaceCollectionName)
        .findOneAndUpdate(
          { _id: ObjectId(_id) },
          {
            $set: { name, descsription },
          },
          { returnOriginal: false }
        );

      if (result) {
        return { result: true, msg: "Update workspace success", data: result };
      } else {
        return { result: false, msg: "Update workspace fail", data: [] };
      }
    }
  } catch (error) {
    throw new Error(error);
  }
};

const deleteWorkSpace = async (data) => {
  try {
    const { _id } = data.query;
    const findUserCreateWP = await getDB()
      .collection(workSpaceCollectionName)
      .findOne({ _id: ObjectId(_id) });
    if (findUserCreateWP?.userCreate !== data.user.sub) {
      return {
        result: false,
        msg: "You is not permission delete to workSpace",
        data: [],
      };
    } else {
      const result = await getDB()
        .collection(workSpaceCollectionName)
        .findOneAndDelete({ _id: ObjectId(_id) }, { returnOriginal: false });
      if (result?.value) {
        await getDB()
          .collection(workSpaceTypeCollectionName)
          .updateOne(
            { _id: ObjectId(findUserCreateWP?.workspacetypeId) },
            { $pull: { workSpaceId: { $in: [_id] } } }
          );
        const boarddelte = await getDB()
          .collection(boardCollectionName)
          .deleteMany({ workSpaceId: _id });
        return {
          result: true,
          msg: "Delete workspace success",
          data: result?.value,
        };
      } else {
        return { result: false, msg: "Delete workspace fail", data: [] };
      }
    }
  } catch (error) {
    throw new Error(error);
  }
};

const inviteUser = async (data) => {
  try {
    const { _id, userMail } = data.body;
    const findUserCreateWP = await getDB()
      .collection(workSpaceCollectionName)
      .findOne({ _id: ObjectId(_id) });
    const wpName = findUserCreateWP?.name;
    if (findUserCreateWP?.userCreate !== data.user.sub) {
      return {
        result: false,
        msg: "You is not permission invite user to workSpace",
        data: [],
      };
    } else {
      userMail.map((email) =>
        sendEmail(
          email,
          `${APP_SCHEMA}://${APP_HOST}:${APP_PORT}/v1/workSpace/addUser?userMail=${email}&wpId=${_id}`,
          "Verify your email address"
        )
      );
      return {
        result: true,
        msg: "Invite user to workSpace success",
        data: wpName,
      };
    }
  } catch (error) {
    throw new Error(error);
  }
};

const addUserToWorkSpace = async (data) => {
  try {
    const { wpId, userMail } = data.query;
    const getUser = await userService.getUserByEmail([userMail]);
    const result = await getDB()
      .collection(workSpaceCollectionName)
      .updateOne(
        { _id: ObjectId(wpId) },
        { $push: { userId: getUser[0]?._id.toString() } }
      );
    if (result?.acknowledged) {
      return {
        result: true,
        msg: "You join workspace success!!!",
      };
    } else {
      return { result: false, msg: "Add user  workspace fail" };
    }
  } catch (error) {
    throw new Error(error);
  }
};

const removeUserToWorkSpace = async (data) => {
  try {
    const { _id, userMail } = data.body;
    const findUserCreateWP = await getDB()
      .collection(workSpaceCollectionName)
      .findOne({ _id: ObjectId(_id) });
    if (findUserCreateWP?.userCreate !== data.user.sub) {
      return {
        result: false,
        msg: "You is not permission remove user to workSpace",
        data: [],
      };
    } else {
      const getUser = await userService.getUserByEmail(userMail);
      const iduser = [];
      getUser.map((u) => iduser.push(u._id.toString()));
      const result = await getDB()
        .collection(workSpaceCollectionName)
        .findOneAndUpdate(
          { _id: ObjectId(_id) },
          { $pull: { userId: { $in: iduser } } },
          { returnOriginal: false }
        );

      const getWS = await getWorkSpace({ _id: ObjectId(_id) });

      if (result?.value) {
        const mess = `You have been add ${result?.value?.name}`;
        userId.map((e) => sendEmailUser(e, mess));
        await BoardService.removeUserToBoard(data);
        return {
          result: true,
          msg: "Delete user into workspace success",
          data: result?.value,
        };
      } else {
        return {
          result: false,
          msg: "Delete user into workspace fail",
          data: [],
        };
      }
    }
  } catch (error) {
    throw new Error(error);
  }
};

export const getFullWorkSpace = async (res) => {
  try {
    const result = await getDB()
      .collection(workSpaceCollectionName)
      .find()
      .toArray();
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const getWorkSpaceGuestOrOwer = async (data) => {
  try {
    const userOwer = await getFullWorkSpace();
    const resultOwer = userOwer.filter(
      ({ userCreate }) => userCreate === data.user.sub //data.user.sub
    );

    const boardOwer = await Promise.all(
      resultOwer.map(
        async (u) => await BoardService.getBoardById(u?._id.toString())
      )
    );
    const workSpaceAndBoardOwer = { resultOwer, boardOwer };

    const resultGuest = userOwer.filter(
      (u) => u.userId.includes(data.user.sub) //data.user.sub
    );

    const boardGuest = await Promise.all(
      resultGuest.map(
        async (u) => await BoardService.getBoardById(u?._id.toString())
      )
    );

    const workSpaceAndBoardGuest = { resultGuest, boardGuest };

    return {
      result: true,
      msg: "Get workspace success",
      data: { workSpaceAndBoardOwer, workSpaceAndBoardGuest },
    };
  } catch (error) {
    throw new Error(error);
  }
};

const getAllUserAndUserExistInWorkSpace = async (data) => {
  try {
    const wp = await getWorkSpace({ _id: ObjectId(data._id) });
    const userOwer = await userService.getUserById([
      ObjectId(wp?.data[0].userCreate),
    ]);
    const objectIdArray = wp?.data[0]?.userId.map((s) => ObjectId(s));
    const userWP = await userService.getUserById(objectIdArray);
    const getBoard = await BoardService.getBoardById(data._id);

    let userList = [];
    const userBoard = await Promise.all(
      getBoard.map(async (user) => {
        let cal = await userService.getUserById(
          user.userId.map((s) => ObjectId(s))
        );
        const boardName = user.title;
        cal = { ...cal, ...{ boardName } };
        return cal;
      })
    );
    userList = userBoard;

    return {
      result: true,
      msg: "Get workspace success",
      data: { userOwer, userWP, userList },
    };
  } catch (error) {
    throw new Error(error);
  }
};

const updatePrivacy = async (data) => {
  try {
    const { _id, priority } = data.body;
    const findUserCreateWP = await getDB()
      .collection(workSpaceCollectionName)
      .findOne({ _id: ObjectId(_id) });
    if (findUserCreateWP?.userCreate !== data.user.sub) {
      //
      return {
        result: false,
        msg: "You is not permission update privacy to workSpace",
        data: [],
      };
    } else {
      await getDB()
        .collection(workSpaceCollectionName)
        .updateOne(
          { _id: ObjectId(_id) },
          {
            $set: { priority: priority },
          }
        );

      const result = await getDB()
        .collection(workSpaceCollectionName)
        .findOne({ _id: ObjectId(_id) });

      if (result) {
        return { result: true, msg: "Update priority success", data: result };
      } else {
        return { result: false, msg: "Update priority fail", data: [] };
      }
    }
  } catch (error) {
    throw new Error(error);
  }
};

const getWorkSpaceById = async (data) => {
  try {
    const isCheckUserCreateWP = await getDB();
    const { _id } = data.query;
    console.log(_id);
    const findeWP = await getDB()
      .collection(workSpaceCollectionName)
      .findOne({ _id: ObjectId(_id) });
    if (!findeWP) {
      return {
        result: false,
        msg: "Not found!",
        data: [],
      };
    } else if (findeWP?.priority === "Public") {
      const showBoard = await getDB()
        .collection(workSpaceCollectionName)
        .find({ workSpaceId: _id })
        .toArray();

      return {
        result: true,
        msg: "Get workSpace success",
        data: showBoard,
      };
    } else {
      const isCheckUser = await getDB()
        .collection(workSpaceCollectionName)
        .findOne({ _id: ObjectId(_id) });
      if (
        isCheckUser?.userId.includes(data?.userId) ||
        isCheckUserCreateWP?.userCreate === data?.userCreate
      ) {
        const show = await getDB()
          .collection(workSpaceCollectionName)
          .find({ workSpaceId: _id })
          .toArray();

        return {
          result: true,
          msg: "Get workSpace success",
          data: show,
        };
      }
    }
  } catch (error) {
    throw new Error(error);
  }
};

export const workSpaceService = {
  createWorkSpace,
  getWorkSpace,
  updateWorkSpace,
  deleteWorkSpace,
  addUserToWorkSpace,
  removeUserToWorkSpace,
  getWorkSpaceGuestOrOwer,
  getAllUserAndUserExistInWorkSpace,
  updatePrivacy,
  inviteUser,
  getWorkSpaceById,
};
