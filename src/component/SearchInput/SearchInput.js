import styles from "./SearchInput.module.css";
import SearchIcon from '@material-ui/icons/Search';

export default function SearchInput({...rest}) {
    return (
        <div className={styles.searchInput}>
            <SearchIcon />
            <input type="text" placeholder="Filter by Name, Region & Subregion" {...rest} />
        </div>
    )
}
