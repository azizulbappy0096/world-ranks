import { useState, useEffect } from "react";

import styles from "./Country.module.css";

export default function Country({ country }) {
  const [neighbour, setNeighbour] = useState([]);

  useEffect(() => {
    setNeighbour([]);
    country.borders.map((border) => {
      fetch(`https://restcountries.eu/rest/v2/alpha/${border}`)
        .then(
          (res) => {
            if (res.ok) {
              return res.json();
            }

            throw new Error("Request failed!");
          },
          (networkError) => console.log(networkError.message)
        )
        .then((jsonResponse) => {
          setNeighbour((prev) => [
            ...prev,
            {
              img: jsonResponse.flag,
              name: jsonResponse.name,
            },
          ]);
        });
    });
  }, []);

  return (
    <div className={styles.countryContainer}>
      <section className={styles.container__left}>
        <img src={country.flag} alt={country.name} />
        <div className={styles.left__title}>
          <h2> {country.name} </h2>
          <small> {country.region} </small>
        </div>
        <div className={styles.left__info}>
          <div className={styles.left__leftInfo}>
            <h4> {country.population} </h4>
            <small> Population </small>
          </div>
          <div className={styles.left__rightInfo}>
            <h4> {country.area} </h4>
            <small> Area (km) </small>
          </div>
        </div>
      </section>
      <section className={styles.container__right}>
        <h3> Details </h3>
        <div className={styles.right__table}>
          <section className={styles.right__tableRow}>
            <p> Capital </p>
            <p> {country.capital} </p>
          </section>
          <section className={styles.right__tableRow}>
            <p> Subregion </p>
            <p> {country.subregion} </p>
          </section>
          <section className={styles.right__tableRow}>
            <p> Languages </p>
            <p>
              {" "}
              {country.languages.map((lang, index) =>
                index > 0 ? `, ${lang.name}` : `${lang.name}`
              )}{" "}
            </p>
          </section>
          <section className={styles.right__tableRow}>
            <p> Currencies </p>
            <p>
              {" "}
              {country.currencies.map((curren, index) =>
                index > 0
                  ? `, ${curren.name}(${curren.symbol})`
                  : `${curren.name}(${curren.symbol})`
              )}{" "}
            </p>
          </section>
          <section className={styles.right__tableRow}>
            <p> Native name </p>
            <p> {country.nativeName} </p>
          </section>
          <section className={styles.right__tableRow}>
            <p> Gini </p>
                <div style={{display: "flex", alignItems: "center", width: "40%", justifyContent: "space-between"}}>
                <div className={styles.country__giniPercent}>
              <div
                style={{
                  backgroundColor: "#21B6B7",
                  width: `${!country.gini ? 0 : country.gini}%`,
                  height: "100%",
                }}
              ></div>
            </div>
            <p>{!country.gini ? 0 : country.gini}%</p>
                </div>
          </section>
        </div>
        <div className={styles.right__neighbour}>
          <h5> Neighbouring Countries </h5>
          <div className={styles.right__neighbourContainer}>
            {neighbour.map((country) => (
              <div className={styles.right__country}>
                <img src={country?.img} alt={country?.name} />
                <small> {country?.name} </small>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
