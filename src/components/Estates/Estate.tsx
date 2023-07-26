import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEstates } from "../../features/estate.slice";
import styles from './Estate.module.scss'
import img from '../../acces/icons/testCart-fotor-bg-remover-20230726182712.png'

import { HiOutlineHeart} from "react-icons/hi"; 


function Estate() {
  const estates = useSelector((state) => state.estates.estates);
  console.log(estates);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchEstates());
  }, [dispatch]);





  return (
    <div>    
      <div className={styles.box}>
            <div className={styles.card}>
              <div className={styles.roomsCount} >2-ком. планировка</div>
              <div className={styles.type}><HiOutlineHeart style={{ fontSize: 24 }} /></div>
              <div className={styles.image}><img src={img} alt="img" /></div>
              <div className={styles.address}>
              <div className={styles.square}>67.5 кв/м <br/>Нижний этаж</div>
              </div>
              <button className={styles.button}>Заказать</button>
            </div>
     </div>
    </div>
  );
}

export default Estate;
