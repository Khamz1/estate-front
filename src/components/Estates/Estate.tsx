import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEstates } from "../../features/estate.slice";
import styles from './Estate.module.scss'
import { addFavorite } from "../../features/authSlice";
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />


function Estate() {
  const estates = useSelector((state) => state.estates.estates);
  const user = useSelector((state) => state.auth.user.favorites);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchEstates());
  }, [dispatch]);




  const handleFavoriteToggle = (estateId) => {

    dispatch(addFavorite(estateId))

  }

  // }



  return (
    <>
      <div className={styles.box}>

        {
          estates.map(item => {
            return (
              <div key={item._id} className={styles.card}>
             <div>
             <div className={styles.card_top}>
                  <div className={styles.roomsCount} ></div>
                  <div className={styles.vertical_svg}>
                    {
                      user?.includes(item._id)
                        ? <svg className={styles.favoriteIcon} onClick={() => handleFavoriteToggle(item._id)} xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="m480-121-41-37q-106-97-175-167.5t-110-126Q113-507 96.5-552T80-643q0-90 60.5-150.5T290-854q57 0 105.5 27t84.5 78q42-54 89-79.5T670-854q89 0 149.5 60.5T880-643q0 46-16.5 91T806-451.5q-41 55.5-110 126T521-158l-41 37Z" /></svg>
                        : <svg className={styles.favoriteIcon} onClick={() => handleFavoriteToggle(item._id)} xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="m480-121-41-37q-105.768-97.121-174.884-167.561Q195-396 154-451.5T96.5-552Q80-597 80-643q0-90.155 60.5-150.577Q201-854 290-854q57 0 105.5 27t84.5 78q42-54 89-79.5T670-854q89 0 149.5 60.423Q880-733.155 880-643q0 46-16.5 91T806-451.5Q765-396 695.884-325.561 626.768-255.121 521-158l-41 37Zm0-79q101.236-92.995 166.618-159.498Q712-426 750.5-476t54-89.135q15.5-39.136 15.5-77.72Q820-709 778-751.5T670.225-794q-51.524 0-95.375 31.5Q531-731 504-674h-49q-26-56-69.85-88-43.851-32-95.375-32Q224-794 182-751.5t-42 108.816Q140-604 155.5-564.5t54 90Q248-424 314-358t166 158Zm0-297Z" /></svg>
                    }
                    <svg className={styles.gr} xmlns="http://www.w3.org/2000/svg" width="23" height="24" viewBox="0 0 23 24" fill="none">
                      <rect x="18.6484" y="0.25" width="4.1" height="23.42" fill="#B68D5C" stroke="#B68D5C" stroke-width="0.5" />
                      <rect x="9.44922" y="7.61035" width="4.1" height="16.06" fill="#B68D5C" stroke="#B68D5C" stroke-width="0.5" />
                      <rect x="0.25" y="13.1299" width="4.1" height="10.54" fill="#B68D5C" stroke="#B68D5C" stroke-width="0.5" />
                    </svg>
                  </div>
                </div>

                <div className={styles.image}><img src={`http://localhost:4000/${item.image}`} alt="img" /></div>
                <ul className={styles.card_descr}>
                  <li className={styles.title}>Цена по запросу</li>
                  <li> {item.desc}</li>
                  <li>{item.address}</li>
                  <li>{item.area}</li>
                </ul>
             </div>
             <div className={styles.button}>Узнать цену</div>
              </div>


            )
          })
        }

      </div>
    </>
  );
}

export default Estate;
