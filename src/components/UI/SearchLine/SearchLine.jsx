import React, {Component} from 'react';
import classes from "./SearchLine.module.scss";
import {NavLink} from "react-router-dom";

class SearchLine extends Component{

    state = {
        searchValue: "",
    };

    onChangeSearchHandler = (e) => {
        const searchValue = e.target.value.trim();
        this.setState({searchValue});
    };

    onClickSearchHandler = (e) => {
        if(this.state.searchValue === "") {
            e.preventDefault();
        }
    };

    render() {
        return (
            <div className={classes.SearchLine}>
                <input type="text"
                       onChange={this.onChangeSearchHandler}
                       value={this.state.searchValue}
                />
                <NavLink onClick={this.onClickSearchHandler} className={(!this.state.searchValue ? classes.disabled : "")} to={"/search/" + this.state.searchValue}>
                    <button disabled={!this.state.searchValue}/>
                </NavLink>
            </div>
        );
    }



};

export default SearchLine;
