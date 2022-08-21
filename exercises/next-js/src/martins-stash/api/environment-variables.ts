import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({
    dbconfig: {
      host: process.env.API_HOST,
      secret: process.env.API_SECRET,
    },
  });
}
