import { CardModel } from "../models/card.model";
import { ColumnModel } from "../models/column.model";

const createNew = async (data) => {
  try {
    const newCard = await CardModel.creatNew(data);

    await ColumnModel.pushCardOrder(
      data.columnId,
      newCard.insertedId.toString()
    );
    console.log("newCard", newCard);
    return newCard;
  } catch (error) {
    throw new Error(error);
  }
};

export const CardService = { createNew };
