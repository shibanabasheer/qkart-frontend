import { Search, SentimentDissatisfied } from "@mui/icons-material";
import {
  CircularProgress,
  Grid,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Products.css";
import ProductCard from "./ProductCard";
import { Typography } from '@mui/material';

// Definition of Data Structures used
/**
 * @typedef {Object} Product - Data on product available to buy
 * 
 * @property {string} name - The name or title of the product
 * @property {string} category - The category that the product belongs to
 * @property {number} cost - The price to buy the product
 * @property {number} rating - The aggregate rating of the product (integer out of five)
 * @property {string} image - Contains URL for the product image
 * @property {string} _id - Unique ID for the product
 */


const Products = () => {
  const {enqueueSnackbar} = useSnackbar();

  
  

  // TODO: CRIO_TASK_MODULE_PRODUCTS - Fetch products data and store it
  /**
   * Make API call to get the products list and store it to display the products
   *
   * @returns { Array.<Product> }
   *      Array of objects with complete data on all available products
   *
   * API endpoint - "GET /products"
   *
   * Example for successful response from backend:
   * HTTP 200
   * [
   *      {
   *          "name": "iPhone XR",
   *          "category": "Phones",
   *          "cost": 100,
   *          "rating": 4,
   *          "image": "https://i.imgur.com/lulqWzW.jpg",
   *          "_id": "v4sLtEcMpzabRyfx"
   *      },
   *      {
   *          "name": "Basketball",
   *          "category": "Sports",
   *          "cost": 100,
   *          "rating": 5,
   *          "image": "https://i.imgur.com/lulqWzW.jpg",
   *          "_id": "upLK9JbQ4rMhTwt4"
   *      }
   * ]
   *
   * Example for failed response from backend:
   * HTTP 500
   * {
   *      "success": false,
   *      "message": "Something went wrong. Check the backend console for more details"
   * }
   */

  const [debounceTimer, setDebounceTimer]= useState(0);
  const [noProductsFound, setProductsFound]= useState(false);
  // const [SearchInput, setSearchInput]= useState("");
  const [productData, setProductData]= useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [getApi, setApi]= useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const performAPICall = async () => {
    setIsLoading(true);
    // let url = `${config.endpoint}/products`;
    try {
      const response = await axios.get(`${config.endpoint}/products`);
      setProductData(response.data);
      setFilteredProducts(response.data);
      // console.log(fetchData)
      // const {request, data} = fetchData;
      // const {data} = fetchData;

      // if (request.status === 200) {
        // Success: Set the fetched products in the state
        // setProductData([...data]);
        // setApi(true);
        // setProductsFound(false);
      // } 
    } catch (error) {
      console.log(error);
      if(error.response && error.response.status === 400) {
      //   console.log(error.response.message)
      // }else{
        enqueueSnackbar(error.response.data.message, {variant: "error"});
  
      }
    // }finally {
    //   setIsLoading(false); 
    // }
    }
    setIsLoading(false);
  };

  // const handleChangeInputText = (e) =>{
  // //   setSearchInput(e.target.value)
  //   debounceSearch(e, debounceTimer)
  // }
  useEffect(() => {
    performAPICall();
  }, []);


  // TODO: CRIO_TASK_MODULE_PRODUCTS - Implement search logic
  /**
   * Definition for search handler
   * This is the function that is called on adding new search keys
   *
   * @param {string} text
   *    Text user types in the search bar. To filter the displayed products based on this text.
   *
   * @returns { Array.<Product> }
   *      Array of objects with complete data on filtered set of products
   *
   * API endpoint - "GET /products/search?value=<search-query>"
   *
   */
  const performSearch = async (text) => {
    setIsLoading(true);
    try {
      let response = await axios.get(`${config.endpoint}/products/search?value=${text}`);
      setFilteredProducts(response.data);
      setProductData(response.data);
      // setProductsFound(response.data.length === 0);
      // let url = `${config.endpoint}/products`;
      // if(text !== ""){
      //   url = `${url}/search?value=${text}`;
      // }

      // const fetchSearchResponse = await axios.get(url);
      // const {request, data} = fetchSearchResponse;
      // if(request.status === 200){
      //   setProductData([...data])
      //   setApi(true);
      //   setProductsFound(false);
      // }
      
    }catch(error){
    //   setApi(false);
    //   setProductsFound(true);
    //   if(error.response){
    //     console.log(error.response.data);
    //     console.log(error.response.status);
    //     console.log(error.response.headers);
    //   }
    // }
      if(error.response){
        if(error.response && error.response.status === 404) {
          setFilteredProducts([]);
          // setProductsFound(true);
        }
        else if(error.response && error.response.status === 500) {
          enqueueSnackbar(error.response.data.message, {variant: "error"});
          setFilteredProducts(productData);
          // setProductsFound(true);
        }
      }else{
        enqueueSnackbar(
          "Something went wrong. check that the backend is running.",
          {variant: "error"}
        )
      }
    }
    setIsLoading(false);
  };



  // TODO: CRIO_TASK_MODULE_PRODUCTS - Optimise API calls with debounce search implementation
  /**
   * Definition for debounce handler
   * With debounce, this is the function to be called whenever the user types text in the searchbar field
   *
   * @param {{ target: { value: string } }} event
   *    JS event object emitted from the search input field
   *
   * @param {NodeJS.Timeout} debounceTimeout
   *    Timer id set for the previous debounce call
   *
   */
  const debounceSearch = (event, debounceTimeout) => {
    // let searchVal = event.target.value;
    // if(debounceTimeout !== 0){
    //   clearTimeout(debounceTimeout);
    // }
    
    // let newTimer = setTimeout(() => {
    //   performSearch(searchVal);
    // }, 500);

    // setDebounceTimer(newTimer);
    var text=event.target.value;
    if (debounceTimeout ) {
      clearTimeout(debounceTimeout);
    }
    
    let newTimer = setTimeout(() => {
      // setApi(false);
      // setProductsFound(false);
        performSearch(text);

    }, 500)
      

    setDebounceTimer(newTimer);
    
  };

  

  // const handleChangeInputText = (e) => {
  //   setSearchInput(e.target.value);
  //   debounceSearch(e);
  // };





  return (
    <div>
      <Header>
        {/* TODO: CRIO_TASK_MODULE_PRODUCTS - Display search bar in the header for Products page */}
        <TextField
          className="search-desktop"
          size="small"
          sx={{width: '45ch'}}
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <Search color="primary" />
              </InputAdornment>
            ),
          }}
          // variant="outlined"
          placeholder="Search for items/categories"
          name="search"
          onChange={(e) => debounceSearch(e, debounceTimer)}
          
        />

      </Header>

      {/* Search view for mobiles */}
      <TextField
        className="search-mobile"
        size="small"
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Search color="primary" />
            </InputAdornment>
          ),
        }}
        placeholder="Search for items/categories"
        name="search"
      />
      <Grid container>
        <Grid item className="product-grid">
        <Box className="hero">
          <p className="hero-heading">
            India’s <span className="hero-highlight">FASTEST DELIVERY</span>{" "}
            to your door step
          </p>
        </Box> 
        </Grid>
      </Grid>
      
      {/* {!getApi && !noProductsFound && <Box className="loading">
          <CircularProgress color="success" />
          <Typography variant="subtitle2">
            Loading Products
          </Typography>
          </Box>}
          {!getApi && noProductsFound &&
          <Box sx={{display:"flex", justifyContent:"center", alignItems:"center", padding:"40vh", flexDirection:"column"}}>
            <SentimentDissatisfied />
            <Typography variant="subtitle2">
              No Products Found
            </Typography>
          </Box>}
       <Grid container spacing={2} sx={{padding: "0.8rem"}}>
        {productData.map((data) => (
          <Grid item md={3} xs={6} className="product-grid" key={data["_id"]}>
           {getApi && <ProductCard key={data["_id"]} product={data} />}
          </Grid>
        ))}
         
       </Grid> */}
       
       {isLoading ? (
        <>
           <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            py={10}
          >
            <CircularProgress size={40} />
            <h4>Loading Products...</h4>
          </Box>
        </>
       ) : (
        <Grid container>
          <Grid
            container
            item
            spacing={1}
            direction="row"
            justifyContent="center"
            alignItems="center"
            my={3}
            xs
            md
          >
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <Grid item key={product["_id"]} xs={6} md={3}>
                  <ProductCard
                    product={product}
                    // handleAddToCart={handleAddToCart}
                  />
                </Grid>
              ))
            ) : (
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                py={10}
              >
                <SentimentDissatisfied size={40} />
                <h4>No products found</h4>
              </Box>
            )}
          </Grid>
        </Grid>
       )}
      <Footer />
    </div>
  );
};

export default Products;
