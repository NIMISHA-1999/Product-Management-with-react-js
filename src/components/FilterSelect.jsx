import { Fragment, useState, useEffect } from "react";
import Select from 'react-select';
// import { products } from '../utils/products';

// const options = [
//     { value: "sofa", label: "Sofa" },
//     { value: "chair", label: "Chair" },
//     { value: "watch", label: "Watch" },
//     { value: "mobile", label: "Mobile" },
//     { value: "wireless", label: "Wireless" },
// ];

const customStyles = {
    control: (provided) => ({
        ...provided,
        backgroundColor: "#0f3460",
        color: "white",
        borderRadius: "5px",
        border: "none",
        boxShadow: "none",
        width: "250px",
        height: "40px",
        marginLeft: "100px",
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? "#0f3460" : "white",
        color: state.isSelected ? "white" : "#0f3460",
        "&:hover": {
        backgroundColor: "#0f3460",
        color: "white",
        },
    }),
    singleValue: (provided) => ({
        ...provided,
        color: "white",
    }),
};


// ... (customStyles are kept the same)

// Accept categories and products as props from the parent
const FilterSelect = ({ categories, products, setFilterList }) => {
    
    // --- FILTER HANDLER ---
    const handleChange = (selectedOption) => {
        const selectedValue = selectedOption.value;

        if (selectedValue === 'all') {
            // Show all products
            setFilterList(products);
        } else {
            // Filter products based on the selected category
            const filteredProducts = products.filter(item => item.category === selectedValue);
            setFilterList(filteredProducts);
        }
    }

    return (
        <Select
            // Use the categories array created in the Shop component
            options={categories} 
            // Set the default value to the 'all' option
            defaultValue={categories.find(opt => opt.value === 'all')} 
            styles={customStyles}
            onChange={handleChange}
        />
    );
};

export default FilterSelect;

