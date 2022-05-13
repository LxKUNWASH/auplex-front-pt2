import "./card.css";
import placeholder from "../../assets/placeholder.jpg";

function Card(props) {
  const { nombre, descripcion, img = placeholder } = props;
  return (
    <div className="card">
      <div className="img">
        <img className="img" src={img} />
      </div>
      <div className="content">
        <h2>{nombre}</h2>
        <p>{descripcion}</p>
      </div>
    </div>
  );
}

export  {Card};
