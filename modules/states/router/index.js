import express from "express";
import bodyParser from "body-parser";
import PubSub from "pubsub-js";
import { STATE_ADDED, STATE_DELETED, STATE_UPDATED } from "../events";
import { State } from "../model";
import { Flow } from "../../flows/model";

const StatesRouter = express.Router();
const jsonParser = bodyParser.json();

StatesRouter.get("/", (req, res) => {
  console.log("Fetching all states...");

  State.find((error, states) => {
    if (error)
      console.error("Error when attempting to fetch all states", error);
    else {
      console.log(`Found ${states.length} states`);
      return states;
    }
  })
    .then((states) => res.send(states))
    .catch((error) => res.status(500).send(error));
});

StatesRouter.get("/:stateId", (req, res) => {
  const { stateId } = req.params;

  console.log(`Fetching state with id ${stateId}`);

  State.findById(stateId, (error, state) => {
    if (error) console.error("Error when attempting to fetch state", error);
    else {
      console.log("State found");
      return state;
    }
  })
    .then((state) => res.send(state))
    .catch((error) => res.status(500).send(error));
});

StatesRouter.get("/getAllStatesByFlowId/:flowId", (req, res) => {
  const { flowId } = req.params;

  console.log(`Fetching states within flow with id ${flowId}`);

  State.find({ flowId }, (error, states) => {
    if (error) console.error("Error when attempting to fetch state", error);
    else {
      console.log("States found");
      return states;
    }
  })
    .then((states) => res.send(states))
    .catch((error) => res.status(500).send(error));
});

StatesRouter.post("/", jsonParser, (req, res) => {
  Flow.findById(req.body.flowId, (error, flow) => {
    if (error) console.error("Error when attempting to fetch flow", error);
    else {
      console.log("Flow found");
      const newState = new State({
        ...req.body,
      });
      let result = newState.save((error, savedState) => {
        if (error) {
          console.error("Error while saving state", error);
          return error;
        }

        console.log("State saved successfully");
        PubSub.publish(STATE_ADDED, savedState);
        return savedState;
      });
      return result;
    }
  })
    .then((state) => res.send(state))
    .catch((error) => res.status(500).send(error));
});

StatesRouter.put("/:stateId", jsonParser, (req, res) => {
  const { stateId: id } = req.params;

  console.log(`Updating state with id ${id}`);

  State.findByIdAndUpdate(id, { ...req.body }, (error, state) => {
    if (error) console.error("Error when attempting to update state", error);
    else {
      console.log("State updated");
      return state;
    }
  })
    .then((state) => {
      PubSub.publish(STATE_UPDATED, state);
      res.send(state);
    })
    .catch((error) => res.status(500).send(error));
});

StatesRouter.delete("/:stateId", (req, res) => {
  const { stateId: id } = req.params;

  console.log(`Deleting state with id ${id}`);

  State.findByIdAndDelete(id, (error, state) => {
    if (error) console.error("Error when attempting to delete state", error);
    else {
      console.log("State deleted");
      return state;
    }
  })
    .then((state) => {
      PubSub.publish(STATE_DELETED, id);
      res.send(state);
    })
    .catch((error) => res.status(500).send(error));
});

export default StatesRouter;
