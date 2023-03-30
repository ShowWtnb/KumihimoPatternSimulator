import * as React from 'react';
// import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


export const pattern_types = [
    { id: 0, name: '奈良組' },
    // { id: -1, name: 'Invalid' },
];

// function getStyles(name, personName, theme) {
//     return {
//         fontWeight:
//             personName.indexOf(name) === -1
//                 ? theme.typography.fontWeightRegular
//                 : theme.typography.fontWeightMedium,
//     };
// }

export default function PatternSelector({ onSelectedPatternChanged }) {
    // const theme = useTheme();
    const [selectedType, setSelectedType] = React.useState(pattern_types[0].name);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setSelectedType(
            // On autofill we get a stringified value.
            (typeof (value) === 'string') ? value.split(',') : value,
        );
        onSelectedPatternChanged(value)
    };

    return (
        <div>
            <FormControl sx={{ m: 1, width: '15rem' }}>
                <InputLabel >Type</InputLabel>
                <Select
                    value={selectedType}
                    onChange={handleChange}
                    input={<OutlinedInput label="Type" />}
                >
                    {pattern_types.map((type) => (
                        <MenuItem
                            key={type.id}
                            value={type.name}
                        // style={getStyles(name, personName, theme)}
                        >
                            {type.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}