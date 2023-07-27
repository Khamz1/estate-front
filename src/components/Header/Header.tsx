import React from 'react'
import styles from './header.module.scss'
import favicon from '../../acces/icons/favicon.ico'
import account from '../../acces/icons/account.svg'
import favorite from '../../acces/icons/favorite.svg'
import {Link} from 'react-router-dom'
const Header = () => {
  return (
    <div className={styles.header}>
        <div className={styles.logo}><img src={favicon} alt="" /></div>
        <ul className={styles.menu}>
            <li>О нашей компании</li>
            <li>Наши ЖК</li>
            <li>Местоположение ЖК</li>
            <li>Условия рассрочки</li>
            <li><Link to={'/comments'}>Отзывы</Link></li>
            
        </ul>
        <div className={styles.header_right}>
            <div className={styles.phone}><img src={favorite} alt="" /></div>
        <div className={styles.phone}><img src={account} alt="" /></div>
        </div>
    </div>
  )
}

export default Header