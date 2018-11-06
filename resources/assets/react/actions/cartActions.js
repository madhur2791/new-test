import {
    REQUEST_PRICING_LISTS,
    RECEIVE_PRICING_LISTS,
    REQUEST_PRICING_LISTS_ERROR,
    REQUEST_ADD_TO_CART,
    ADD_TO_CART_ERROR,
    ADD_TO_CART_SUCCESS
} from '../constants/actionTypes';


function requestPricingLists() {
    return {
        type: REQUEST_PRICING_LISTS,
        payload: {}
    };
}

function receivePricingLists(priceList) {
    return {
        type: RECEIVE_PRICING_LISTS,
        payload: {
            priceList
        }
    };
}

function requestPricingListsError(error) {
  return {
    type: REQUEST_PRICING_LISTS_ERROR,
    payload: {
        error
    }
  };
}

export function fetchPricingLists() {
  return (
    (dispatch) => {
      dispatch(requestPricingLists());
      return (
        axios.get(`/web-api/price-lists`).then((response) => {
          dispatch(receivePricingLists(response.data));
        }).catch((error) => {
          dispatch(requestPricingListsError(error));
        })
      );
    }
  );
}


// function addToCartRequest() {
//     return {
//         type: REQUEST_ADD_TO_CART,
//         payload: {}
//     };
// }


// function addToCartError(error) {
//   return {
//     type: ADD_TO_CART_ERROR,
//     payload: {
//         error
//     }
//   };
// }

// function addToCartSuccess() {
//   return {
//     type: ADD_TO_CART_SUCCESS,
//     payload: {}
//   };
// }

// export function addToCart(mediaId, priceOptions, generatedImage) {
//   return (
//     (dispatch) => {
//       dispatch(addToCartRequest());
//       return (
//         axios.post(`/web-api/carts`, {mediaId, priceOptions, generatedImage: generatedImage.innerHTML}).then(() => {
//           dispatch(addToCartSuccess());
//         }).catch((error) => {
//           dispatch(addToCartError(error));
//         })
//       );
//     }
//   );
// }

