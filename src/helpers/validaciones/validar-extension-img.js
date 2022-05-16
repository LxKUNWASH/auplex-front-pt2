import { toast } from "react-toastify"

export const validarImg =(imagen,extensionesPermitidas=["jpg","png","jpeg"])=>{

    const nombre = imagen[0].name
    const nombreCortado = nombre.split(".")
    const extension = nombreCortado[nombreCortado.length-1]

    if(extensionesPermitidas.includes(extension)){
        return true
    }else{
        toast.error("Formato no admitido, admitidos: jpg, png, jpeg")
        return false
    }
    

}