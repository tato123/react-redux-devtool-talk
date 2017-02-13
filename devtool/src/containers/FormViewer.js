import React from 'react';
import {connect} from 'react-redux';
import PendoDebugger from '../components/PendoDebugger';
import {filterAggregations} from '../actions';

const getVisibleAggregations = (aggregations, text) => {
  return aggregations.filter( ({name}) => {
      if ( text ) {
          return name.search(new RegExp(text, 'i')) !== -1;
      }
      return true;
  });
};

const mapStateToProps = (state) => {
    const {aggregations, filters} = state;
  return Object.assign({}, state, {
    aggregations: getVisibleAggregations(aggregations, filters)
  });
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTextChange: (text) => {
      dispatch(filterAggregations(text));
    }
  };
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PendoDebugger);
