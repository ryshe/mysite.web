import Header from './Header';

// Material UI
import Container from '@material-ui/core/Container';

const layoutStyle = {
  margin: 0,
  padding: 0,
};

const containerStyle = {
  padding: 0,
};

// Provides a bump in space since header is fixed
const divHeaderSpaceStyle = {
  height: 48,
};

function Layout(props) {
  return (
    <div style={layoutStyle}>
      <Header />
      <div style={divHeaderSpaceStyle}></div>
      <Container maxWidth="md" style={containerStyle}>
        {props.children}
      </Container>
    </div>
  );
}

export default Layout;
