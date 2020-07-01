import React from 'react';
import Container from 'react-bootstrap/Container';

class Layout extends React.Component {
    constructor(props) {
      super(props);
      this.wrapper = React.createRef();
    }
    render() {
      return (
          <Container>
            <div ref={this.wrapper}>{this.props.children}</div>
        </Container>
    );
    }
  }

  export default Layout