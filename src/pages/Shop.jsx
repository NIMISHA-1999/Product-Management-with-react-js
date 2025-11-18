import { Col, Container, Row } from "react-bootstrap";
import FilterSelect from "../components/FilterSelect";
import SearchBar from "../components/SeachBar/SearchBar";
import { Fragment, useState, useEffect } from "react";
// import { products } from "../utils/products";
import ShopList from "../components/ShopList";
import Banner from "../components/Banner/Banner";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";

// Shop.jsx

// ... (imports)

const Shop = () => {
    // State to hold the full list of products
    const [products, setProducts] = useState([]);
    // State to hold the currently displayed (filtered) list
    const [filterList, setFilterList] = useState([]);
    // State to hold the unique categories for the dropdown
    const [categories, setCategories] = useState([]); 

    // --- EFFECT 1: Fetch Data on Mount ---
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://dummyjson.com/products');
                const jsonData = await response.json();
                setProducts(jsonData.products);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []); 

    // --- EFFECT 2: Extract Categories and Set Initial Filter ---
    useEffect(() => {
        if (products.length > 0) {
            // A. Extract Unique Categories and add 'all'
            const allCategories = products.map(product => product.category);
            const uniqueCategories = [
                { value: 'all', label: 'Filter By Category' }, // Default/All option
                ...new Set(allCategories)
            ].map(cat => (typeof cat === 'string' ? { value: cat, label: cat.charAt(0).toUpperCase() + cat.slice(1) } : cat));
            
            setCategories(uniqueCategories);

            // B. Initially show ALL products
            setFilterList(products); 
        }
    }, [products]); 

    // --- RENDER ---
    useWindowScrollToTop();

    return (
        <Fragment>
            <Banner title="Products" />
            <section className="filter-bar">
                <Container className="filter-bar-contianer">
                    <Row className="justify-content-center">
                        <Col md={4}>
                            {/* Pass categories, full product list, and the setter */}
                            <FilterSelect 
                                categories={categories} 
                                products={products} 
                                setFilterList={setFilterList} 
                            />
                        </Col>
                        <Col md={8}>
                                     <SearchBar setFilterList={setFilterList}  products={products} />
                                   </Col>
                    </Row>
                </Container>
                <Container>
                    <ShopList productItems={filterList} />
                </Container>
            </section>
        </Fragment>
    );
};

export default Shop;
