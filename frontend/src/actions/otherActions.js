import axios from 'axios'

export const visit = (profile_id, item_id) => async (dispatch, getState) => {
    try {
        dispatch({ type: 'VISIT_REQUEST' })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(
            `/api/users/profile/visit/${profile_id}/${item_id}/`,
            config
        )

        dispatch({
            type: 'VISIT_SUCCESS',
            payload: data
        })

    } catch (error) {
        dispatch({
            type: 'VISIT_FAIL',
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const getItemsXML = () => async (dispatch,) => {
    try {
        dispatch({ type: 'XML_REQUEST' })

        const { data } = await axios.get('/api/XMLexport/')

        dispatch({ type: 'XML_SUCCESS' })

    } catch (error) {
        dispatch({
            type: 'XML_FAIL',
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}