import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addBar, getFoo } from './foo';

class Home extends Component {
  handleClick = () => {
    this.props.addBar('bar');
  };

  render() {
    return (
      <div>
        <h1>Home</h1>
        <div>props:</div>
        <pre>{JSON.stringify(this.props, null, 4)}</pre>
        <button onClick={this.handleClick}>Add bar</button>
      </div>
    );
  }
}

Home.propTypes = {
  addBar: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  foo: getFoo(state),
});

const mapDispatchToProps = dispatch => ({
  addBar: bar => dispatch(addBar(bar)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
