import { Router } from "express";

const userRouter = Router();

userRouter.get("/", (req, res) => {
    res.send(res.__("Returning all users"));
});

userRouter.post("/", (req, res) => {
    res.send(res.__("Saving new user", { route: req.url }));
});

userRouter.get("/:userId", (req, res) => {
    res.send(res.__("Returning user with id {{userId}}", { userId: req.params.userId }));
});

userRouter.put("/:userId", (req, res) => {
    res.send(res.__("Updating user with id {{userId}}", { userId: req.params.userId }));
});

userRouter.get("/login", (req, res) => {
    res.send(res.__("Executing login logic"));
});

export default userRouter;

