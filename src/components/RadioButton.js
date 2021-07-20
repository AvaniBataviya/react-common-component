import React from "react";
import { FormGroup, CustomInput, Label } from "reactstrap";
import PropTypes from "prop-types";
import { getSentenceFromCamelCase } from "../helper";

const RadioButton = ({
  className,
  disabled,
  error,
  isRequired,
  label,
  name,
  onChange,
  options,
  style,
  validationHandler,
  value,
}) => {
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    onChange && onChange(name, value);
  };

  const onValidationChange = (event) => {
    if (!validationHandler) return;
    const { value } = event.target;
    let errorMessage = "";
    if (!value && isRequired) {
      errorMessage = `Please enter ${getSentenceFromCamelCase(name)}.`;
    }
    validationHandler(name, errorMessage);
  };

  return (
    <FormGroup>
      {label ? (
        <>
          <Label for={name}>{label}</Label>
          {isRequired ? <span className='text-danger'>*</span> : null}
        </>
      ) : null}
      <>
        {options.map((option) => (
          <CustomInput
            checked={option.value === value}
            disabled={disabled}
            className={className}
            id={option.value}
            key={option.value}
            label={option.label}
            name={name}
            onBlur={onValidationChange}
            onChange={onChangeHandler}
            style={style}
            type='radio'
            value={option.value}
          />
        ))}
      </>
      {error ? <span className='text-danger fs-12'>{error}</span> : null}
    </FormGroup>
  );
};

RadioButton.defaultProps = {
  className: "",
  disabled: false,
  error: "",
  isRequired: false,
  label: "",
  style: {},
  validationHandler: () => {},
};

RadioButton.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  isRequired: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  style: PropTypes.object,
  validationHandler: PropTypes.func,
  value: PropTypes.any.isRequired,
};

export default RadioButton;
