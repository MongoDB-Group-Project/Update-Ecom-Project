import { FavoriteBorderOutlined, SearchOutlined, ShoppingCartOutlined } from '@material-ui/icons';
import React from 'react';
import styled from 'styled-components';
import {useNavigate } from 'react-router-dom';
const Container = styled.div`
    flex: 1;
    margin: 5px;
    min_width: 280px;
    height: 350px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f5fbfd
    position: relative;
`;


const Image = styled.img`
    height: 75%;
    z-index: 2;
`;

const Info = styled.div`
    cursor: pointer;

`;

const Icon= styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    transition: all 0.5s ease ;
        &:hover{
        background-color: #e9f5f5;
        transform: scale(1.1);
    }
`;

const Product = ({item}) => {
  const navigate = useNavigate()
  console.log(item)
  return (
      <Container onClick={e=>navigate('/product/'+item._id)}>
          <Image src={item.img}/>
          <Info>
              <Icon>
                <ShoppingCartOutlined/>  
              </Icon>

              <Icon>
                <SearchOutlined/>  
              </Icon>

              <Icon>
                <FavoriteBorderOutlined/>  
              </Icon>
          </Info>
      </Container>
  );
};

export default Product;

