import { Moment } from "moment";
import { Abi, AccountInterface, Call, Contract } from "starknet";

export type modal = {
  setIsOpen: () => void;
};

// type data = {
//   poolName: string;
//   poolType: string;
//   poolDetail: number;
//   image: number;
//   poolUrl: string;
//   startDate: Moment | string;
//   lockDate: string;
//   endDate: string;
//   poolOptionA: string;
//   poolOptionB: string;
//   account: string;
//   poolMin: number;
//   poolMax: number;
//   poolCreatorFee: string;
//   poolCategory: number;
// };

export interface poolModal {
  modalHandle: () => void;
  sendFn: () => void;
  data: sendFnType;
}

export interface creatorInputs {
  name: string;
  betType: number;
  description: string;
  eventDetailsUrl: string;
  startDate: Moment | string;
  lockTime: string;
  endTime: string;
  minBetAmount: number;
  maxBetAmount: number;
  creatorsFee: number;
  optionOne: string;
  optionTwo: string;
  poolImage: string;
  status: number;
  category: number;
}

export interface creatoHook {
  poolDemoImage: string;
  poolEnd: Moment | string;
  poolStart: Moment | string;
  poolLock: Moment | string;
  setEndDate: (x: number) => void;
  setLockDate: (x: number) => void;
  setImage: (x: null | string) => void;
  setStartDate: (x: number) => void;
}

export type sendFnType = {
  account: AccountInterface | undefined;
  endDate: number;
  lockDate: number;
  startDate: number;
  poolName: string;
  poolType: number;
  poolDetail: string;
  image: FileList | string | File;
  poolUrl: string;
  poolOptionA: string;
  poolOptionB: string;
  poolMin: number;
  poolMax: number;
  poolCreatorFee: number;
  poolCategory: number;
};

export interface PoolData {
  poolName: string;
  poolDescription: string;
  createdTimeStamp: string;
  creatorFee: string;
  isPrivate: boolean;
  initial_share_price: string;
  maxBetAmount: string;
  minBetAmount: string;
  option1: string;
  option2: string;
  poolStartTime: string;
  poolLockTime: string;
  poolEndTime: string;
  poolImage: string;
  pool_id: string;
  poolEventSourceUrl: string;
  totalBetAmountStrk: string;
  totalBetCount: string;
  totalShareOption1: string;
  totalShareOption2: string;
  totalStakeOption1: string;
  totalStakeOption2: string;
}

export interface ContractWriteConfig {
  functionName: string;
  abi: Abi;
  contractAddress: `0x${string}`;
  args?: string[];
}

export interface ContractWriteResult {
  writeAsync: (() => void) | undefined;
  writeData: any;
  writeIsPending: boolean;
  waitIsLoading: boolean;
  waitData: any;
  calls: Call[] | undefined;
  error: Error | null;
  isSuccess: boolean;
}
