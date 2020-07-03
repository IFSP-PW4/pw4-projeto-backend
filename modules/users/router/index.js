import { Router } from "express";

const usersRouter = Router();

usersRouter.get("/", (req, res) => {
    res.send(res.__("Returning all users"));
});

usersRouter.post("/", (req, res) => {
    res.send(res.__("Saving new user", { route: req.url }));
});

usersRouter.get("/:userId", (req, res) => {
    res.send(res.__("Returning user with id {{userId}}", { userId: req.params.userId }));
});

usersRouter.put("/:userId", (req, res) => {
    res.send(res.__("Updating user with id {{userId}}", { userId: req.params.userId }));
});

usersRouter.get("/login", (req, res) => {
    res.send(res.__("Executing login logic"));
});

export default usersRouter;

