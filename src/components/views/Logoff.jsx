import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { invalidateUser } from "../helpers";

const Logoff = (props) => {
    const navigate = useNavigate();

    useEffect(() => {
        Swal.fire({
            title: "Confirma cerrar sesion?",
            text: "necesitará iniciar sesion nuevamente",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Cerrar",
            cancelButtonText: "Cancelar",
        }).then(async (result) => {
            if (result.isConfirmed) {
                props.setAdminLogged(false);
                props.setSesionIniciada(false);
                invalidateUser();
                navigate("/");
            }
            else
                navigate(-1);
        });
    }, []);

    return null;
};

export default Logoff;
