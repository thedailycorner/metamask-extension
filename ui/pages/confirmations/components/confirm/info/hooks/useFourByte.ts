import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Hex } from '@metamask/utils';
import {
  getKnownMethodData,
  use4ByteResolutionSelector,
} from '../../../../../../selectors';
import { getContractMethodData } from '../../../../../../store/actions';
import { hasTransactionData } from '../../../../../../../shared/modules/transaction.utils';

export const useFourByte = ({ to, data }: { to?: Hex; data?: Hex }) => {
  const dispatch = useDispatch();
  const isFourByteEnabled = useSelector(use4ByteResolutionSelector);
  const transactionTo = to as Hex | undefined;
  const transactionData = data as Hex | undefined;

  useEffect(() => {
    if (
      !isFourByteEnabled ||
      !hasTransactionData(transactionData) ||
      !transactionTo
    ) {
      return;
    }

    dispatch(getContractMethodData(transactionData));
  }, [isFourByteEnabled, transactionData, transactionTo, dispatch]);

  const methodData = useSelector((state) =>
    getKnownMethodData(state, transactionData),
  );

  if (!transactionTo) {
    return null;
  }

  return methodData;
};
