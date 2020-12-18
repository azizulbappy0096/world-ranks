import styles from "./CountryTable.module.css";
import Link from "next/link";

import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import { useState, useEffect } from "react";

const TableBody = ({ countries }) => {
  return countries.map((country) => (
    <Link href={`/country/${country.alpha3Code}`}>
    <div className={styles.country}>
      <div className={styles.country__name}>
        <img src={country.flag} alt={country.name} />
        <p>{country.name}</p>
        </div>
      <div className={styles.country__population}>{new Intl.NumberFormat('en-IN', ).format(country.population)}</div>
      <div className={styles.country__area}>{new Intl.NumberFormat('en-IN', ).format(country.area)}</div>
      <div className={styles.country__gini}>
        <div className={styles.country__giniPercent}>
          <div style={{backgroundColor: "#21B6B7", width: `${!country.gini ? 0 : country.gini}%`, height: "100%"}}></div>
        </div>
        <p>{!country.gini ? 0 : country.gini}%</p>
      </div>
    </div>
    </Link>
  ));
};

function CountryTable({ countries, sortCountries }) {
  const [isNameAsc, setNameAsc] = useState(null);
  const [isPopulationAsc, setPopulationAsc] = useState(null);

  const [update, setUpdate] = useState(false);
  const shouldComponentUpdate = () => {
    setUpdate((prev) => !prev);
  };
  useEffect(() => {
    if (isNameAsc !== null) {
      sortCountries(isNameAsc, "name", shouldComponentUpdate);
    }

    // shouldComponentUpdate()
  }, [isNameAsc]);

  useEffect(() => {
    if (isPopulationAsc !== null) {
      sortCountries(isPopulationAsc, "population", shouldComponentUpdate);
    }

    // shouldComponentUpdate();
  }, [isPopulationAsc]);

  const sortArrow = (name) => {
    if (name === "name") {
      setNameAsc((prev) => (prev === null || prev === "desc" ? "asc" : "desc"));
      setPopulationAsc(null);
    } else {
      setPopulationAsc((prev) =>
        prev === null || prev === "desc" ? "asc" : "desc"
      );
      setNameAsc(null);
    }
  };

  const showArrow = (name) => {
    if (name === "name") {
      if (isNameAsc === "asc") {
        return <ArrowDownwardIcon className={styles.icon} />;
      } else if (isNameAsc === null) {
        return <></>;
      } else {
        return <ArrowUpwardIcon className={styles.icon} />;
      }
    } else {
      if (isPopulationAsc === "asc") {
        return <ArrowDownwardIcon className={styles.icon} />;
      } else if (isPopulationAsc === null) {
        return <></>;
      } else {
        return <ArrowUpwardIcon className={styles.icon} />;
      }
    }
  };

  return (
    <div className={styles.countryTable}>
      <section className={styles.countryTable__header}>
        <button
          onClick={() => {
            sortArrow("name");
          }}
        >
          Name
          {showArrow("name")}
        </button>
        <button
          onClick={() => {
            sortArrow("population");
          }}
        >
          Population
          {showArrow("population")}
        </button>
        <button className={styles.countryTable__buttonMobile}>Area (km)</button>
        <button className={styles.countryTable__buttonMobile}>Gini</button>
      </section>
      <section className={styles.countryTable__body}>
        <TableBody countries={countries} />
      </section>
    </div>
  );
}

export default CountryTable;
