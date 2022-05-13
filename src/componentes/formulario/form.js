import "./form.css"

export function Form({ children, titulo, mensaje }) {
  return (
    <form className="formulario">
      <h1>{titulo}</h1>
      <div className="contenedor">{children}</div>
      <p>{mensaje}</p>
    </form>
  );
}
