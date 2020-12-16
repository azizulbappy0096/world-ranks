import Head from 'next/head';
import Main from '../component/Main/Main';
import styles from "../styles/home.module.css";

export const getStaticProps = async (context) => {
  const response = await fetch("https://restcountries.eu/rest/v2/all").then(res => {
    if(res.ok) {
      return res.json();
    }

    throw new Error("Request failed!")
  }, networkError => console.log(networkError.message)
  ).then(jsonResponse => jsonResponse)



  return (
    {
      props: {
        revalidate: 10800,
        countries: response || []
      }
    }
  )
}

export default function Home({countries}) {
  return (
    <div className={styles.container}>
      <Head>
        <title> World Ranks </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <img src="/Logo.svg" alt="logo" />
      </header>

      <main className={styles.main}>
        <Main countries={countries} />
      </main>

      <footer className={styles.footer}>
        Azizul Bappy @ azizulsdev.io
      </footer>
    </div>
  )
}
