import { useColorModeValue, chakra } from '@chakra-ui/react';
import React from 'react';

import IconSvg from 'ui/shared/IconSvg';

const NftFallback = ({ className }: { className?: string }) => {
  return (
    <IconSvg
      className={ className }
      name="nft_shield"
      p="50px"
      color={ useColorModeValue('blackAlpha.500', 'whiteAlpha.500') }
      bgColor={ useColorModeValue('blackAlpha.50', '#262626') }
    />
  );
};

export default chakra(NftFallback);
