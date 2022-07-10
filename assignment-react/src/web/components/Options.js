import React from "react";

const Options = (props) => {
    const { filteredOptions, selectOption } = props;
    return (
        <>
            <ul className={"dd-menu"}>
                {filteredOptions.length > 0 &&
                    filteredOptions?.map((obj, idx) => {
                        return (
                            <li key={'options-'+idx} onClick={(e) => selectOption(obj, idx)}>
                                {obj.name}
                            </li>
                        );
                    })}
                {filteredOptions.length === 0 && <li>No matched item</li>}
            </ul>
        </>
    );
};

export default Options;
