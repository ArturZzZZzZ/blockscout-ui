import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

import Skeleton from 'ui/shared/chakra/Skeleton';
type Props = {
  name: string;
  value: string;
  icon: React.ReactNode;
  valueSecondary?: string;
  isLoading: boolean;
};

const TokenBalancesItem = ({ name, icon, value, valueSecondary, isLoading }: Props) => {

  const bgColor = useColorModeValue('blackAlpha.50', 'gray.1200');

  return (
    <Box px="12px" py="10px" bgColor={ bgColor } borderRadius="base">
      <Text color="gray.1000" fontSize="xs" fontWeight={ 500 } mb={ 1 }>{ name }</Text>
      <Flex alignItems="center">
        { icon }
        <Skeleton isLoaded={ !isLoading } fontWeight="500" whiteSpace="pre-wrap" wordBreak="break-word" display="flex" ml={ 2 }>
          { value }
          { Boolean(valueSecondary) && <Text color="gray.1000"> ({ valueSecondary })</Text> }
        </Skeleton>
      </Flex>
    </Box>
  );
};

export default React.memo(TokenBalancesItem);
