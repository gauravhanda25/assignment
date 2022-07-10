import React, { useState, useRef, useEffect } from "react";
import Chips from "./Chips";
import Options from "./Options";

const SearchWithChips = (props) => {
    const { label, options } = props;
    const inputRef = useRef();
    const [chips, setChips] = useState([]);
    const [filteredOptions, setFilteredOptions] = useState([]);
    const [handleFocusActivity, setHandleFocusActivity] = useState(false);
    const [searchValue, setSearchValue] = useState("");

    useEffect(() => {
        setFilteredOptions([...options])
    }, [options])

    //it handles focus for input type text
    const handleFocus = () => {
        setTimeout(() => {
            if (
                (inputRef && inputRef.current === document.activeElement) ||
                chips.length > 0
            ) {
                setHandleFocusActivity(true);
            } else {
                setHandleFocusActivity(false);
            }
        }, 300);
      }

    useEffect(() => {
        reloadOptions()
        handleFocus();
    }, [chips]);

    // reload accurate dropdown options
    const reloadOptions = () => {
        let tempOptions = [...options];
        setFilteredOptions(
            tempOptions.filter((e) => !chips.find((m) => m.id === e.id))
        );
    };

    // select option from dropdown to add as a chip
    const selectOption = (option, id) => {
        let tempChips = [...chips];
        tempChips.push(option);
        setChips(tempChips);
        setSearchValue("");
    };

    // remove chips from input box
    const removeOption = (option, id) => {
        let tempChips = [...chips];
        tempChips.splice(id, 1);
        setChips(tempChips);
    };

    

    // it handles text change
    const handleOnChange = (e) => {
        let tempFilteredOptions = [...filteredOptions];
        const { value } = e.target;
        if (value) {
            setFilteredOptions(
                tempFilteredOptions.filter((v) =>
                    v.name.toLowerCase().includes(value.toLowerCase())
                )
            );
        } else {
            reloadOptions();
        }
        setSearchValue(value);
    };

    return (
        <>
            <div className="chips input-field">
                <Chips chips={chips} removeOption={removeOption} />
                <input
                    type="text"
                    value={searchValue}
                    className="inputText"
                    required
                    ref={inputRef}
                    onFocus={handleFocus}
                    onChange={handleOnChange}
                />
                <span
                    className={handleFocusActivity ? "floating-label" : "label"}
                >
                    {label || "Search..."}
                </span>
                {handleFocusActivity && (
                    <Options
                        selectOption={selectOption}
                        filteredOptions={filteredOptions}
                    />
                )}
            </div>
        </>
    );
};

export default SearchWithChips;
