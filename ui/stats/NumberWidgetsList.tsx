import { Grid } from '@chakra-ui/react';
import React from 'react';

import config from 'configs/app';
import useApiQuery from 'lib/api/useApiQuery';
import { STATS_COUNTER } from 'stubs/stats';
import StatsWidget from 'ui/shared/stats/StatsWidget';

import DataFetchAlert from '../shared/DataFetchAlert';
import { replaceValue } from './utils';

const UNITS_WITHOUT_SPACE = [ 's' ];

const NumberWidgetsList = () => {
  const { data: oldData, isPlaceholderData, isError } = useApiQuery('stats_counters', {
    queryOptions: {
      placeholderData: { counters: Array(10).fill(STATS_COUNTER) },
    },
  });
  const data = replaceValue(oldData, 'ETH', config.chain.shortName ?? 'ADI');

  if (isError) {
    return <DataFetchAlert/>;
  }

  return (
    <Grid
      gridTemplateColumns={{ base: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }}
      gridGap={ 4 }
    >
      {
        data?.counters?.map(({ id, title, value, units, description }, index) => {

          let unitsStr = '';
          if (units && UNITS_WITHOUT_SPACE.includes(units)) {
            unitsStr = units;
          } else if (units) {
            unitsStr = ' ' + units;
          }

          return (
            <StatsWidget
              key={ id + (isPlaceholderData ? index : '') }
              label={ title }
              value={ `${ Number(value).toLocaleString(undefined, { maximumFractionDigits: 3, notation: 'compact' }) }${ unitsStr }` }
              isLoading={ isPlaceholderData }
              hint={ description }
            />
          );
        })
      }
    </Grid>
  );
};

export default NumberWidgetsList;
