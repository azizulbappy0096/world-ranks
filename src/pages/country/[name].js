import Head from "next/head";
import Country from "../../component/Country/Country";
import styles from "../../styles/home.module.css";
import Link from 'next/link';

export const getStaticProps = async (context) => {
  console.log(context.params);
  const response = await fetch(`https://restcountries.eu/rest/v2/alpha/${context.params.name}`)
    .then(
      (res) => {
        if (res.ok) {
          return res.json();
        }

        throw new Error("Request failed!");
      },
      (networkError) => console.log(networkError.message)
    )
    .then((jsonResponse) => jsonResponse);
   
 

  return {
    props: {
      revalidate: 10800,
      country: response || [],
    
    },
  };
};

export const getStaticPaths = async () => {
  const response = await fetch("https://restcountries.eu/rest/v2/all")
    .then(
      (res) => {
        if (res.ok) {
          return res.json();
        }

        throw new Error("Request failed!");
      },
      (networkError) => console.log(networkError.message)
    )
    .then((jsonResponse) => jsonResponse);

    if(response) {
      var paths = response.map(country => ({params: {id: country.name, name: country.alpha3Code}}))

      return {
        paths,
        fallback: false,
      };
    }else {
      console.log("Failed")
    }
    


};

export default function CountryPage({ country }) {
  return (
    <div className={styles.container}>
      <Head>
        <title> {country.name} </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <Link href="/">
        <img src="/Logo.svg" alt="logo" style={{cursor: "pointer"}} />
        </Link>
      </header>

      <main className={styles.main}>
        <Country country={country} />
      </main>

      <footer className={styles.footer}>Azizul Bappy @ azizulsdev.io</footer>
    </div>
  );
}
