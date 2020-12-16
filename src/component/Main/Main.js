import { useEffect, useState } from "react";
import CountryTable from "../CountryTable/CountryTable";
import SearchInput from "../SearchInput/SearchInput";
import styles from "./Main.module.css";

export default function Main({ countries }) {
  const [allCountries, setAllCountries] = useState([]);

  useEffect(() => {
    setAllCountries(countries);
  }, []);

  const sortBySearch = (value) => {
    setAllCountries(
      countries.filter(
        (country) =>
          country.name.toLowerCase().includes(value) ||
          country.region.toLowerCase().includes(value) ||
          country.subregion.toLowerCase().includes(value)
      )
    );
  };

  const sortCountries = (type, value, update) => {
      console.log(type)
    if (type === "desc") {
      setAllCountries(countries.sort((a, b) => {
          if(a[value] < b[value]) {
            return 1;
          }else  if(a[value] > b[value]) {
            return -1;
          }else {
              return 0;
          }
      }));
    }else if (type === "asc") {
      setAllCountries(
        countries.sort((a, b) => {
          if(a[value] > b[value]) {
            return 1;
          }else  if(a[value] < b[value]) {
            return -1;
          }else {
              return 0;
          }
      }
      ))
    } else {
      setAllCountries(countries);
    }

  update()
  };

  return (
    <div className={styles.wrapper}>
      <section className={styles.wrapper__searchContainer}>
        <p> Found {allCountries.length} countries </p>
        <div className={styles.wrapper__search}>
          <SearchInput
            name="search"
            onChange={(e) => sortBySearch(e.target.value)}
          />
        </div>
      </section>
      <CountryTable sortCountries={sortCountries} countries={allCountries} />
    </div>
  );
}
