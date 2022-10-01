import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

function SearchBox() {
    const [keyword, setKeyword] = useState('')

    const navigate = useNavigate()

    // let history = useHistory()

    const submitHandler = (e) => {
        e.preventDefault()
        if (keyword) {
            console.log(keyword)
            navigate(`/?keyword=${keyword}&page=1`)
            // setKeyword(0)
        } else {
            // navigation.push(navigation.push(navigation.location.pathname))
            window.history.go()
        }
    }
    return (
        <Form id='form1' onSubmit={submitHandler} inline="true">
            <Form.Control
                type='text'
                name='q'
                onChange={(e) => setKeyword(e.target.value)}
                className='mr-sm-2 ml-sm-5'
            ></Form.Control>

            <Button
                type='submit'
                variant='outline-secondary'
                className='p-2'
            >
                Search
            </Button>
        </Form>
    )
}

export default SearchBox
