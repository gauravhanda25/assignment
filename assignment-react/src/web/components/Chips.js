import React from "react";

const Chips = (props) => {
    const { chips, removeOption } = props;
    return (
        <>
            {chips?.length > 0 &&
                chips.map((obj, idx) => {
                    return (
                        <div className="chip" key={'chips-'+idx}>
                            {" "}
                            {obj.name}{" "}
                            <a onClick={() => removeOption(obj, idx)}>
                                {" "}
                                <i className="fas fa-times-circle"></i>
                            </a>
                        </div>
                    );
                })}
        </>
    );
};

export default Chips;
