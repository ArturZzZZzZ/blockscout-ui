import { chakra, Checkbox, Code } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { useFormContext } from 'react-hook-form';

import type { FormFields } from '../types';
import type { SmartContractVerificationConfig } from 'types/client/contract';

import { getResourceKey } from 'lib/api/useApiQuery';
import FormFieldFancySelect from 'ui/shared/forms/fields/FormFieldFancySelect';

import ContractVerificationFormRow from '../ContractVerificationFormRow';

const OPTIONS_LIMIT = 50;

interface Props {
  isVyper?: boolean;
  isStylus?: boolean;
}

const ContractVerificationFieldCompiler = ({ isVyper, isStylus }: Props) => {
  const [ isNightly, setIsNightly ] = React.useState(false);
  const { formState, getValues, resetField } = useFormContext<FormFields>();
  const queryClient = useQueryClient();
  const config = queryClient.getQueryData<SmartContractVerificationConfig>(getResourceKey('contract_verification_config'));

  const handleCheckboxChange = React.useCallback(() => {
    if (isNightly) {
      const field = getValues('compiler');
      field?.value.includes('nightly') && resetField('compiler', { defaultValue: null });
    }
    setIsNightly(prev => !prev);
  }, [ getValues, isNightly, resetField ]);

  const options = React.useMemo(() => {
    const versions = (() => {
      if (isStylus) {
        return config?.stylus_compiler_versions;
      }
      if (isVyper) {
        return config?.vyper_compiler_versions;
      }
      return config?.solidity_compiler_versions;
    })();

    return versions?.map((option) => ({ label: option, value: option })) || [];
  }, [ isStylus, isVyper, config?.solidity_compiler_versions, config?.stylus_compiler_versions, config?.vyper_compiler_versions ]);

  const loadOptions = React.useCallback(async(inputValue: string) => {
    return options
      .filter(({ label }) => !inputValue || label.toLowerCase().includes(inputValue.toLowerCase()))
      .filter(({ label }) => isNightly ? true : !label.includes('nightly'))
      .slice(0, OPTIONS_LIMIT);
  }, [ isNightly, options ]);

  return (
    <ContractVerificationFormRow>
      <>
        { !isVyper && !isStylus && (
          <Checkbox
            size="lg"
            mb={ 2 }
            onChange={ handleCheckboxChange }
            isDisabled={ formState.isSubmitting }
          >
            Include nightly builds
          </Checkbox>
        ) }
        <FormFieldFancySelect<FormFields, 'compiler'>
          name="compiler"
          label="Compiler (enter version or use the dropdown)"
          placeholder="Enter or select compiler"
          loadOptions={ loadOptions }
          defaultOptions
          isRequired
          isAsync
        />
      </>
      { isVyper || isStylus ? null : (
        <chakra.div mt={{ base: 0, lg: 8 }} color="gray.1000">
          <chakra.span >The compiler version is specified in </chakra.span>
          <Code color="#808C8B" bg="green.700">pragma solidity X.X.X</Code>
          <chakra.span>. Use the compiler version rather than the nightly build. If using the Solidity compiler, run </chakra.span>
          <Code color="#808C8B" bg="green.700">solc —version</Code>
          <chakra.span> to check.</chakra.span>
        </chakra.div>
      ) }
    </ContractVerificationFormRow>
  );
};

export default React.memo(ContractVerificationFieldCompiler);
