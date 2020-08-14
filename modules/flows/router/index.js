import express from "express";
import bodyParser from "body-parser";
import PubSub from "pubsub-js";
import { FLOW_ADDED, FLOW_DELETED, FLOW_UPDATED } from "../events";
import { Flow } from "../model";

const flowsRouter = express.Router();
const resourceType = "flow management";
const jsonParser = bodyParser.json();

flowsRouter.get("/", (req, res) => {
  console.log("Fetching all flows...");

  Flow.find((error, flows) => {
    if (error) console.error("Error when attempting to fetch all flows", error);
    else {
      console.log(`Found ${flows.length} flows`);
      return flows;
    }
  })
    .then((flows) => res.send(flows))
    .catch((error) => res.status(500).send(error));
});

flowsRouter.get("/:flowId", (req, res) => {
  const { flowId: id } = req.params;

  console.log(`Fetching flow with id ${id}`);

  Flow.findById(id, (error, flow) => {
    if (error) console.error("Error when attempting to fetch flow", error);
    else {
      console.log("Flow found");
      return flow;
    }
  })
    .then((flow) => res.send(flow))
    .catch((error) => res.status(500).send(error));
});

flowsRouter.post("/", jsonParser, (req, res) => {
  const newFlow = new Flow({
    ...req.body,
  });

  newFlow.save((error, savedFlow) => {
    if (error) {
      console.error("Error while saving flow", error);
      res.status(500).send(error);
    }

    console.log("Flow saved successfully");
    PubSub.publish(FLOW_ADDED, savedFlow);
    res.send(savedFlow);
  });
});

flowsRouter.put("/:flowId", jsonParser, (req, res) => {
  const { flowId: id } = req.params;

  console.log(`Updating flow with id ${id}`);

  Flow.findByIdAndUpdate(id, { ...req.body }, (error, flow) => {
    if (error)
      console.error("Error when attempting to update flow", error);
    else {
      console.log("Flow updated");
      return flow;
    }
  })
    .then((flow) => {
      PubSub.publish(FLOW_UPDATED, flow);
      res.send(flow);
    })
    .catch((error) => res.status(500).send(error));
});

flowsRouter.delete("/:flowId", (req, res) => {
  const { flowId: id } = req.params;

  console.log(`Deleting flow with id ${id}`);

  Flow.findByIdAndDelete(id, (error, flow) => {
    if (error) console.error("Error when attempting to delete flow", error);
    else {
      console.log("Flow deleted");
      return flow;
    }
  })
    .then((flow) => {
      PubSub.publish(FLOW_DELETED, id);
      res.send(flow);
    })
    .catch((error) => res.status(500).send(error));
});

export default flowsRouter;
