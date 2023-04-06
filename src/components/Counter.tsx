import {useState} from "react";
import classes from './Counter.module.scss';

export const Counter = () => {
    let [counter, setCounter] = useState(0);

    const increment = () => {
        setCounter(counter + 1)
    }
    return <div className={classes.test}>
        <button className={`${classes.btn} `} onClick={increment}>inc</button>
        Counter: {counter}</div>
}
