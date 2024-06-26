import { Input } from '@douyinfe/semi-ui';
import { ErrorMessage } from 'formik';
import { BasicTag } from '@/components/atoms';
import PropTypes from 'prop-types';


type BasicInputFieldProps = {
    field?: any,
    type?: string,
    maxLength?: number,
    placeholder?: string,
    disabled?: boolean,
}

const BasicInputField = (props: BasicInputFieldProps) => {
    const { field, type, placeholder, maxLength, disabled } = props;
    const { name } = field;

    return (
        <div>
            <Input
                {...field}
                type={type}
                maxLength={maxLength}
                placeholder={placeholder}
                disabled={disabled}
            />
            <ErrorMessage name={name}>
                {(text) => <BasicTag title={text} />}
            </ErrorMessage>
        </div>
    );
}

BasicInputField.propTypes = {
    type: PropTypes.string,
    placeholder: PropTypes.string,
    maxLength: PropTypes.number,
    disabled: PropTypes.bool,
};

BasicInputField.defaultProps = {
    type: 'text',
    placeholder: '',
    maxLength: 100,
    disabled: false,
};

export default BasicInputField;
