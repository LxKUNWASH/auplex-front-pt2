import { obtenerUsuariosStore,crearUsuarioStore, eliminarUsuarioStore, actualizarUsuarioStore, guardarSesionStore, ActualizarAdminStore } from "../../store/actions";
import { ACTIONS } from "../../actions/actions";

const url = `https://au-restserver.herokuapp.com/api/`

export const login = async (body,dispatch) => {
  try {
    const res = await fetch(`${url}auth`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(body),
    });
    const response = await res.json();
      localStorage.removeItem("Sesion");
      localStorage.removeItem("Token")
      localStorage.setItem("Sesion", JSON.stringify(response));
      localStorage.setItem("Token",response.token)
    return response;
  } catch (error) {
    console.log(error);
  }
};



export const crearUsuario = async (body,dispatch) => {
  try {
    const res = await fetch(`${url}usuarios`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(body),
    });
    const response = await res.json();
    dispatch(crearUsuarioStore(response))
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const actualizarUsuario = async (body,id) => {
  try {
    const res = await fetch(`${url}usuarios/${id}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(body),
    });
    const response = await res.json();
    return response;
  } catch (error) {
    console.log(error);
  }
};

  export const actualizarImagenUsuario = async (body,id,dispatch) => {
    try {
      const res = await fetch(`${url}uploads/usuarios/usuario/${id}`, {
        method: "PUT",
        body,
      });
      const response = await res.json();
    dispatch(actualizarUsuarioStore(response.modelo))
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  export const obtenerUsuario = async (id) => {
    try {
      const res = await fetch(`${url}usuarios/${id}`);
      const response = await res.json();
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  export const obtenerUsuarios = async () => {
    try {
      const res = await fetch(`${url}usuarios`);
      const response = await res.json();
      return response;
    } catch (error) {
      console.log(error);
    }
  };


  export const eliminarUsuario = async (id,token,dispatch) => {
    try {
      const res = await fetch(`${url}usuarios/${id}`,
      {
          headers: {
            'x-token': token,
          },
          method: "DELETE"
      })
      const response = await res.json();
      dispatch(eliminarUsuarioStore())
      return response;
    } catch (error) {
      console.log(error);
    }
  };
  

  export const crearAdministrador = async (body) => {
    try {
      const res = await fetch(`${url}administradores`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(body),
      });
      const response = await res.json();
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  export const obtenerAdmin = async (id) => {
    try {
      const res = await fetch(`${url}administradores/${id}`);
      const response = await res.json();
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  export const obtenerUsuariosAdmin = async (id,dispatch) => {
    try {
      const res = await fetch(`${url}busquedas/usuarios/${id}`);
      const response = await res.json();
      dispatch((obtenerUsuariosStore(response)))
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  export const actualizarImagenAdmin = async (body,id,dispatch) => {
    try {
      const res = await fetch(`${url}uploads/administradores/administrador/${id}`, {
        method: "PUT",
        body,
      });
      const response = await res.json();
      dispatch(ActualizarAdminStore(response.modelo))
      return response;
    } catch (error) {
      console.log(error);
    }
  };

