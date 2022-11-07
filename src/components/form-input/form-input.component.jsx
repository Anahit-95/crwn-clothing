import {Group, FormInputLabel, Input} from './form.input.styles.jsx';

const FormInput = ({label, inputOptions}) => {
    return (
        <Group>
            <Input {...inputOptions}/>
            {label &&
                <FormInputLabel shrink={inputOptions.value.length}>
                    {label}
                </FormInputLabel>
            }
        </Group>
    )
};

export default FormInput;