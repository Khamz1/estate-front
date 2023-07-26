import React from 'react'
import styles from './header.module.scss'
import favicon from '../../acces/icons/favicon.ico'
const Header = () => {
  return (
    <div className={styles.header}>
        <div className="logo"><img src={favicon} alt="" /></div>
        <ul className="menu">
            <li>О нашей компании</li>
            <li>Наши ЖК</li>
            <li>Местоположение ЖК</li>
            <li>Условия рассрочки</li>
        </ul>
        <div className="phone">+7 (938) 999-99-99-00</div>
    </div>
  )
}

export default Header