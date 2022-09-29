import React from 'react';

import Select from 'react-select';
// import { colourOptions } from '../data';

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]

function CategoryInput() {
    return (
        <Select
            // defaultValue={[options[2], options[3]]}
            isMulti
            name="categories"
            options={options}
            className="basic-multi-select"
            classNamePrefix="select"
        />
    )
}

export default CategoryInput