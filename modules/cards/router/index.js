import express from "express";
import bodyParser from "body-parser";
import PubSub from "pubsub-js";
import { CARD_ADDED, CARD_DELETED, CARD_UPDATED } from "../events";
import { Card } from "../model";
import { Flow } from "../../flows/model";

const CardsRouter = express.Router();
const jsonParser = bodyParser.json();

CardsRouter.get("/", (req, res) => {
  console.log("Fetching all cards...");

  Card.find((error, cards) => {
    if (error)
      console.error("Error when attempting to fetch all cards", error);
    else {
      console.log(`Found ${cards.length} cards`);
      return cards;
    }
  })
    .then((cards) => res.send(cards))
    .catch((error) => res.status(500).send(error));
});

CardsRouter.get("/:cardId", (req, res) => {
  const { cardId } = req.params;

  console.log(`Fetching card with id ${cardId}`);

  Card.findById(cardId, (error, card) => {
    if (error) console.error("Error when attempting to fetch card", error);
    else {
      console.log("Card found");
      return card;
    }
  })
    .then((card) => res.send(card))
    .catch((error) => res.status(500).send(error));
});

CardsRouter.get("/getAllCardsByFlowId/:flowId", (req, res) => {
  const { flowId } = req.params;

  console.log(`Fetching cards within flow with id ${flowId}`);

  Card.find({ flowId }, (error, cards) => {
    if (error) console.error("Error when attempting to fetch card", error);
    else {
      console.log("Cards found");
      return cards;
    }
  })
    .then((cards) => res.send(cards))
    .catch((error) => res.status(500).send(error));
});

CardsRouter.post("/", jsonParser, (req, res) => {
  Flow.findById(req.body.flowId, (error, flow) => {
    if (error) console.error("Error when attempting to fetch flow", error);
    else {
      console.log("Flow found");
      const newCard = new Card({
        ...req.body,
      });
      let result = newCard.save((error, savedCard) => {
        if (error) {
          console.error("Error while saving card", error);
          return error;
        }

        console.log("Card saved successfully");
        PubSub.publish(CARD_ADDED, savedCard);
        return savedCard;
      });
      return result;
    }
  })
    .then((card) => res.send(card))
    .catch((error) => res.status(500).send(error));
});

CardsRouter.put("/:cardId", jsonParser, (req, res) => {
  const { cardId: id } = req.params;

  console.log(`Updating card with id ${id}`);

  Card.findByIdAndUpdate(id, { ...req.body }, (error, card) => {
    if (error) console.error("Error when attempting to update card", error);
    else {
      console.log("Card updated");
      return card;
    }
  })
    .then((card) => {
      PubSub.publish(CARD_UPDATED, card);
      res.send(card);
    })
    .catch((error) => res.status(500).send(error));
});

CardsRouter.delete("/:cardId", (req, res) => {
  const { cardId } = req.params;

  console.log(`Deleting card with id ${cardId}`);

  Card.findByIdAndDelete(id, (error, card) => {
    if (error) console.error("Error when attempting to delete card", error);
    else {
      console.log("Card deleted");
      return card;
    }
  })
    .then((card) => {
      PubSub.publish(CARD_DELETED, id);
      res.send(card);
    })
    .catch((error) => res.status(500).send(error));
});

export default CardsRouter;
