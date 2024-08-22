import React, { FC } from 'react';
import styles from './Cart.module.css';

interface CartProps {}

const Cart: FC<CartProps> = () => (
  <div className={styles.Cart}>
    Cart Component
  </div>
);

export default Cart;
