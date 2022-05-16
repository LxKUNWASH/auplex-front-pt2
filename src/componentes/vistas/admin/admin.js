import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import "./admin.css";
import { Card } from "../../card/card";
import placeholder from "../../../assets/placeholder.jpg";
import Modal from "../../modal/modal";
import { Form } from "../../formulario/form";
import Input from "../../formulario/input";
import {
  eliminarUsuario,
  obtenerAdmin,
  obtenerUsuariosAdmin,
  crearUsuario,
  actualizarImagenUsuario,
  actualizarImagenAdmin,
} from "../../../helpers/peticiones/peticiones";
import { expresiones } from "../../../helpers/expresionesRegulares";
import { mensajesError } from "../../../helpers/mensajes/mensajes";
import { toast } from "react-toastify";
import { Spinner } from "../../spinner/spinner";
import { obtenerUsuarioSelStore } from "../../../store/actions";
import { validarImg } from "../../../helpers/validaciones/validar-extension-img";


export function Admin() {

  const dispatch = useDispatch()
  
 
  const {administrador,usuarios, usuarioSeleccionado} = useSelector((state)=>(state))
  
 

  const [modal, setModal] = useState(false);

  const [spinner,setSpinner] = useState(false)

  const [modalEliminar, setModalEliminar] = useState(false);

  const [modalDetalle, setModalDetalle] = useState(false)

  const [nuevoUsuario, setNuevosUsuario] = useState({ nombre: "", correo: "" });

  const [documento, setDocumento] = useState(null);

  const [validaciones, setValidaciones] = useState({
    nombre: null,
    correo: null,
    telefono: null,
  });


  
  const token = localStorage.getItem("Token");
  
  if (!token) {
    if (token.length < 4) {
      window.location.replace("/");
    }
  }


  useEffect(() => {
    obtenerUsuariosAdmin(administrador.id,dispatch)
  }, [usuarios.length]);

  const handleOnclick = (u) => {
    setModalEliminar(!modalEliminar);
    dispatch(obtenerUsuarioSelStore(u))
  };

  const handleOnDetail = (u) => {
    setModalDetalle(!modalDetalle);
    dispatch(obtenerUsuarioSelStore(u))
  };

  const handleOnEliminarUsuario = async () => {

    const res = await eliminarUsuario(usuarioSeleccionado.uid, token,dispatch);

    if (res.msg) {
      toast.success(res.msg)
    }

    setModalEliminar(false)
    
  };

  const handleOnUsuario = () => {
    setModal(!modal);
  };

  const handleOnUpdate = async (u) => {
    localStorage.setItem("uidActualizar", u.uid);

    window.location.replace("/usuarios-actualizar");
  };

  const handleCerrarSesion = () => {
    localStorage.clear();
    window.location.replace("/");
  };

  const handleOnChange = (e) => {
    setNuevosUsuario({ ...nuevoUsuario, [e.target.name]: e.target.value });
  };

  const handleOnDocument = (e) => {
    setDocumento(e.target.files);
    
  };

  const handleOnSalir = (e) => {
    setModalEliminar(!modalEliminar);
  };

  const handleOnImage = async (e)=>{
    
    const imagen = e.target.files

    
    if(!imagen[0]){
      return
    }

    if(!validarImg(imagen)){
      return
    }

      const file = new FormData();
      file.append("documento", imagen[0]);
      
      const doc =  await actualizarImagenAdmin(file, administrador.id,dispatch)

      toast.success(doc.msg)

  }

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const body = { ...nuevoUsuario, administrador: administrador.id };

    setSpinner(!spinner)
    const res = await crearUsuario(body,dispatch);

    if (res.msg) {
      setSpinner(false)
      return toast.error(res.msg);
    }

    if (res && documento) {
      if(!validarImg(documento)){
        setSpinner(false)
        setModal(false);
        return
      }
      const file = new FormData();
      file.append("documento", documento[0]);
      await actualizarImagenUsuario(file, res.uid,dispatch);

    }

    setSpinner(false)

    setModal(!modal);

   
  };

  const validarFormulario = () => {
    return validaciones.nombre && validaciones.correo && validaciones.telefono
      ? false
      : true;
  };

  return (
    <div className="contenedor-usuarios">
      <Modal state={modalDetalle} setState={setModalDetalle} titulo={usuarioSeleccionado?.nombre}>
        <div className="titulo-data">Datos de contacto: </div>
        <div className="data">
        Telefono: {usuarioSeleccionado?.telefono}
        </div>
        <div className="data">
        Correo: {usuarioSeleccionado?.correo}
        </div>
      </Modal>
      <Modal state={modal} setState={setModal}>
        <Form titulo="Agregar Usuario">
          <Input
            estadoValidacion={validaciones}
            actualizarValidacion={setValidaciones}
            estado={nuevoUsuario}
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
            estado={nuevoUsuario}
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
            <p className="mensaje">{mensajesError.correo}</p>
          )}
          <Input
            estadoValidacion={validaciones}
            actualizarValidacion={setValidaciones}
            estado={nuevoUsuario}
            expresionValidar={expresiones.telefono}
            name="telefono"
            placeholder="Telefono"
            onChange={handleOnChange}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-telephone-fill"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"
              />
            </svg>
          </Input>
          {validaciones.telefono === false && (
            <p className="mensaje">{mensajesError.telefono} </p>
          )}
          <Input name="img" type="file" onChange={handleOnDocument} accept="image/*">
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
            value="Registrar Usuario"
            className="button"
          />
          <Spinner state={spinner}/>
        </Form>
      </Modal>
      <Modal
        state={modalEliminar}
        setState={setModalEliminar}
        titulo="Eliminar Usuario"
        boton1={
          <button className="boton-salir" onClick={handleOnSalir}>
            Salir
          </button>
        }
        boton2={
          <button className="boton-eliminar" onClick={handleOnEliminarUsuario}>
            Eliminar
          </button>
        }
      >
        {" "}
        <p className="data">¿Esta seguro?</p>{" "}
      </Modal>
      <div className="perfil">
      <Card nombre={administrador?.nombre} descripcion={administrador?.rol} img={administrador?.img} handler={handleOnImage}/>
        <div className="boton">
          <button onClick={handleCerrarSesion}>Cerrar Sesion</button>
        </div>
      </div>

      <div className="listado">
        <div className="titulo">
          <h1>Usuarios </h1>
          <svg
            onClick={handleOnUsuario}
            xmlns="http://www.w3.org/2000/svg"
            width="27"
            height="27"
            fill="currentColor"
            className="bi bi-person-plus-fill icono-añadir"
            viewBox="0 0 16 16"
          >
            <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
            <path
              fill-rule="evenodd"
              d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"
            />
          </svg>
        </div>
        <div className="lista">
          {usuarios.length > 0 ? (
            <ul>
              {usuarios.map((u) => {
                return (
                  <li key={u.uid} className="usuario">
                    {" "}
                    <img className="img-usuario" src={u.img || placeholder} onClick={()=>handleOnDetail(u)} />
                    <div>{u.nombre}</div>
                    <div>
                      <svg
                        onClick={() => handleOnclick(u)}
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        fill="currentColor"
                        className="bi bi-trash-fill icono-borrar"
                        viewBox="0 0 16 16"
                      >
                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                      </svg>
                    </div>
                    <div>
                      <svg
                        onClick={() => handleOnUpdate(u)}
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        fill="currentColor"
                        className="bi bi-file-earmark-person icono-actualizar"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                        <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2v9.255S12 12 8 12s-5 1.755-5 1.755V2a1 1 0 0 1 1-1h5.5v2z" />
                      </svg>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            "No hay usuarios"
          )}
        </div>
      </div>
    </div>
  );
}
