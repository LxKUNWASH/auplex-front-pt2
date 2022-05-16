import "./card.css";
import placeholder from "../../assets/placeholder.jpg";
import { useRef } from "react";

function Card(props) {
  const { nombre, descripcion, img = placeholder,handler } = props;

  const inputRef = useRef(null)

const handleOnClick = ()=>{
  inputRef.current.click()
}

  return (
    
    <div className="card" >
      <div className="img">
      <input id="input" type="file" ref={inputRef} style={{display:"none"}} onChange={handler} />
        <img className="img" src={img} onClick={handleOnClick}/>
      </div>
      <div className="content">
        <h2>{nombre}</h2>
        <p>{descripcion}</p>
      </div>
    </div>
  );
}

export  {Card};
