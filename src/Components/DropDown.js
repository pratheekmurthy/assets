import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const SelectSmall = (props) => {
    const [age, setAge] = React.useState('');

    const handleChange = (e) => {
        setAge(e.target.value)
        props.handleDropdown(e.target.value, props.dropDown)
    }


    return (
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small">{props.dropDown}</InputLabel>
            <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={age}
                label={props.dropDown}
                onChange={handleChange}
            >
                <MenuItem value="">
                    <em>Select </em>
                </MenuItem>
                {
                    props.dropDownValues.map((ele) => {
                        return (<MenuItem value={ele}>{ele}</MenuItem>)
                    })
                }
            </Select>
        </FormControl>
    );
}

export default SelectSmall