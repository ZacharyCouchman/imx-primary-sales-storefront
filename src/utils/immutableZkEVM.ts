import { BrowserProvider } from "ethers";

export async function getImxBalance(provider: BrowserProvider) {
  const getBalanceResponse = await provider.send('eth_getBalance', []);
  console.log("get balance response: ", getBalanceResponse);
  return getBalanceResponse;
}