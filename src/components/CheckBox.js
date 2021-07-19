import React from "react";
import { FormGroup, CustomInput } from "reactstrap";
import PropTypes from "prop-types";
import { getSentenceFromCamelCase } from "../helper";

const CheckBox = ({
  className,
  disabled,
  error,
  isRequired,
  label,
  name,
  onChange,
  style,
  validationHandler,
  value,
}) => {
  const onChangeHandler = (event) => {
    const { name, checked } = event.target;
    onChange && onChange(name, checked);
  };

  const onValidationChange = (event) => {
    if (!validationHandler) return;
    const { checked } = event.target;
    let errorMessage = "";
    if (!checked && isRequired) {
      errorMessage = `Please check ${getSentenceFromCamelCase(name)}.`;
    }
    validationHandler(name, errorMessage);
  };

  return (
    <FormGroup>
      <CustomInput
        type='checkbox'
        name={name}
        id={name}
        checked={value}
        className={className}
        label={
          isRequired ? (
            <>
              {label}
              <span className='text-danger'>*</span>{" "}
            </>
          ) : (
            label
          )
        }
        style={style}
        disabled={disabled}
        onChange={onChangeHandler}
        onBlur={onValidationChange}
      />
      {error ? <span className='text-danger fs-12'>{error}</span> : null}
    </FormGroup>
  );
};

CheckBox.defaultProps = {
  className: "",
  disabled: false,
  error: "",
  isRequired: false,
  label: "",
  style: {},
  validationHandler: () => {},
};

CheckBox.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  isRequired: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  style: PropTypes.object,
  validationHandler: PropTypes.func,
  value: PropTypes.any.isRequired,
};

export default CheckBox;
