import React from "react";
import { FormGroup, FormText, Input, Label } from "reactstrap";
import { getRegExp, getSentenceFromCamelCase } from "../helper";

const CustomInput = ({
  checked,
  className,
  disabled,
  error,
  fixLength,
  helperText,
  isRequired,
  label,
  minLength,
  maxLength,
  name,
  onChange,
  placeholder,
  reqType,
  style,
  type,
  validationHandler,
  value,
}) => {
  const onChangeHandler = (e, onInputChange) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;
    onInputChange(name, inputValue);
  };

  const onValidationChange = (e, validationHandler) => {
    if (!validationHandler) return;
    const { value } = e.target;
    let errorMessage = "";
    if (!value && isRequired) {
      errorMessage = `Please enter ${getSentenceFromCamelCase(name)}.`;
    } else if (minLength && value.length < minLength) {
      errorMessage = `${
        name.charAt(0).toUpperCase() + getSentenceFromCamelCase(name).slice(1)
      } must be at least ${minLength} characters long.`;
    } else if (maxLength && value.length > maxLength) {
      errorMessage = `${
        name.charAt(0).toUpperCase() + getSentenceFromCamelCase(name).slice(1)
      } must be ${minLength} characters long.`;
    } else if (fixLength && value.length !== fixLength) {
      errorMessage = `${
        name.charAt(0).toUpperCase() + getSentenceFromCamelCase(name).slice(1)
      } must be ${fixLength} characters.`;
    } else if (value && reqType && !getRegExp(reqType).test(value)) {
      errorMessage = `Please enter valid ${getSentenceFromCamelCase(name)}.`;
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
      <Input
        type={type}
        name={name}
        id={name}
        value={value}
        checked={checked}
        placeholder={placeholder}
        className={className}
        style={style}
        disabled={disabled}
        onChange={(e) => onChangeHandler(e, onChange)}
        onBlur={(e) => onValidationChange(e, validationHandler)}
      />
      {helperText && <FormText color='muted'>{helperText}</FormText>}
      {error ? <span className='text-danger fs-12'>{error}</span> : null}
    </FormGroup>
  );
};

export default CustomInput;
