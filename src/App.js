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
import "./App.css";
import CustomInput from "./components/CustomInput";
import { checkValidation } from "./helper";

const initailValue = {
  email: "",
  password: "",
};
const App = () => {
  const [formData, setFormData] = useState(initailValue);
  const [errors, setErrors] = useState({});

  const onSubmit = () => {
    const { email, password } = formData;
    const validationError = checkValidation(errors, {
      email,
      password,
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

  const { email, password } = formData;
  return (
    <Container>
      <Row className='h-100vh align-items-center'>
        <Col xs={12} sm={{ size: 6, offset: 3 }}>
          <Card>
            <CardBody>
              <CardTitle tag='h4' className='text-primary'>
                Login
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
