import { useMemo } from "react";
import {
  useContract,
  useSendTransaction,
  useTransactionReceipt,
} from "@starknet-react/core";

import { ContractWriteConfig, ContractWriteResult } from "@/type/type";

// Helper function to short address
export function addressSlice(address: string) {
  const userAddressStart = address.slice(0, 6);
  const userAddressEnd = address.slice(-5);
  return `${userAddressStart}...${userAddressEnd}`;
}

// Helper function to convert hex to decimal and format it
export const formatAmount = (hex: number) => {
  const decimal = parseInt(hex.toString(), 16);
  return decimal.toString();
};

export function felt252ToString(feltValue: number) {
  // Convert the Felt252 value to a hexadecimal string
  let hex = feltValue?.toString(16);

  // Add leading zeroes if the hex string length is not a multiple of 2
  if (hex?.length % 2 !== 0) hex = "0" + hex;

  // Convert the hex string to a readable ASCII string
  let result = "";
  for (let i = 0; i < hex?.length; i += 2) {
    const charCode = parseInt(hex?.substr(i, 2), 16);
    result += String?.fromCharCode(charCode);
  }

  return result;
}

// Helper function to short large sentence
export function sliceWithEllipsis(text: string, number: number): string {
  if (text?.length <= number) return text;
  return text?.slice(0, number) + "...";
}

// Helper function to write to a contract
export function useContractWrite(
  config: ContractWriteConfig
): ContractWriteResult {
  const { functionName, args = [], abi, contractAddress } = config;

  const { contract } = useContract({
    abi,
    address: contractAddress,
  });

  // Prepare contract calls
  const calls = useMemo(() => {
    const isValidArgs =
      Array.isArray(args) &&
      !args.some((arg) => arg === undefined || arg === null);

    if (!contract || !isValidArgs) {
      return undefined;
    }

    try {
      return [contract.populate(functionName, args)];
    } catch (error) {
      console.error(`Error populating contract call: ${error}`);
      return undefined;
    }
  }, [contract, functionName, args]);

  // Handle transaction sending
  const {
    sendAsync: writeAsync,
    data: writeData,
    isPending: writeIsPending,
    error,
  } = useSendTransaction({
    calls,
  });

  // Handle transaction receipt
  const {
    isLoading: waitIsLoading,
    data: waitData,
    isSuccess,
  } = useTransactionReceipt({
    hash: writeData?.transaction_hash,
    watch: true,
  });

  return {
    writeAsync,
    writeData,
    writeIsPending,
    waitIsLoading,
    waitData,
    calls,
    error,
    isSuccess,
  };
}
