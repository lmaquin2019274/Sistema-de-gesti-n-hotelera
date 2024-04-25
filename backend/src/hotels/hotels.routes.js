import { Router } from "express";
import { check } from "express-validator";

import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

import {createHotel } from "./hotels.controller.js";
const router = Router()

export default router;

router.post(
    "/",
    [
        validarJWT,
        check("titulo", "El titulo es obligatorio").not().isEmpty(),
        check("categoria", "La categoria es obligatorio").not().isEmpty(),
        check("texto", "El texto es obligatorio").not().isEmpty(),
        validarCampos,
    ], createHotel);


