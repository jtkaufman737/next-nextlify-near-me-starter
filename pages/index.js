import 'axios';
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import getConfig from 'next/config'

const axios = require('axios');
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';


export async function getServerSideProps({ query }) {
  const locations = await axios.get(`${process.env.BASE_URL}/api/locations`).then(res => res.data)

  return {
    props: {
      query: query,
      locationList: locations || null,
      url: `${process.env.BASE_URL}/api/locations`
    }
  }
}

export default function Home(props) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Brewery finder</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/beer.png" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Brewery finder 
        </h1><pre>{JSON.stringify(props).toString()}</pre>
        <div className="imageWrapper">
          <Image id="headerImage" width="60px" height="60px" alt="beer" src="/beer.png"/>
        </div>
        <div className="resultList">
          <ul>
             { 
                Array.isArray(props.locationList) && props.locationList.map((location, index) => {
                  return <li key={index}>{location.name}</li>
                })
              }
          </ul>
        </div>
      </main>
    </div>
  )
}
