import { Button, Divider, Form, Input, notification } from 'antd';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const onFinish = (values) => {

    axios
      .post('http://localhost:8000/user/login', values)
      .then((res) => {
        const { token, ...rest } = res.data.data;

        notification.success({
          message: 'Logined Successfully!',
        });

        // Store the login status in local storage
        localStorage.setItem('isLoggedIn', true);
        // Store the token in local storage
        localStorage.setItem('token', token);
        // Store the user details in local storage
        localStorage.setItem('userInfo', JSON.stringify(rest));

        navigate('/');
      })
      .catch((err) => {
        console.log('====================================');
        console.log(err.message);
        console.log('====================================');
        notification.error({
          message: err.response.data.error.message,
        });
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className=" flex self-center items-center w-full justify-center h-[100vh] align-middle content-center">
      <Form
        layout="vertical"
        className="w-[40%] bg-white p-5 rounded-md shadow-md h-auto"
        name="login"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off">
        <h1 className="p-2 text-2xl">Login</h1>
        <Form.Item
          label="Username"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}>
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}>
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button className=" bg-blue-500 w-full text-white" htmlType="submit">
            Submit
          </Button>
        </Form.Item>

        <Divider>OR</Divider>

        <Form.Item className="w-full text-center">
          <Link
            className=" text-blue-500 w-full text-center font-bold font-sans "
            to="/register">
            New Here? Click Me!
          </Link>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Login;
