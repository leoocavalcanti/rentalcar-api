import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Title, StyledNavbar } from './styles';

function RentalNavbar() {
  return (
    <StyledNavbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Title href="#home">Locadora</Title>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      </Container>
    </StyledNavbar>
  );
}

export default RentalNavbar;