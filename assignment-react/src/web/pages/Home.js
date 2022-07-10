import React, { useEffect, useState } from "react";
import "../../web/themes/_Style.scss";
import SearchWithChips from "../components/SearchWithChips";

const Home = () => {
    // options should have objects in format {id: someUniqueId, name: uniqueName}
    const url =
        process.env.API_URL || "http://localhost:4000/api/options/getOptions";

    const mockOptions = [
        { id: 1, name: "Apple" },
        { id: 2, name: "Orange" },
        { id: 3, name: "Papaya" },
        { id: 4, name: "Mango" },
        { id: 5, name: "Banana" },
        { id: 6, name: "Pomengranate" },
    ];

    const [options, setOptions] = useState([]);
    useEffect(() => {
        const fetchApi = async () => {
            fetch(url)
                .then((response) => response.json())
                .then((data) => setOptions(data.data))
                .catch(() => setOptions(mockOptions))
        };
        fetchApi();
    }, []);

    return (
        <>
            <div className="container">
                <div>
                    <h3>React Assignment || Search Component With Chips || Api using Express</h3>
                </div>
                <SearchWithChips
                    options={options}
                    label={"Select Fruits"}
                />
            </div>
        </>
    );
};

export default Home;
