import { useDispatch, useSelector } from "react-redux";
import styles from "./auth.module.scss";
import { AppDispatch, RootState } from "../../app/store";
import * as React from "react";
import { fetchLogin } from "../../features/loginSlice";
import { userDataType } from "../../types/login";
import { useNavigate } from "react-router";


function Login() {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const { error, token } = useSelector((state: RootState) => state.login);
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
console.log(token);

  const useData = { email, password } as userDataType;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(fetchLogin(useData));
    setEmail("");
    setPassword("");
  };

  React.useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [navigate, token]);

  return (
    <div className={styles.auth}>
      /
      <div className={styles.container}>
        <div className={styles.auth_item}>
          <h2 style={{ color: "#fff" }}>Sing in</h2>
          <form onSubmit={(e) => handleSubmit(e)} className={styles.auth_from}>
            <div className={styles.auth_input + " " + styles.input_email}>
              <span>Email</span>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="Enter your email address"
              />
            </div>
            <div className={styles.auth_input + " " + styles.input_password}>
              <span>Password</span>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="Enter your password"
              />
            </div>
            <button className={styles.btn_auth}>Войти</button>
          </form>
          
         {error && <div style={{color: "red"}} className={styles.auth_error}>{error}</div>}
        </div>

      </div>
    </div>
  );
}

export default Login;
