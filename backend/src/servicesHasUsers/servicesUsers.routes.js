import { Router } from "express";
import { createService, listServiceId, listServiceHotel, listServiceUser} from "./servicesUsers.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

const router = Router()

router.post(
    "/",
    [   validarJWT,
        validarCampos
    ], createService);
    
router.get("/:id", listServiceId);

router.get("/hotel/:id", listServiceHotel);

router.get("/user/:id", listServiceUser);

export default router;