import React from 'react';
import {connect} from 'react-redux';
import {FormList} from '../components/Form';

const mapStateToProps = (state) => (
  {
    forms: state.forms
  }
);

export default connect(mapStateToProps)(FormList);
