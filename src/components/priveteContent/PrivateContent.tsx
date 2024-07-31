import { useContext, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { Context } from '../../context/Context';
import Swal from 'sweetalert2';

export const PrivateContent = ({children}:{children:JSX.Element}) => {
    const {getEmployee} = useContext(Context)
    const navegate = useNavigate()

    const isLoged = () => {
        const token = localStorage.getItem('token')
        if (token) {
            getEmployee()
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Tu sesion a espirado",
            });
            navegate('/login')
            
        }

    }

    useEffect(() => {
      isLoged()
    }, [])
    

  return (
    <>
     {children}   
    </>
  )
}
