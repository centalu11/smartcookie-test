import { Request, Response } from "express";
import { getFirestore } from "firebase-admin/firestore";
import { DripService } from "../services";
import { DripParamsModel } from "../models/DripModel";

class UserController {
  static subscribe = async (req: Request, res: Response) => {
    try {
      const username = req.query?.username || "";

      if (username == "") {
        return res.status(400).send({
          message: "username is required",
        });
      }

      const firestore = getFirestore();
      const usersRef = firestore.collection("users");
      const result = await usersRef.where("username", "==", username).get();

      if (result.empty) {
        return res.status(400).send({
          message: "username doesn't exist",
        });
      }

      let userDetails: any;
      result.forEach((doc) => {
        userDetails = doc.data();
      });

      const dripParams = new DripParamsModel();
      dripParams.body = {
        email: userDetails.email || "",
        first_name: userDetails.firstName || "",
        last_name: userDetails.lastName || "",
      };

      // DRIP Account ID is not existing - not sure where to get this as of now
      const dripAccountID = process.env.DRIP_ACCOUNT_ID || "";

      // I just used random API from DRIP for now
      await DripService.call(
        `/v2/${dripAccountID}/subscribers`,
        "post",
        dripParams
      );

      res.send({
        message: "User successfully subscribed",
      });
    } catch (error) {
      res.status(400).send(error);
    }
  };
}

export default UserController;
