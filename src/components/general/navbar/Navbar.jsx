import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

const Navbar = () => {
    const authContext= useAuth();
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-transparent px-4">
      <div className="container-fluid">
        <NavLink className="navbar-brand d-flex align-items-center gap-2" to={"/welcome"}>
          <img
            src={"/assets/login-form-logo.png"}
            alt="login visual"
            className="object-fit-fill"
            style={{borderRadius: "10px", height: "auto", width:"50px"}}
          />
          <span>Under-Development</span>
        </NavLink>
        <div className="collapse navbar-collapse justify-content-end">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to={"#2"}>Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" onClick={(ev)=> {ev.preventDefault(); authContext.logout()}} to={"#3"}>LogOut</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
