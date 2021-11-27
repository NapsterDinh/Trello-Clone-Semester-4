//Library component
import { ObjectId } from "mongodb";

//user component
import { workSpaceModel } from "../models/workSpace.model";
import { getDB } from "../config/mongodb";
import { workSpaceCollectionName } from "../models/workSpace.model";
import { workSpaceCollectionSchema } from "../models/workSpace.model";
import { workSpaceTypeCollectionName } from "../models/workSpaceType.model";
import { userService } from "./user.service";
import { sendEmailUser } from "../shares/sendMail";
import { BoardService } from "./board.service";

//coding
const validateSchema = async (data) => {
  return await workSpaceCollectionSchema.validateAsync(data, {
    abortEarly: false,
  });
};

const createWorkSpace = async (data) => {
  try {
    const { userCreate } = data.query;
    const wpBody = { ...data.body, ...{ userCreate } };
    const value = await validateSchema(wpBody);
    let result = await getDB()
      .collection(workSpaceCollectionName)
      .insertOne(value);
    result = { ...result, ...value };
    console.log("service", result);
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
    const { _id, name, descsription } = data;
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
  } catch (error) {
    throw new Error(error);
  }
};

const deleteWorkSpace = async (data) => {
  try {
    const { _id } = data;
    const findWorkSpaceTypeId = await getDB()
      .collection(columnCollectionName)
      .findOne({ _id: ObjectId(_id) });
    const result = await getDB()
      .collection(workSpaceCollectionName)
      .findOneAndDelete({ _id: ObjectId(data._id) }, { returnOriginal: false });
    if (result) {
      await getDB()
        .collection(workSpaceTypeCollectionName)
        .updateOne(
          { _id: ObjectId(findWorkSpaceTypeId?.workspacetypeId) },
          { $pull: { workSpaceId: { $in: [_id] } } }
        );
      return { result: true, msg: "Delete workspace success", data: result };
    } else {
      return { result: false, msg: "Delete workspace fail", data: [] };
    }
  } catch (error) {
    throw new Error(error);
  }
};

const addUserToWorkSpace = async (data) => {
  try {
    const findUserCreateWP = await getDB()
      .collection(workSpaceCollectionName)
      .findOne({ userCreate: data?.query?.userCreate });
    console.log("----", findUserCreateWP);
    if (!findUserCreateWP) {
      return {
        result: false,
        msg: "You is not permission add user to workSpace",
        data: [],
      };
    } else {
      const { _id, userId } = data.body;
      const getUser = await userService.getUserByEmail(userId);
      const iduser = [];
      getUser.map((u) => iduser.push(u._id.toString()));
      const result = await getDB()
        .collection(workSpaceCollectionName)
        .findOneAndUpdate(
          { _id: ObjectId(_id) },
          { $push: { userId: { $each: iduser } } },
          { returnOriginal: false }
        );
      console.log("resu,kt", result);
      if (result?.value) {
        const mess = `You have been add ${result?.value?.name}`;
        userId.map((e) => sendEmailUser(e, mess));
        return {
          result: true,
          msg: "Add user workspace success",
          data: result?.value,
        };
      } else {
        return { result: false, msg: "Add user  workspace fail", data: [] };
      }
    }
  } catch (error) {
    throw new Error(error);
  }
};

const removeUserToWorkSpace = async (data) => {
  try {
    const findUserCreateWP = await getDB()
      .collection(workSpaceCollectionName)
      .findOne({ userCreate: data?.query?.userCreate });

    if (!findUserCreateWP) {
      return {
        result: false,
        msg: "You is not permission remove user to workSpace",
        data: [],
      };
    } else {
      const { _id, userId } = data.body;
      const getUser = await userService.getUserByEmail(userId);
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
      console.log("====", getWS);

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
    console.log("====", result);
    res.json({ result });
    // return result;
  } catch (error) {
    throw new Error(error);
  }
};

const getWorkSpaceGuestOrOwer = async (data) => {
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

export const workSpaceService = {
  createWorkSpace,
  getWorkSpace,
  updateWorkSpace,
  deleteWorkSpace,
  addUserToWorkSpace,
  removeUserToWorkSpace,
};
