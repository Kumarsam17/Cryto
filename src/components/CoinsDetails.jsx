import { Box,RadioGroup,Radio,Container,HStack, VStack,Text, Image, StatLabel, StatNumber,Stat, StatArrow, StatHelpText, Badge, Progress, Button } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react'
import Loader from './Loader';
import { useParams } from "react-router-dom"
import { server } from '../index';
import axios from 'axios';
import Coins from './Coins';
import Chart from './Chart';

const CoinsDetails = () => {
  const [coin, setCoin] = useState([]);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("inr");
  const [days,setDays]=useState("24h")
  const  [chartArray,setChartarray] =useState([]);


  const btn =["24h","7d","14d","30d","60d","200d","300d","1y","max"]
  const switchChartStats=(key)=>{
    switch (key) {
      case "24h":
        setDays("24h")
              
        break;

        case "7d":
        setDays("7d")
                
        break;

        case "14d":
        setDays("14d")
              
        break;

        case "30d":
        setDays("30d")
              
        break;
        case "60d":
        setDays("60d")
              
        break;
        case "200d":
        setDays("200d")
               
        break;

        case "300d":
        setDays("300d")
              
        break;

        case "1y":
        setDays("1y")
             
        break;

        case "max":
        setDays("max")
         
        break;
    
      default:
        setDays("24h")
        setLoader(true)
        break;
    }
  }
  const params = useParams();
  const CurrenySymbol =currency==="inr"?"₹":currency==="eur" ? "€" :"$";

  useEffect(() => {
    const fetchCoin = async () => {
      try {

        
        const {data } = await axios.get(`${server}/coins/${params.id}`)
        const {data:chartData} = await axios.get(`${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`)

        
        
        setCoin(data);
        setChartarray(chartData.prices)
        setLoader(false);
      }

      catch (error) {
        setLoader(false);
        setError(true)
        alert("API fetch error")

      }
    }
    fetchCoin();
  }, [params.id],currency,days)

  return (
    <Container maxW={"container.xl"}>
      {
        loader ? (<Loader />) : (<>
        <Chart arr={chartArray} currency={CurrenySymbol} days={days} />
        <HStack p={"4"}>
          {
            btn.map((i)=>(<Button overflowX={"auto"} key={i} onClick={()=>switchChartStats(i)}>{i}</Button>))
          }
        </HStack>
          <Box width={"full"} borderWidth={1}>
            <HStack p={"5"} spacing={"10"}>
              <RadioGroup onChange={setCurrency}>
                <Radio value='inr'>₹</Radio>
                <Radio value='usd'>$</Radio>
                <Radio value='eur'>€</Radio>
              </RadioGroup>
            </HStack>
          </Box>
          <VStack spacing={"small"} p={"16"} alignItems={"flex-start"}>

            <Text fontSize={"small"} alignSelf={"center"}>
              Last Updated On {Date()}
            </Text>
            <Image src={coin.image.large} w={"16"} h={"16"} objectFit={"contain"} />
            <Stat>
              <StatLabel>{coin.name}</StatLabel>
              <StatNumber>{CurrenySymbol}{coin.market_data.current_price[currency]}</StatNumber>
              <StatHelpText>
                <StatArrow type={coin.market_data.price_change_percentage_24h > 0?"increase":"decrease"}/> {coin.market_data.price_change_percentage_24h}
              </StatHelpText>
            </Stat>
            <Badge fontSize={"2xl"} bgColor={"blackAlpha.800"} color={"white"} borderRadius={"2xl"}>
              {`#${coin.market_data.market_cap_rank}`}
            </Badge>
            <CustomBar 
            high={`${CurrenySymbol}${coin.market_data.high_24h[currency]}`} 
            low={`${CurrenySymbol}${coin.market_data.low_24h[currency]}`} />

            <Box w={"full"} p={"4"}>

              <Item title={"Max supply"} value={coin.market_data.max_supply} />
              <Item title={"Max Circulating Supply"} value={coin.market_data.circulating_supply} />
              <Item title={"Max Cap"} value={coin.market_data.market_cap[currency]} />
              <Item title={"All time high"} value={coin.market_data.ath[currency]} />
              <Item title={"All time high"} value={coin.market_data.atl[currency]} />

            </Box>
          </VStack>
        </>
        )
      }
    </Container>
  )
}
 const CustomBar =({high,low})=>(
  <VStack w={"full"} justifyContent={"center"}>
  <Progress value={50} colorScheme={"teal"} w={"full"} />
  <HStack justifyContent={"space-between"} w={"full"} >
    <Badge children={low} colorScheme={"red"} />
    <Text>24H Range</Text>
    <Badge children={high} colorScheme={"green"} />
  </HStack>
  </VStack>
 );
 //new


 const Item =({title,value})=>(
  <HStack justifyContent={"space-between"} w={"full"} my={"4"}>
    <Text fontFamily={"Bebas Neue"} letterSpacing={"widest"}>{title}</Text>
    <Text>{value}</Text>

  </HStack>
 )
export default CoinsDetails;