import express from "express";
export const catchError = (error: string, res: express.Response) => {
  return res.json({
    status: 400,
    body: error,
  });
};
