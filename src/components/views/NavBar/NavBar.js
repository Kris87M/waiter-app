import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.scss"

const NavBar = () => {
  return (
    <Navbar bg="primary" variant="dark" expand="lg" className={styles.navbar}>
      <Container>
        <Navbar.Brand as={NavLink} to="/" className={styles.navLink}>
          Waiter.app
        </Navbar.Brand>
        <Nav className="ml-auto">
          <Nav.Link as={NavLink} to="/" className={styles.navLink}>
            Home
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default NavBar;
