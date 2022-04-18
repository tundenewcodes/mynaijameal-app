import React, { Fragment } from 'react'
import logo from '../../assets/logi.png'
import food_img from '../../assets/food_img.jpg'
import Image from 'next/image'
import styles from '../../styles/Header.module.css'
import styles1 from '../../styles/picture.module.css'
import HeaderCartButton from '../Cart/HeaderCartButton'

const Header = (props) => {
  return (
    <Fragment>
      <header className={styles.header}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div className={styles1.photos}>
            
            <Image src={logo} alt='logo' />
          </div>

          <h1>Food Meal App</h1>
        </div>
        <div>
          <HeaderCartButton open={props.open} />
        </div>
      </header>
      <div className={styles.bodyImage}>
        <Image
          src={food_img}
          alt='a tray filled with africa delicasies'
          width={1500}
          objectFit='cover'
        />
      </div>
    </Fragment>
  )
}

export default Header
