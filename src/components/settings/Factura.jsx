import { useState } from "react";
import toast from "react-hot-toast";
import { factura as facturaRequest } from "../../services";

export const useFactura = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [factura, setFactura] = useState([]);

    const cf = async (id, extra, total, service) => {
        setIsLoading(true);
        const userDataString = localStorage.getItem('user');
        const userData = JSON.parse(userDataString);
        const token = userData.token;

        try {
            const response = await facturaRequest({
                id,
                extra,
                total,
                service
            }, token);

            setIsLoading(false);

            if (response.error) {
                console.log('Error:', response.e);
                console.log('Error Response:', response.e.response);
                console.log('Error Data:', response.e.response?.data);
                toast.error(response.e?.response?.data || 'Ocurrio un error');
            } else {
                toast.success('Factura exitosa');
            }
        } catch (error) {
            setIsLoading(false);
            toast.error('Ocurrió un error');
        }
    }

    return {
        cf,
        isLoading,
        factura
    }
}
