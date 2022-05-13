import "./spinner.css"
export function Spinner ({state}){

    return(
        <>
        {state &&
        <div className="contenedor-spinner">
        <div className="spinner">
            
        </div>
        </div>
        }
        </>
    )
}
