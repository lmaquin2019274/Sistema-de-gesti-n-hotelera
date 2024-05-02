import toast from "react-hot-toast"
import { patchChangePassword as changePasswordRequest } from "../../services"

export const useChangePassword = () => {
    const changePassword = async (password, newPassword) => {
        const responseData = await changePasswordRequest({password, newPassword})

        if(responseData.error){
            return toast.error(responseData.e?.response?.data || 'No se pudo actualizar el password')
        }

        toast.success('Password Actualizado exitosamente')
    }
  return {
    changePassword
  }
}
