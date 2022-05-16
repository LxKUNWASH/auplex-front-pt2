import { useState } from "react";
import { Link } from "react-router-dom";
import "./singin.css";
import Input from "../../formulario/input";
import { Form } from "../../formulario/form";
import {Spinner} from "../../spinner/spinner"
import img from "../../../assets/img.jpg";
import {
  login,
  crearAdministrador,
  actualizarImagenAdmin,
} from "../../../helpers/peticiones/peticiones";
import { expresiones } from "../../../helpers/expresionesRegulares";
import {mensajesError} from "../../../helpers/mensajes/mensajes";
import { toast } from "react-toastify";


function Singin(props) {

  const [spinner,setSpinner] = useState(false)

  const [administrador, setAdministrador] = useState({ nombre: "", correo: "" });

  const [validaciones, setValidaciones] = useState({
    nombre: null,
    correo: null,
    contraseña: null,
  });

  const [documento, setDocumento] = useState(null);

  const handleOnChange = (e) => {
    setAdministrador({ ...administrador, [e.target.name]: e.target.value });
  };

  const handleOnDocument = (e) => {
    setDocumento(e.target.files);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    setSpinner(!spinner)

    const res = await crearAdministrador(administrador);

    if(res.msg){
      setSpinner(false)
      return toast.error(res.msg)
    }

    if (res.id && documento) {
      const file = new FormData();
      file.append("documento", documento[0]);
       const doc = await actualizarImagenAdmin(file, res.id);

}

      const body = { correo: administrador.correo, contraseña: administrador.contraseña };

      await login(body);
      
        window.location.replace("/admin");
    
  };

  const validarFormulario = () => {
    return validaciones.nombre && validaciones.correo && validaciones.contraseña
      ? false
      : true;
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
      <Spinner state={spinner}/>
      <Form titulo="Registrate" mensaje={<Link className="link" to="/login">¿Ya estas registrado? Inicia sesion</Link>}>
          <Input
            estadoValidacion={validaciones}
            actualizarValidacion={setValidaciones}
            estado={administrador}
            expresionValidar={expresiones.nombre}
            name="nombre"
            onChange={handleOnChange}
            placeholder="Nombre Completo"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-person-fill"
              viewBox="0 0 16 16"
            >
              <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
            </svg>
          </Input>
          {validaciones.nombre === false && (
            <p className="mensaje">{mensajesError.nombre}</p>
          )}
          <Input
            name="correo"
            estadoValidacion={validaciones}
            actualizarValidacion={setValidaciones}
            estado={administrador}
            expresionValidar={expresiones.correo}
            leyendaError="Correo invalido"
            placeholder="Correo Electronico"
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
          {validaciones.correo === false && (
            <p className="mensaje">
              {mensajesError.correo}
            </p>
          )}
          <Input
            estadoValidacion={validaciones}
            actualizarValidacion={setValidaciones}
            estado={administrador}
            expresionValidar={expresiones.contraseña}
            name="contraseña"
            type="password"
            placeholder="Contraseña"
            onChange={handleOnChange}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-key-fill"
              viewBox="0 0 16 16"
            >
              <path d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2zM2.5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
            </svg>
          </Input>
          {validaciones.contraseña === false && (
            <p className="mensaje">{mensajesError.contraseña} </p>
          )}
          <Input
            name="img"
            type="file"
            placeholder="Contraseña"
            onChange={handleOnDocument}
            accept="image/*"
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
            disabled={validarFormulario()}
            type="submit"
            onClick={handleOnSubmit}
            value="Registrate"
            className="button"
          />
      </Form>
    </div>
  );
}

export default Singin;
