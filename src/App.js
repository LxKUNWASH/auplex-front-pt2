import {Routes,Route} from 'react-router-dom'
import Singin from "./componentes/vistas/singin/singin"
import Login from "./componentes/vistas/login/login"
import { Admin } from './componentes/vistas/admin/admin';
import ActualizarUsuario from './componentes/vistas/actualizar-usuario/actualizarUsuario';
function App() {
  return (
    <div>
    <Routes>
    <Route exact path="/" element={<Singin/>} />
    <Route exact path="/login" element={<Login/>} />
    <Route exact path="/admin" element={<Admin/>} />
    <Route exact path="/usuarios-actualizar" element={<ActualizarUsuario/>} />
    </Routes>
    </div>
  );
}

export default App;
