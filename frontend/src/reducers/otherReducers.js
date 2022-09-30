export const visitReducer = (state = {}, action) => {
    switch (action.type) {
        case 'VISIT_REQUEST':
            return { loading: true }

        case 'VISIT_SUCCESS':
            return { loading: false, success: true, }

        case 'VISIT_FAIL':
            return { loading: false, error: action.payload }

        default:
            return state
    }
}