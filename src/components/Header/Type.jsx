import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPage } from "../../actions/page_action";
import { setType } from "../../actions/cards_action";
import { setStatus } from "../../actions/set_status";
import { DEFAULT_TYPES } from "../../data";

export default function Type() {
    const [showMenu, setShowMenu] = useState(false);
    const type = useSelector((state) => state.cards.type);
    const dispatch = useDispatch();

    const dropDown = (e) => {
        e.preventDefault();
        setShowMenu(!showMenu);
    };

    const handleClick = (e) => {
        setShowMenu(!showMenu);
        if (e.target.value === "Any type") {
            dispatch(setStatus(""));
            dispatch(setType(""));
        } else {
            dispatch(setType(e.target.value));
            dispatch(resetPage());
            dispatch(setStatus("Loading..."));
        }
    };

    return (
        <div className="dropdown">
            <button className="button-active" onClick={dropDown}>
                {type || "Type"}
            </button>
            {showMenu ? (
                <div className="menu">
                    {DEFAULT_TYPES.map((item, index) => {
                        return (
                            <button
                                key={index}
                                value={item}
                                onClick={handleClick}
                            >
                                {item}
                            </button>
                        );
                    })}
                </div>
            ) : null}
        </div>
    );
}
