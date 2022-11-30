import 'axios';
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useState, useEffect } from 'react';

const axios = require('axios');

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
  /* 
  Named fields are the JSON properties to build out as columns in our table of results
  Place type is the label throughout the app, for me "Brewery"
  Logo is our imagery, for me a beer mug I found on iconfinder.com
  */
  const namedFields = process.env.NEXT_PUBLIC_NAMED_FIELDS.split(",")
  const placeType = process.env.NEXT_PUBLIC_PLACE_TYPE
  const logo = process.env.NEXT_PUBLIC_ICON_IMG
  const [locations, setLocations] = useState([]);

  /* 
  We will use the useEffect hook to kick off our API call process 
  on load, and we won't provide it a dependency array for now because
  we aren't very concerned with re-fetching
  */
  useEffect(() => {
    (async() => {
      await axios.get(
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
      {/* page title */}
      <main className={styles.main}>
        <h1 className={styles.title}>
          Brewery finder 
        </h1>
        <div className="imageWrapper">
          <Image id="headerImage" width="60" height="60" alt="beer" src={logo}/>
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
