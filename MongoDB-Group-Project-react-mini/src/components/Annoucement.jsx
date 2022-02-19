import styled from "styled-components";

const Container = styled.div`
    height:30px;
    background-color: teal;
    color: white;
    display: flex;
    align-item: center;
    justify-content: center;
    font-size: 14px;
    font-weight: bold; 
`;

const Annoucement = () => {
  return (
      <Container>
          Super Deal! Free Shipping on Orders Over Rs500
      </Container>
  )
};

export default Annoucement;
