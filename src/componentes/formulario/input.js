import "./input.css";

function Input(props) {

  const { type="text",placeholder, children,onChange,name,estadoValidacion,actualizarValidacion,estado,expresionValidar,value} = props;
  
  const validar = () => {
    if (expresionValidar) {
      if (expresionValidar.test(estado[name])) {
        actualizarValidacion({ ...estadoValidacion, [name]: true });
      } else {
        actualizarValidacion({ ...estadoValidacion, [name]: false });
      }
    }
  };
  
  return (
    <div className="input-contenedor">
    <div className="icon">
      {children}
      </div>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        className="input-contenedor__input"
        onBlur={validar}
        onKeyUp={validar}
      />
    </div>
  );
}

export default Input;
