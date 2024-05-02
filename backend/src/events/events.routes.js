import { Router } from "express";
import { check } from "express-validator";
import { listEvents, createEvent } from "./events.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";
//import { validarJWT } from "../middlewares/validar-jwt.js";

const router = Router()

router.post(
    "/events",
    [
//      validarJWT,
        check("name", "The name is required").not().isEmpty(),
        check("description", "Description is required").not().isEmpty(),
        check("hotel", "The hotel is required").not().isEmpty(),
        check("date", "The date is required").not().isEmpty(),
        check("capacity", "Capacity is required").not().isEmpty(),
        validarCampos
    ], createEvent);

router.get("/events", listEvents);

export default router;

