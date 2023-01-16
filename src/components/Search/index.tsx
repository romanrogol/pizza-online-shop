import React from "react";
import {setSearchValue} from '../../redux/slices/filter/slice';
import { useDispatch } from "react-redux";
import styles from './Search.module.scss';
import search from './search.svg';
import close from './close.svg';
import debounce from "lodash.debounce";

const Search: React.FC = () => {
    const dispatch = useDispatch();
    const [value, setValue] = React.useState('');
    const inputRef = React.useRef<HTMLInputElement>(null);

    const updateSearchValue = React.useCallback(
        debounce((str: string) => {
            dispatch(setSearchValue(str));
        }, 500), [],
    );

    const onClickClear = () => {
        dispatch(setSearchValue(''));
        setValue('');
        inputRef.current?.focus();
    };

    const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
        updateSearchValue(event.target.value);
    };

    return (
    <div className={styles.root}>
        <img src = {search} alt='search' className={styles.search}/>
        <input
        ref = {inputRef}
        value = {value}
        onChange={onChangeInput} className={styles.input} placeholder='Search pizza...'/>
        {value && (<img onClick={onClickClear}src={close} alt='close' className={styles.closeIcon}/>)}
    </div>
    )
}

export default Search