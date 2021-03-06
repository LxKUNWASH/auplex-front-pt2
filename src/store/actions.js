import { ACTIONS } from "../actions/actions"

export const obtenerUsuariosStore = (usuarios)=>{
    return{
        type:ACTIONS.GET_USERS,
        payload:usuarios
    }
}

export const obtenerUsuario = (usuario)=>{
    return{
        type:ACTIONS.GET_SELECTED_USER,
        payload:usuario
    }
} 

export const ActualizarAdminStore = (admin)=>{
    return{
        type:ACTIONS.UPDATE_ADMIN,
        payload:admin
    }
} 

export const crearUsuarioStore =(usuario)=>{
    return {
        type:ACTIONS.ADD_USER,
        payload:usuario
    }
}

export const eliminarUsuarioStore =()=>{
    return {
        type:ACTIONS.DELETE_USER
    }
}

export const actualizarUsuarioStore =(usuario)=>{
    return {
        type:ACTIONS.UPDATE_USER,
        payload:usuario
    }
}

export const obtenerUsuarioSelStore = (usuario)=>{
    return{
        type:ACTIONS.GET_SELECTED_USER,
        payload:usuario
    }
}



