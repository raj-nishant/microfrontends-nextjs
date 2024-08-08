import React, { useState, ChangeEvent } from "react";
import { Button, Form, Input } from "antd";
import { useRouter } from "next/router"; // Import useRouter from next/router
import style from "./LoginForm.module.css";

interface LoginFormProps {
  username: string;
}

const LoginForm: React.FC = () => {
  const router = useRouter(); // Initialize useRouter
  const [loginForm, setLoginForm] = useState<LoginFormProps>({ username: "" });
  const [isCreatingChallenge, setIsCreatingChallenge] = useState(false);

  const { username } = loginForm;

  const onChangeLoginForm = (event: ChangeEvent<HTMLInputElement>) =>
    setLoginForm({ ...loginForm, [event.target.name]: event.target.value });

  const login = (values: LoginFormProps) => {
    localStorage.setItem("username", values.username);
    router.push("/dashboard"); // Use router.push for navigation
  };

  const startChallenge = () => {
    setIsCreatingChallenge(true);
  };

  return (
    <div className={style.container}>
      <Form className={style.form} onFinish={login}>
        {isCreatingChallenge ? (
          <>
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input
                type="text"
                placeholder="Your Name"
                name="username"
                value={username}
                onChange={onChangeLoginForm}
                className={style.input}
              />
            </Form.Item>
            <Form.Item>
              <Button
                className={style.challangebtn}
                type="primary"
                htmlType="submit"
              >
                Login
              </Button>
            </Form.Item>
          </>
        ) : (
          <Button
            className={style.challangebtn}
            type="primary"
            onClick={startChallenge}
          >
            Create Challenge
          </Button>
        )}
      </Form>
    </div>
  );
};

export default LoginForm;
