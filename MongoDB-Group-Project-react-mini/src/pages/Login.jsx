import {useNavigate} from 'react-router-dom'
import styled from "styled-components";
import { mobile } from "../Responsive";
import {useEffect, useState} from 'react';
import axios from 'axios'
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940");
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;

const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;
const Login = () => {
  const navigate = useNavigate()
  const [formData, updateFormData] = useState({})
  const handleChange = (e) => {
    console.log(e.target.name, e.target.value);
    updateFormData({...formData, [e.target.name]:e.target.value})
}
  const checkLoggedIn = () =>{
    const userData = localStorage.getItem("user")
    if(userData){
      navigate('/')
    }
  }
  const handleLogin = async () => {
    const resp = await axios.post("http://localhost:5000/api/auth/login",
      {

        username: formData.username,
        password: formData.password
      })
    
    console.log(resp)
    if (resp.status == 200) {
      localStorage.setItem("user", JSON.stringify(resp.data))
      navigate("/")
    }
    else{
      console.log("username or password incorrect")
    }
  }

  useEffect(()=> {
    checkLoggedIn()
  }

  )

  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
          <Input name="username" onChange={handleChange} placeholder="Username" />
          <Input name="password" onChange={handleChange} placeholder="Password" />
          <Link>DID YOU FORGOT YOUR PASSWORD?</Link>
          <Link>CREATE A NEW ACCOUNT</Link>
        </Form>
        <Button onClick={handleLogin}>LOGIN</Button>
      </Wrapper>
    </Container>
  );
};

export default Login;
