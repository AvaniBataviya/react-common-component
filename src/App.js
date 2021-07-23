import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Row,
} from "reactstrap";
import CheckBox from "./components/CheckBox";
import CustomDatePicker from "./components/CustomDatePicker";
import CustomInput from "./components/CustomInput";
import FileUpload from "./components/FileUpload";
import RadioButton from "./components/RadioButton";
import ReactSelect from "./components/ReactSelect";
import { checkValidation } from "./helper";

const initailValue = {
  email: "",
  password: "",
  flavour: null,
  terms: false,
  employment: "fullEmployment",
  attachment: [
    "/b/yellow-crash-test-dummy-yellow-crash-test-dummy-car-seat-116968697.jpg",
  ],
  birthDate: null,
};
const App = () => {
  const [formData, setFormData] = useState(initailValue);
  const [errors, setErrors] = useState({});
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  const onSubmit = () => {
    const { email, password, flavour, terms, attachment, birthDate } = formData;
    const validationError = checkValidation(errors, {
      email,
      password,
      flavour: flavour?.value ? flavour.value : flavour,
      terms,
      attachment,
      birthDate,
    });
    if (Object.keys(validationError).length !== 0) {
      setErrors(validationError);
    } else {
      alert("Submiting.!!!");
    }
  };

  const onChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const validationHandler = (name, error) => {
    setErrors({
      ...errors,
      [name]: error,
    });
  };

  const { email, password, flavour, terms, employment, attachment, birthDate } =
    formData;
  const employmentOptions = [
    { label: "Full Employment", value: "fullEmployment" },
    { label: "Contractor", value: "contractor" },
  ];
  return (
    <Container>
      <Row className='h-100vh align-items-center'>
        <Col xs={12} sm={{ size: 6, offset: 3 }}>
          <Card>
            <CardBody>
              <CardTitle tag='h4' className='text-primary'>
                Form Demo
              </CardTitle>
              <CustomInput
                type={"email"}
                name='email'
                value={email}
                label='Email'
                placeholder={"Enter email"}
                isRequired={true}
                reqType={"email"}
                onChange={onChange}
                validationHandler={validationHandler}
                error={errors.email}
              />

              <CustomInput
                type={"password"}
                name='password'
                value={password}
                label='Password'
                placeholder={"Enter password"}
                isRequired={true}
                reqType={"password"}
                onChange={onChange}
                validationHandler={validationHandler}
                error={errors.password}
                helperText='Password must contain one capital latter, number and specical character with at least 8 character long.'
              />

              <CustomDatePicker
                name='birthDate'
                label='Select birth date'
                value={birthDate}
                onChange={onChange}
                error={errors.birthDate}
                isRequired
                placeholder='Select birth date'
                maxDate={new Date()}
              />

              <ReactSelect
                name='flavour'
                value={flavour}
                label='Slect flavour'
                options={options}
                isRequired
                onChange={onChange}
                error={errors.flavour}
                validationHandler={validationHandler}
              />

              <RadioButton
                name='employment'
                value={employment}
                label='Slect employement'
                onChange={onChange}
                error={errors.employment}
                validationHandler={validationHandler}
                options={employmentOptions}
              />

              <FileUpload
                name='attachment'
                label='Attachment (if any)'
                onChange={onChange}
                validationHandler={validationHandler}
                multiple
                maxFiles={2}
                value={attachment}
                error={errors.attachment}
              />

              <CheckBox
                name='terms'
                value={terms}
                label='Are you agree on terms?'
                isRequired
                onChange={onChange}
                error={errors.terms}
                validationHandler={validationHandler}
              />

              <Button color='primary' onClick={onSubmit}>
                Submit
              </Button>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default App;
