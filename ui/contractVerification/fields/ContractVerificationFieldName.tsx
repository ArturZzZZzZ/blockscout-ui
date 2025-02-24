import { chakra, Code } from '@chakra-ui/react';
import React from 'react';

import type { FormFields } from '../types';

import FormFieldText from 'ui/shared/forms/fields/FormFieldText';

import ContractVerificationFormRow from '../ContractVerificationFormRow';

interface Props {
  hint?: string;
}

const ContractVerificationFieldName = ({ hint }: Props) => {
  return (
    <ContractVerificationFormRow>
      <FormFieldText<FormFields>
        name="name"
        isRequired
        placeholder="Contract name"
        size={{ base: 'md', lg: 'lg' }}
        rules={{ maxLength: 255 }}
      />
      { hint ? <chakra.span color="gray.1000">{ hint }</chakra.span> : (
        <>
          <chakra.span color="gray.1000">Must match the name specified in the code. For example, in </chakra.span>
          <Code color="text_secondary">{ `contract MyContract {..}` }</Code>
          <chakra.span color="gray.1000">. <chakra.span fontWeight={ 600 }>MyContract</chakra.span> is the contract name.</chakra.span>
        </>
      ) }
    </ContractVerificationFormRow>
  );
};

export default React.memo(ContractVerificationFieldName);
