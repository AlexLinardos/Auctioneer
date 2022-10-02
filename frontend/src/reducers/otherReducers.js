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

export const itemsXMLReducer = (state = {}, action) => {
    switch (action.type) {
        case 'XML_REQUEST':
            return { loading: true }

        case 'XML_SUCCESS':
            return { loading: false, success: true, }

        case 'XML_FAIL':
            return { loading: false, error: action.payload }

        default:
            return state
    }
}