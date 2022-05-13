import { useState } from "react";
import { Link  } from 'react-router-dom';
import "./login.css";
import Input from "../../formulario/input"
import img from "../../../assets/img.jpg"
import { Form } from "../../formulario/form";
import { Spinner } from "../../spinner/spinner";
import { login } from "../../../helpers/peticiones/peticiones";
import { expresiones } from "../../../helpers/expresionesRegulares";
import {mensajesError} from "../../../helpers/mensajes/mensajes";
import {toast} from "react-toastify"


function Singin(props) {

  const [spinner,setSpinner] = useState(false)

  const [administrador, setAdministrador] = useState({ nombre: "", correo: "" });

  const [validaciones, setValidaciones] = useState({
    nombre: null,
    contraseña:null
  });

  



  const handleOnChange = (e) => {
    setAdministrador({ ...administrador, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault()

    setSpinner(!spinner)

    const res = await login(administrador);

    setSpinner(false)

    if(res.msg !=="Sesion iniciada"){
      return toast.error(res.msg)
    }

    localStorage.setItem("Administrador",res.administrador.id)
    localStorage.setItem("Token",res.token)

    window.location.replace('/admin');

  };

  const validarFormulario = () => {
    return validaciones.correo &&
      validaciones.contraseña
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
      <Form titulo="Inicia Sesion" mensaje={<Link className="link" to="/">¿No estas registrado? Registrate</Link>}>
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
          {validaciones.correo ===false && <p className="mensaje">{mensajesError.correo}</p>}
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
          {validaciones.contraseña ===false && <p className="mensaje">{mensajesError.contraseña}</p>}
          <input
            type="submit"
            disabled={validarFormulario()}
            onClick={handleOnSubmit}
            value="Iniciar Sesion"
            className="button"
          />
      </Form>
    </div>
  );
}

export default Singin;
