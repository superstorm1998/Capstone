import React, { Component } from "react";
import CarouselImages from "../../components/carousel";
import styles from "./home.module.css";
import New from "../../components/new";
import Gallery from "../../components/gallery";
import { Container } from "@material-ui/core";

class HomePage extends Component {
  render() {
    console.log("homepage");

    return (
      <Container className={styles.home_page}>
        <CarouselImages />
        <New />
        <Gallery />
      </Container>
    );
  }
}

export default HomePage;
