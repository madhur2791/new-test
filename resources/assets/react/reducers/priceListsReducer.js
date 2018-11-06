import {
    REQUEST_PRICING_LISTS,
    RECEIVE_PRICING_LISTS,
    REQUEST_PRICING_LISTS_ERROR
} from '../constants/actionTypes';

const initialState = {
};

function priceListReducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_PRICING_LISTS: {
      return {
        ...state,
        isFetching: true
      };
    }
    case RECEIVE_PRICING_LISTS: {
      const { payload: { priceList } } = action;
      return {
        ...state,
        isFetching: false,
        data: priceList
      };
    }
    case REQUEST_PRICING_LISTS_ERROR: {
      const { payload: { error } } = action;
      return {
        ...state,
        isFetching: false,
        error
      };
    }

    default:
      return state;
  }
}

export default priceListReducer;
