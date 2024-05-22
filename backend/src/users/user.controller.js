import User from "./user.model.js";

export const deleteUser = async (req,res) => {
    const {id} = req.params;
    try {
        const user = await User.findById(id)

        if (!user) {
            return res.status(404).json({
                msg: "User not found"
            })
        }

        res.status(200).json({
            msg: "User Successfully eliminated"
        })
    } catch (error) {
        console.error("error deleting User", error )
        res.status(400).json({
            error: error.message
        })
    }
}