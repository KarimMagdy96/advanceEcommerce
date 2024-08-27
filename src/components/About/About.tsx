import { FC } from "react";
import styles from "./About.module.css";

interface AboutProps {}

const About: FC<AboutProps> = () => (
  <div className={styles.About}>About Component</div>
);

export default About;
