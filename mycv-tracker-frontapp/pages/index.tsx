import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { Container } from "reactstrap";
const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
        <meta name="keywords" content="top cv review, topcv review, free cv review,top resume reviews" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Container className="py-5">Home Page Content</Container>
      </div>
    </div>
  );
};

export default Home;
