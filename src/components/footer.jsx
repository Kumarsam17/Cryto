import { Avatar, Box, Stack, Text, VStack } from '@chakra-ui/react'
import React from 'react'

const footer = () => {
  return (
    <Box bgColor={"blackAlpha.900"} color={"whiteAlpha.700"} minH={"48"}
    px={"16"} py={["16","8"]}
    >
     <Stack direction={["column","row"]} h={"full"} alignItems={"center"}>
     
    <VStack w={"full"} alignItems={["center","flex-start"]}>
     <Text>About us</Text>
     <Text>We are best company in India to Provide Exchanges details about Crypto</Text>

    </VStack>

    <VStack>
        <Avatar src={"https://github.dev/Kumarsam17/Crypto/blob/main/src/assets/IMG_20230126_122431.jpg"} boxSize={"28"} mt={["4" , "0"]} />
        <Text>Our Founder</Text>
    </VStack>

     </Stack>


    </Box>
  )
}

export default footer