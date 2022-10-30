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
  // This links certain middleware properties we need for geolocation
  return {
    props: {
      query: query,
    }
  }
}

export default function Home({ query }) {
  // we will use NY, NY in lieu of location data from middleware
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/locations`
  const namedFields = process.env.NEXT_PUBLIC_NAMED_FIELDS.split(",")
  const placeType = process.env.NEXT_PUBLIC_PLACE_TYPE
  const logo = process.env.NEXT_PUBLIC_ICON_IMG
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    (async() => {
      const response = await axios.get(
        url,
        { 
          params: { 
            latitude: query.latitude, 
            longitude: query.longitude  
          }
        }
      ).then(res => setLocations(res.data));
    })()
  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>{placeType} finder</title>
        <meta name="description" content={`${placeType} finder application`} />
        <link rel="icon" href={logo} />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Brewery finder 
        </h1>
        <div className="imageWrapper">
          <Image id="headerImage" width="60px" height="60px" alt="beer" src="/beer.png"/>
        </div>
        <div className="resultList">
          { locations && (
              <table>
              <thead>
                <tr>
                  { 
                      locations && namedFields.map((field, index) => {
                        return <th key={`th-${field}-${index}`}>{field}</th>
                      })
                  }
                </tr>
              </thead>
              <tbody>
                  {  locations && 
                      locations.map((location, index) => {
                        return (
                          <tr key={index}>
                            { 
                              namedFields.map(field => {
                                return (
                                  <td key={`${field}-${index}`}>
                                    {location[field]}
                                  </td>
                                )
                              })
                            }
                          </tr>
                        )
                      }) 
                  }
                </tbody>
            </table>)
          } 
        </div>
      </main>
    </div>
  )
}
