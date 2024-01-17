import { Router } from "express";
import { addMsg, getAllMsg } from "../controllers/msgcontroller.js";

const MsgRoutes = Router();

MsgRoutes.post('/addmsg', addMsg );
MsgRoutes.post('/getallmsg',getAllMsg );

export default MsgRoutes;