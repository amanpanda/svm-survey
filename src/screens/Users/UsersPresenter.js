import React from 'react';
import './Users.css';
import { Header } from '../';
import { Form, Input, Icon, Button, Card, Checkbox, Table } from 'antd';

const hasErrors = (fieldsError) => Object.keys(fieldsError).some(field => fieldsError[field]);

const columns = [
  {
    title: 'Email Address',
    dataIndex: 'email',
    key: 'email',
    width: 250,
  },
  {
    title: 'User ID',
    dataIndex: 'uid',
    key: 'uid',
    width: 100,
  },
  {
    title: 'Is Admin',
    dataIndex: 'isAdmin',
    key: 'isAdmin',
    width: 100,
    render: isAdmin => isAdmin && <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" />,
  },
];

const UsersPresenter = (props) => {
  const {
    disableSubmit,
    username,
    password,
    confirmPassword,
    setUsername,
    setPassword,
    setConfirmPassword,
    submitNewUser,
    setIsAdmin,
    isAdmin,
    loading,
    usersList,
  } = props;
  return (
    <div className='users-wrapper'>
      <Header title='Users'/>
      <div className='users-content'>
        <Card
          title="Add a New User"
          className='add-user-card'
        >
          <Input 
            placeholder="Enter a username ending with @smartvillagemovement.org"
            size="large"
            className='create-user-input'
            value={username}
            onChange={s => setUsername(s)}

          />
          <Input 
            placeholder="Enter a password with at least 6 characters"
            size="large"
            className='create-user-input'
            value={password}
            onChange={s => setPassword(s)}
          />
          <Input 
            placeholder="Confirm password"
            size="large"
            className='create-user-input'
            value={confirmPassword}
            onChange={s => setConfirmPassword(s)}
          />
          <div style={{marginBottom: 20}}>
            <Checkbox
              onChange={v => setIsAdmin(v.target.checked)}
              value={isAdmin}
            >
              Make this user an admin.
            </Checkbox>
          </div>
          <Button
            type="primary"
            size="large"
            disabled={disableSubmit}
            onClick={() => submitNewUser()}
          >
            Create User
          </Button>
        </Card>
        <div className='users-inner-wrapper'>
          <Table
            dataSource={usersList}
            {...{ loading, columns }}
          />
        </div>
      </div>
    </div>
  );
};

export default UsersPresenter;
