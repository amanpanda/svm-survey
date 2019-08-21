import React from 'react';
import './LogIn.css';
import { Form, Icon, Input, Button } from 'antd';

const hasErrors = (fieldsError) => Object.keys(fieldsError).some(field => fieldsError[field]);

const LogInPresenter = (props) => {
  const {
    form: { 
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched,
    },
    onSubmit,
    disableLogIn,
  } = props;
  const usernameError = isFieldTouched('username') && getFieldError('username');
  const passwordError = isFieldTouched('password') && getFieldError('password');
  return (
    <div className='container'>
      <div className='login-form-wrapper'>
        <Form onSubmit={onSubmit} className="login-form">
          <h1>Welcome Back.</h1>
          <p>Please input your credentials to log in.</p>
          <Form.Item
            validateStatus={usernameError ? 'error' : ''}
            help={usernameError || ''}
          >
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Username is required.' }],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Username"
              />,
            )}
          </Form.Item>
          <Form.Item
            validateStatus={passwordError ? 'error' : ''}
            help={passwordError || ''}>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Password is required.' }],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="Password"
                />,
              )}
          </Form.Item>
          <Form.Item>
            <Button
              type="primary" 
              htmlType="submit"
              className="login-form-button"
              disabled={hasErrors(getFieldsError()) || disableLogIn}
              size='large'
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LogInPresenter;
