import { Router } from "express"
import { deleteUser } from "./user.controller.js"
const router = Router()

router.delete("/:id", deleteUser)

export default router