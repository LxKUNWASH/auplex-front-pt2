import { useState } from "react";
import { Form } from "../../formulario/form";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "../login/login.css";
import Input from "../../formulario/input";
import img from "../../../assets/img.jpg";
import {
  actualizarUsuario,
  actualizarImagenUsuario,
} from "../../../helpers/peticiones/peticiones";
import { expresiones } from "../../../helpers/expresionesRegulares";
import { mensajesError } from "../../../helpers/mensajes/mensajes";
import { Spinner } from "../../spinner/spinner";

function ActualizarUsuario(props) {

  const [usuario, setUsuario] = useState({ nombre: "" });

  const [spinner, setSpinner] = useState(false);

  const [validaciones, setValidaciones] = useState({ nombre: null });

  const [documento, setDocumento] = useState(null);

  const handleOnChange = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  const handleOnDocument = (e) => {
    setDocumento(e.target.files);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    setSpinner(!spinner);

    const uid = localStorage.getItem("uidActualizar");

    if (documento) {
      const file = new FormData();
      file.append("documento", documento[0]);
      const doc = await actualizarImagenUsuario(file, uid);
      setSpinner(false);
      if (doc.msg !== "Imagen Cargada con exito") {
        return toast.error(doc.msg);
      }
    }

   

    if (usuario.nombre.length>0) {

      if(!validaciones.nombre){
        setSpinner(false);
        return toast.error(mensajesError.nombre)
      }
      
        const res = await actualizarUsuario(usuario, uid);
        setSpinner(false);
        if (res.msg !== "Usuario actualizado") {
          return toast.error(res.msg);
        }
    }

    localStorage.removeItem("uidActualizar");
    window.location.replace("/admin");
  };


  return (
    <div
      className="fondo"
      style={{
        backgroundImage: `url(${img})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Spinner state={spinner} />
      <Form
        className="formulario"
        titulo="Actualizar Usuario"
        mensaje={
          <Link className="link" to="/admin">
            ¿Nada que hacer aqui? regresa
          </Link>
        }
      >
        <Input
          name="nombre"
          estadoValidacion={validaciones}
          actualizarValidacion={setValidaciones}
          estado={usuario}
          expresionValidar={expresiones.nombre}
          placeholder="Nombre Completo"
          onChange={handleOnChange}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-envelope-fill"
            viewBox="0 0 16 16"
          >
            <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z" />
          </svg>
        </Input>
        {validaciones.nombre === false && (
          <p className="mensaje">{mensajesError.nombre}</p>
        )}
        <Input
          name="img"
          type="file"
          placeholder="Contraseña"
          onChange={handleOnDocument}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-image"
            viewBox="0 0 16 16"
          >
            <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
            <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z" />
          </svg>
        </Input>
        <input
          type="submit"
          onClick={handleOnSubmit}
          value="Actualizar"
          className="button"
        />
      </Form>
    </div>
  );
}

export default ActualizarUsuario;
