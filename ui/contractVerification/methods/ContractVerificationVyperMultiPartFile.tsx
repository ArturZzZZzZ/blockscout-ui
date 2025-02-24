import { Link, chakra } from '@chakra-ui/react';
import React from 'react';

import ContractVerificationMethod from '../ContractVerificationMethod';
import ContractVerificationFieldCompiler from '../fields/ContractVerificationFieldCompiler';
import ContractVerificationFieldEvmVersion from '../fields/ContractVerificationFieldEvmVersion';
import ContractVerificationFieldSources from '../fields/ContractVerificationFieldSources';

const MAIN_SOURCES_TYPES = [ '.vy' as const ];
const INTERFACE_TYPES = [ '.vy' as const, '.json' as const ];

const ContractVerificationVyperMultiPartFile = () => {

  const interfacesHint = (
    <>
      <chakra.span color="gray.1000">Add any </chakra.span>
      <Link color="green.500" href="https://docs.vyperlang.org/en/stable/interfaces.html" target="_blank">required interfaces</Link>
      <chakra.span color="gray.1000"> for the main compiled contract.</chakra.span>
    </>
  );

  return (
    <ContractVerificationMethod title="Contract verification via Vyper (multi-part files)">
      <ContractVerificationFieldCompiler isVyper/>
      <ContractVerificationFieldEvmVersion isVyper/>
      <ContractVerificationFieldSources
        name="sources"
        fileTypes={ MAIN_SOURCES_TYPES }
        title="Upload main *.vy source"
        hint={ `
          Primary compiled Vyper contract. 
          Only add the main contract here whose bytecode has been deployed, all other files can be uploaded to the interfaces box below.
        ` }
        required
      />
      <ContractVerificationFieldSources
        name="interfaces"
        fileTypes={ INTERFACE_TYPES }
        multiple
        fullFilePath
        title="Interfaces (.vy or .json)"
        hint={ interfacesHint }
      />
    </ContractVerificationMethod>
  );
};

export default React.memo(ContractVerificationVyperMultiPartFile);
