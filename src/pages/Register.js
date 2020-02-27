import React, { useContext, useState } from "react";
import { Form, Button, Grid, Segment } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { AuthContext } from "../context/auth";
import { useForm } from "../util/hooks";

const Register = props => {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(registerUser, {
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(proxy, { data: { register: userData } }) {
      context.login(userData);
      props.history.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values
  });

  function registerUser() {
    addUser();
  }

  return (
    <Grid textAlign="center" verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Form
          onSubmit={onSubmit}
          noValidate
          className={loading ? "loading" : ""}
        >
          <h1 style={{ color: "#00b5ad" }}>Register</h1>
          <Segment stacked>
            <Form.Input
              label="Username"
              placeholder="Username.."
              name="username"
              type="text"
              value={values.username}
              error={errors.username ? true : false}
              onChange={onChange}
              fluid
            />
            <Form.Input
              label="Email"
              placeholder="Email.."
              name="email"
              type="email"
              value={values.email}
              error={errors.email ? true : false}
              onChange={onChange}
              fluid
            />
            <Form.Input
              label="Password"
              placeholder="Password.."
              name="password"
              type="password"
              value={values.password}
              error={errors.password ? true : false}
              onChange={onChange}
              fluid
            />
            <Form.Input
              label="Confirm Password"
              placeholder="Confirm Password.."
              name="confirmPassword"
              type="password"
              value={values.confirmPassword}
              error={errors.confirmPassword ? true : false}
              onChange={onChange}
              fluid
            />
            <Button
              type="submit"
              primary
              fluid
              style={{ backgroundColor: "#00b5ad" }}
            >
              Register
            </Button>
          </Segment>
        </Form>
        {Object.keys(errors).length > 0 && (
          <div className="ui error message">
            <ul className="list">
              {Object.values(errors).map(value => (
                <li key={value}>{value}</li>
              ))}
            </ul>
          </div>
        )}
      </Grid.Column>
    </Grid>
  );
};

const REGISTER_USER = gql`
  mutation regitser(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Register;
