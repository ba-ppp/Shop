import express from "express";

const router = express.Router();

export const Login = () => {
  return router.post(
    "/",
    async (req: express.Request, res: express.Response) => {
      try {
        const { email, password } = req.body;
      } catch (error) {
       res.status(500).send(error); 
      }
    }
  );
};
