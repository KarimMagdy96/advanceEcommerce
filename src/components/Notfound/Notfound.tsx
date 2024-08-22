import React, { FC } from 'react';
import styles from './Notfound.module.css';

interface NotfoundProps {}

const Notfound: FC<NotfoundProps> = () => (
  <div className={styles.Notfound}>
    Notfound Component
  </div>
);

export default Notfound;
