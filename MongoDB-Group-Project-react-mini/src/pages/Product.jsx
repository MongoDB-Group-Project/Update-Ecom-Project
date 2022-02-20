import React from "react"
import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import Annoucement from "../components/Annoucement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { mobile } from "../Responsive";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios'
const Container = styled.div`
    
`;

const Wrapper = styled.div`
    padding: 50px;
    display: flex;
    ${mobile({ padding: "10px", flexDirection: "column" })}
`;

const ImgContainer = styled.div`
    flex: 1;
`;

const Image = styled.img`
    width: 100%;
    height: 90vh;
    object-fit: cover;
    ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
    flex: 1; 
    padding: 0px 50px; 
    ${mobile({ padding: "10px" })}  
`;

const Title = styled.h1`
    font-weight: 200;
`;

const Desc = styled.p`
    margin: 20px 0px;
`;

const Price = styled.span`
    font-weight: 100;
    font-size: 40px;
`;

const FilterContainer = styled.div`
    width: 50%;
    margin: 30px 0px;
    display: flex;
    justify-content: space-between;
    ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
    display: flex;
    align-items: center;
`;

const FilterTitle = styled.span`
    font-size: 20px;
    font-weight: 200;
`;

const FilterColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin: 0px 5px;
    background-color: ${props => props.color};
    cursor: pointer;
    
`;

const FilterSize = styled.select`
    margin-left: 10px;
    padding: 5px;
`;

const FilterSizeOption = styled.option`

`;

const AddContainer = styled.div`
    width: 50%;
    display: flex;
    align-iitems: center;
    justify-content: space-between;
    ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
    display: flex;
    align-items: center;
    font-weight: 700;
`;

const Amount = styled.span`
    width: 30px;
    height: 30px;
    border-radius: 10px;
    border: 1px solid teal;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0px 5px;
`;

const Button = styled.button`
    padding: 15px;
    border: 2px solid teal;
    background-color: white;
    cursor: pointer;
    font-weight: 500;

    &:hover{
       background-color: #f8f4f4;
    }
`;



const Product = () => {
    const [orderStatus, setOrderStatus] = useState(false);
    const [user, setUser] = useState(null);
    const [product, setProduct] = useState(null);
    const params = useParams()
    console.log(params);

    const fetchProduct = async () => {
        const res = await axios.get('http://localhost:5000/api/products/find/' + params.id)
        if (res.status === 200) {
            setProduct(res.data)
            console.log(res.data.color)
        }
        else {
            console.log(res)
        }
    }
    const handleOrder = async () => {
        if (!user) {
            console.log("please sign in")
        }
        const resp = await axios.post("http://localhost:5000/api/orders", {
            userId: user._id,
            products: [
                {
                    "productId": product._id,
                    "quantity": 1
                }
            ],
            amount: product.price,
            address: "IND"

        })

        if (resp.status === 200) {
            console.log(resp)
            setOrderStatus(true)
        }



    }

    useEffect(() => {
        fetchProduct()
        setUser(JSON.parse(localStorage.getItem("user")))

    }, [params])

    const productRender = product ? <Container>
        <Navbar />
        <Annoucement />
        <Wrapper>
            <ImgContainer>
                <Image src={product.img} />
            </ImgContainer>

            <InfoContainer>
                <Title>{product.title}</Title>
                <Desc>{product.desc}</Desc>
                <Price>₹{product.price}</Price>

                <FilterContainer>

                    <FilterTitle>Color</FilterTitle>
                    <Filter>
                        <FilterColor color="black" />
                        <FilterColor color="darkblue" />
                        <FilterColor color="gray" />
                    </Filter>

                    <Filter>
                        <FilterTitle>Size</FilterTitle>
                        <FilterSize>
                            <FilterSizeOption>S</FilterSizeOption>
                            <FilterSizeOption>M</FilterSizeOption>
                            <FilterSizeOption>L</FilterSizeOption>
                            <FilterSizeOption>XL</FilterSizeOption>
                        </FilterSize>
                    </Filter>
                </FilterContainer>
                {orderStatus ? <Button onClick={() => window.location.replace("/")}>Order Successful. Browse more</Button> : <Button onClick={handleOrder}>Order Now</Button>}
            </InfoContainer>
        </Wrapper>
        <Newsletter />
        <Footer />
    </Container> : <></>

    return (
        <div>
            {
                product !== null ? productRender : <Title>Loading</Title>
            }

        </div>

    );
};

export default Product;