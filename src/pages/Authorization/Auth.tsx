import { useDispatch, useSelector } from "react-redux";
import styles from "./auth.module.scss";
import * as React from "react";
import { AppDispatch, RootState } from "../../app/store";
import { authSignUp } from "../../features/authSlice";
import { useNavigate } from "react-router";
function Auth() {
  const dispatch: AppDispatch = useDispatch();
  const [fullName, setFullName] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const navigate = useNavigate();
  const authError = useSelector((state: RootState) => state.auth.error);
  const handleSetAuth = (e: any) => {
    setEmail(e.target.value);
  };

  const handleSetPassword = (e: any) => {
    setPassword(e.target.value);
  };

  const handleFullName = (e: any) => {
    setFullName(e.target.value);
  };

  const handleSignUp = (e: any) => {
    e.preventDefault();
    dispatch(authSignUp({ email, password, fullName }));

    setEmail("");
    setPassword("");
    setFullName("");
  };
  const token = useSelector((state: RootState) => state.auth.token);
  console.log(token);
  
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
          <h2 style={{ color: "#fff" }}>Sing up</h2>
          <form className={styles.auth_from} onSubmit={(e) => handleSignUp(e)}>
            <div className={styles.auth_input + " " + styles.input_name}>
              <p>Name</p>
              <input value={fullName} onChange={handleFullName} type="Name" placeholder="Enter your Name" />
            </div>
            <div className={styles.auth_input + " " + styles.input_email}>
              <span>Email</span>
              <input value={email} onChange={handleSetAuth} type="email" placeholder="Enter your email address" />
            </div>
            <div className={styles.auth_input + " " + styles.input_password}>
              <span>Password</span>
              <input value={password} onChange={handleSetPassword} type="password" placeholder="Enter your password" />
            </div>
            <button className={styles.btn_auth}>Sing up</button>
            
          </form>
          {authError && <div className={styles.auth_error}>{authError}</div>}
        </div>

        
      </div>
    </div>
  );
}

export default Auth;
