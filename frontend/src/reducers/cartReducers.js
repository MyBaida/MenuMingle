import { CART_ADD_ITEM, 
    CART_REMOVE_ITEM, 
 } from '../constants/cartConstants'








export const cartReducer = (state={cartItems:[]}, action) => {
    switch(action.type) {
        case CART_ADD_ITEM: {
            // action.payload.qty is a DELTA (e.g. +1 to add one more, -1 to remove one).
            const item = action.payload;
            const existItem = state.cartItems.find(x => x.menuItem === item.menuItem);

            if (existItem) {
                const newQty = existItem.qty + item.qty;

                // Drop the line entirely if the quantity falls to zero or below.
                if (newQty <= 0) {
                    return {
                        ...state,
                        cartItems: state.cartItems.filter(x => x.menuItem !== item.menuItem),
                    };
                }

                return {
                    ...state,
                    cartItems: state.cartItems.map(x =>
                        x.menuItem === item.menuItem ? { ...x, qty: newQty } : x),
                };
            }

            // New line: ignore non-positive quantities.
            if (item.qty <= 0) return state;

            return {
                ...state,
                cartItems: [...state.cartItems, item],
            };
        }

        case CART_REMOVE_ITEM:
            return{
                ...state,
                cartItems:state.cartItems.filter(x=> x.menuItem !== action.payload)
                }

    //        case CART_SAVE_SHIPPING_ADDRESS:
    //   return {
    //     ...state,
    //     shippingAddress: action.payload,
    //   };


    //   case CART_SAVE_PAYMENT_METHOD:
    //     return{
    //         ...state,
    //         paymentMethod:action.payload,
    //     }
    


        default:
            return state
    }
}
