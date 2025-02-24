import { Tooltip, chakra } from '@chakra-ui/react';
import React from 'react';

import dayjs from 'lib/date/dayjs';
import useTimeAgoIncrement from 'lib/hooks/useTimeAgoIncrement';
import Skeleton from 'ui/shared/chakra/Skeleton';

type Props = {
  timestamp?: string | number | null;
  fallbackText?: string;
  isLoading?: boolean;
  enableIncrement?: boolean;
  className?: string;
  color?: string;
};

const TimeAgoWithTooltip = ({ timestamp, fallbackText, isLoading, enableIncrement, className, color }: Props) => {
  const timeAgo = useTimeAgoIncrement(timestamp || '', enableIncrement && !isLoading);
  if (!timestamp && !fallbackText) {
    return null;
  }

  const content = timestamp ?
    <Tooltip label={ dayjs(timestamp).format('llll') }><chakra.span color={ color }>{ timeAgo }</chakra.span></Tooltip> :
    <span >{ fallbackText }</span>;

  return (
    <Skeleton isLoaded={ !isLoading } className={ className } >
      { content }
    </Skeleton>
  );
};

export default chakra(TimeAgoWithTooltip);
