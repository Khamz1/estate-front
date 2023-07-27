import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEstates } from "../../features/estate.slice";
import styles from './Estate.module.scss'
import img from '../../acces/icons/Без названия.jpg'

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
      {estates.map((item)=>{
        return(
          
            <div className={styles.card}>
              <div className={styles.type}>{item.type} <HiOutlineHeart style={{ fontSize: 30 }} /></div>
              <div className={styles.image}><img src={img} alt="img" /></div>
              <div className={styles.address}>
              <div>{item.area}</div>
              <div>{item.address}</div>
              </div>
              <button className={styles.button}>Заказать</button>
            </div>
        )
     })}
     </div>
    </div>
  );
}

export default Estate;
