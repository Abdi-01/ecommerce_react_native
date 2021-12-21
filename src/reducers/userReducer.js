const INITIAL_STATE = {
    id: null,
    username: "",
    email: "",
    role: "",
    status: "",
    photo: "",
    cart: []
}

export const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "LOGIN_SUCCESS":
            return { ...state, ...action.payload }
        case "LOGOUT":
            return INITIAL_STATE
        case "UPDATE_CART":
            return { ...state, cart: action.payload }
        case "UPDATE_PHOTO":
            return { ...state, photo: action.payload }
        default:
            return state
    }
}