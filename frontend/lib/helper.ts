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
export function sliceWithEllipsis(text: string,number:number): string {
  if (text?.length <= number) return text;
  return text?.slice(0, number) + "...";
}

