/* eslint-disable no-nested-ternary */
import React from "react";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import { FormGroup, InputGroup, Label } from "reactstrap";

const CustomDatePicker = ({
  disabled,
  excludeTimes,
  error,
  isRequired,
  label,
  maxDate,
  maxTime,
  minDate,
  minTime,
  name,
  onChange,
  placeholder,
  showTimeSelect,
  showTimeSelectOnly,
  showYearPicker,
  value,
}) => (
  <FormGroup>
    {label && (
      <Label for={name}>
        {label}
        {isRequired && <span style={{ color: "red" }}> * </span>}
      </Label>
    )}
    <InputGroup>
      <DatePicker
        className={`form-control ${disabled && "disabled"}`}
        calendarClassName={showTimeSelect && "react-custom-datepicker"}
        placeholderText={placeholder || "Select Date"}
        selected={value}
        isClearable
        showMonthDropdown
        showYearDropdown
        yearDropdownItemNumber={10}
        scrollableYearDropdown
        closeOnScroll
        showTimeSelectOnly={showTimeSelectOnly}
        showTimeSelect={showTimeSelectOnly ? true : showTimeSelect}
        minDate={minDate}
        maxDate={maxDate}
        showYearPicker={showYearPicker}
        dateFormat={
          showYearPicker
            ? "yyyy"
            : showTimeSelect
            ? "MM/dd/yyyy h:mm aa"
            : showTimeSelectOnly
            ? "h:mm aa"
            : "MM/dd/yyyy"
        }
        minTime={minTime}
        maxTime={maxTime}
        excludeTimes={excludeTimes}
        disabled={disabled}
        onChange={(data) => onChange(name, data)}
      />
    </InputGroup>
    {error ? <span className='text-danger fs-12'>{error}</span> : null}
  </FormGroup>
);

CustomDatePicker.defaultProps = {
  disabled: false,
  error: "",
  excludeTimes: [],
  isRequired: false,
  label: "",
  maxDate: null,
  maxTime: {},
  minDate: null,
  minTime: {},
  placeholder: "Select date",
  showTimeSelect: false,
  showTimeSelectOnly: false,
  value: null,
};

CustomDatePicker.propTypes = {
  disabled: PropTypes.bool,
  error: PropTypes.string,
  excludeTimes: PropTypes.array,
  isRequired: PropTypes.bool,
  label: PropTypes.string,
  maxDate: PropTypes.object,
  maxTime: PropTypes.object,
  minDate: PropTypes.object,
  minTime: PropTypes.object,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  showTimeSelect: PropTypes.bool,
  showYearPicker: PropTypes.bool,
  showTimeSelectOnly: PropTypes.bool,
  value: PropTypes.object,
};

export default CustomDatePicker;
