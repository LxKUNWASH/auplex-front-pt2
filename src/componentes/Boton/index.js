import './index.css';

 function Boton(props){

    
     
    
    return(
        <div className='boton'>
        <button className={props.className} onClick={props.onClick}>{props.children}</button>
        </div>
    )
}

export default Boton;