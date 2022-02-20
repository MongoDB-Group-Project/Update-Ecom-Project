import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import{popularProducts} from "../data"
import Product from './Product';
import{ axios } from 'axios'

const Mongoose = require("mongoose");

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const Products = ({cat,filters,sort}) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(()=>{
      const fetchProducts = async() =>{
          try{
            const res = await axios.get("https://localhost:5000/api/products");
            console.log(res)
          }catch(err) {
              console.log(err);
          }
      };
      fetchProducts()
  }, [cat]);

  return (
      <Container>
          {popularProducts.map(item=>(
             <Product item={item} key={item.id}/>
          ))}
      </Container>
  );
};

export default Products;