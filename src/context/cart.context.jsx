import { createContext, useReducer } from "react";

import { createAction } from "../utils/reducer/reducer.utils";

const addCartItem = (cartItems, productToAdd) => {
    // var newCartItems = [...cartItems];
    // if (newCartItems.find(item => item.id === productToAdd.id) === undefined) {
    //     const newProduct = {
    //         ...productToAdd,
    //         quantity: 1
    //     }
    //     newCartItems.push(newProduct);
    // }
    // else {
    //     newCartItems.find(item => item.id === productToAdd.id).quantity++
    // }
    // return newCartItems

    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id
    );

    if (existingCartItem) {
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id ?
            {...cartItem, quantity: cartItem.quantity + 1}
            : cartItem
        );
    }
    return [...cartItems, {...productToAdd, quantity: 1}]
}


const removeCartItem = (cartItems, cartItemToRemove) => {
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === cartItemToRemove.id
    );

    if (existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)
    }
    return cartItems.map((cartItem) => cartItem.id === cartItemToRemove.id ?
        {...cartItem, quantity: cartItem.quantity - 1}
        : cartItem
    );
}
const clearCartItem = (cartItems, cartItemToClear) => {
    return cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id)
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    cartCount: 0,
    cartTotal: 0
});



const INITIALSTATE = {
    isCartOpen: false, 
    cartItems: [], 
    cartCount: 0, 
    cartTotal: 0
};

// my-version

// export const CART_ACTION_TYPES = {
//     SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
//     ADD_ITEM_TO_CART: 'ADD_ITEM_TO_CART',
//     REMOVE_ITEM_FROM_CART: 'REMOVE_ITEM_FROM_CART',
//     CLEAR_ITEM_FROM_CART: 'CLEAR_ITEM_FROM_CART'
// }

// const cartReducer = (state, action) => {
//     console.log('Cart reducer dispatched')
//     const { type, payload } = action;
//     const { isCartOpen, cartItems, cartCount, cartTotal } = state;

//     switch(type) {
//         case CART_ACTION_TYPES.SET_IS_CART_OPEN:
//             return {
//                 ...state,
//                 isCartOpen: !isCartOpen
//             }
//         case CART_ACTION_TYPES.ADD_ITEM_TO_CART:
//             const existingCartItem = cartItems.find(
//                 (cartItem) => cartItem.id === payload.id
//             );
//             if (existingCartItem) {
//                 const newCartItems = cartItems.map((cartItem) => cartItem.id === payload.id ?
//                     {...cartItem, quantity: cartItem.quantity + 1}
//                     : cartItem
//                 );
//                 return {
//                     ...state,
//                     cartItems: newCartItems,
//                     cartCount: cartCount + 1,
//                     cartTotal: cartTotal + payload.price
//                 }
//             }
//             return {
//                 ...state,
//                 cartItems: [...cartItems, {...payload, quantity: 1}],
//                 cartCount: cartCount + 1,
//                 cartTotal: cartTotal + payload.price
//             } 

//         case CART_ACTION_TYPES.REMOVE_ITEM_FROM_CART:
//             const cartItemToRemove = cartItems.find(
//                 (cartItem) => cartItem.id === payload.id
//             );
//             if (cartItemToRemove.quantity === 1) {
//                 return {
//                     ...state,
//                     cartItems: cartItems.filter(cartItem => cartItem.id !== payload.id),
//                     cartCount: cartCount - 1,
//                     cartTotal: cartTotal - payload.price
//                 }
//             }
//             const newCartItems = cartItems.map((cartItem) => cartItem.id === payload.id ?
//                 {...cartItem, quantity: cartItem.quantity - 1}
//                 : cartItem
//             );
//             return {
//                 ...state,
//                 cartItems: newCartItems,
//                 cartCount: cartCount - 1,
//                 cartTotal: cartTotal - payload.price
//             }
//         case CART_ACTION_TYPES.CLEAR_ITEM_FROM_CART:
//             return {
//                 ...state,
//                 cartItems: cartItems.filter(cartItem => cartItem.id !== payload.id),
//                 cartCount: cartCount - payload.quantity,
//                 cartTotal: cartTotal - payload.price*payload.quantity
//             }
//         default :
//             throw new Error(`Unhandled type ${type} in cartReducer`)
//     }
// }

const CART_ACTION_TYPES = {
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN'
}

const cartReducer = (state, action) => {
    const {type, payload} = action
    switch(type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload
            }
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload
            }
        default :
            throw new Error(`Unhandled type ${type} in cartReducer`)
    }
}



export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, INITIALSTATE);
    const { isCartOpen, cartItems, cartCount, cartTotal } = state;
    
    const updateCartItemReducer = (newCartItems) => {
        const newCartCount = newCartItems.reduce(
            (total, cartItem) => total + cartItem.quantity, 
            0
        );
        const newCartTotal = newCartItems.reduce(
            (total, cartItem) => total + cartItem.quantity * cartItem.price, 
            0
        );

        dispatch(
            createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
                cartItems: newCartItems, 
                cartCount: newCartCount, 
                cartTotal: newCartTotal 
            })
        );
    };
    

    const setIsCartOpen = (bool) => {
        dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool))
    }

    const addItemToCart = (productToAdd) => {
        // dispatch({ type: CART_ACTION_TYPES.ADD_ITEM_TO_CART, payload: productToAdd });
        const newCartItems = addCartItem(cartItems, productToAdd);
        updateCartItemReducer(newCartItems);
    }

    const removeItemFromCart = (cartItemToRemove) => {
        // dispatch({ type: CART_ACTION_TYPES.REMOVE_ITEM_FROM_CART, payload: cartItemToRemove });
        const newCartItems = removeCartItem(cartItems, cartItemToRemove);
        updateCartItemReducer(newCartItems);
    }

    const clearItemFromCart = (cartItemToClear) => {
        // dispatch({ type: CART_ACTION_TYPES.CLEAR_ITEM_FROM_CART, payload: cartItemToClear });
        const newCartItems = clearCartItem(cartItems, cartItemToClear);
        updateCartItemReducer(newCartItems);
    }

    const value = { 
        isCartOpen, 
        setIsCartOpen, 
        addItemToCart, 
        removeItemFromCart, 
        clearItemFromCart, 
        cartItems, 
        cartCount, 
        cartTotal 
    };

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
};