import { ACTIONS } from "../actions/actions";

const initialState = {
    administrador: undefined,
    usuarios: [],
    usuarioSeleccionado:undefined
  };


export const stateReducer =  (state = initialState, action) => {
    switch (action.type) {
      case ACTIONS.LOGIN_ACTION:
        return {
          ...state,
          administrador: action.payload
        };
  
      case ACTIONS.GET_USERS:
          return{
              ...state,
              usuarios: action.payload
          }

          case ACTIONS.ADD_USER:
          return{
              ...state,
              usuarios: [...state.usuarios, action.payload]
          }

          case ACTIONS.UPDATE_USER:
            const id = action.payload.uid
            const updatedUser = state.usuarios.filter((usuario)=>usuario.uid === id)
            console.log(updatedUser)
            return{
                ...state,
                usuarios: [...state.usuarios,updatedUser]
            }

          case ACTIONS.DELETE_USER:
            const {uid} = state.usuarioSeleccionado
            const array = state.usuarios.filter((usuario)=>usuario.uid !== uid)
            return{
              ...state,
              usuarios: array
            }

          
  
          case ACTIONS.GET_SELECTED_USER:
          return{
              ...state,
              usuarioSeleccionado: action.payload
          }
       
      default:
        return state;
    }
    
  };





