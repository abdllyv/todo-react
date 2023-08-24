/* --------------------------------- Router --------------------------------- */
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="row">
          <nav className="nav-bar">
            <ul className="nav-list">
              <li className="nav-items">
                <Link to="/">home</Link>
              </li>
              <li className="nav-items">
                <Link to="/all-product">All Product</Link>
              </li>
              <li className="nav-items">
                <Link to="/create-product">Create Product</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
