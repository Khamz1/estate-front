import React, { useEffect } from "react";
import styles from "./header.module.scss";
import favicon from "../../acces/icons/favicon.ico";
import account from "../../acces/icons/account.svg";
import favorite from "../../acces/icons/favorite.svg";
import { useDispatch, useSelector } from "react-redux";
import { getOneUser } from "../../features/authSlice";
import { Link } from "react-router-dom";
const Header = () => {
  const user = useSelector((state) => state.auth.user.favorites);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOneUser());
  }, [dispatch]);

  // Проверяем, что user не равен undefined, и устанавливаем значение по умолчанию 0
  const userLength = user ? user.length : 0;

  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <img src={favicon} alt="" />
      </div>
      <ul className={styles.menu}>
        <li>О нашей компании</li>
        <li>Наши ЖК</li>
        <li>Местоположение ЖК</li>
        <li>Условия рассрочки</li>
      </ul>
      <div className={styles.header_right}>
        {userLength > 0 ? (
          <Link to="/cards">
            {" "}
            <div className={styles.phone}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="48"
                viewBox="0 -960 960 960"
                width="48"
              >
                <path d="m480-121-41-37q-105.768-97.121-174.884-167.561Q195-396 154-451.5T96.5-552Q80-597 80-643q0-90.155 60.5-150.577Q201-854 290-854q57 0 105.5 27t84.5 78q42-54 89-79.5T670-854q89 0 149.5 60.423Q880-733.155 880-643q0 46-16.5 91T806-451.5Q765-396 695.884-325.561 626.768-255.121 521-158l-41 37Zm0-79q101.236-92.995 166.618-159.498Q712-426 750.5-476t54-89.135q15.5-39.136 15.5-77.72Q820-709 778-751.5T670.225-794q-51.524 0-95.375 31.5Q531-731 504-674h-49q-26-56-69.85-88-43.851-32-95.375-32Q224-794 182-751.5t-42 108.816Q140-604 155.5-564.5t54 90Q248-424 314-358t166 158Zm0-297Z" />
              </svg>
              <span className={styles.counter}>{userLength}</span>
            </div>
          </Link>
        ) : (
          ""
        )}
        <div className={styles.phone}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="48"
            viewBox="0 -960 960 960"
            width="48"
          >
            <path d="M222-255q63-44 125-67.5T480-346q71 0 133.5 23.5T739-255q44-54 62.5-109T820-480q0-145-97.5-242.5T480-820q-145 0-242.5 97.5T140-480q0 61 19 116t63 109Zm257.814-195Q422-450 382.5-489.686q-39.5-39.686-39.5-97.5t39.686-97.314q39.686-39.5 97.5-39.5t97.314 39.686q39.5 39.686 39.5 97.5T577.314-489.5q-39.686 39.5-97.5 39.5Zm.654 370Q398-80 325-111.5q-73-31.5-127.5-86t-86-127.266Q80-397.532 80-480.266T111.5-635.5q31.5-72.5 86-127t127.266-86q72.766-31.5 155.5-31.5T635.5-848.5q72.5 31.5 127 86t86 127.032q31.5 72.532 31.5 155T848.5-325q-31.5 73-86 127.5t-127.032 86q-72.532 31.5-155 31.5ZM480-140q55 0 107.5-16T691-212q-51-36-104-55t-107-19q-54 0-107 19t-104 55q51 40 103.5 56T480-140Zm0-370q34 0 55.5-21.5T557-587q0-34-21.5-55.5T480-664q-34 0-55.5 21.5T403-587q0 34 21.5 55.5T480-510Zm0-77Zm0 374Z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Header;
