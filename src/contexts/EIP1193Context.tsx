import { createContext, useEffect, useState } from "react";
import { WrappedBrowserProvider } from "@imtbl/sdk/checkout";

export type EIP1193Provider = WrappedBrowserProvider & {
  isPassport?: boolean;
}
export interface EIP1193ContextState {
  provider: EIP1193Provider | null;
  setProvider: (provider: EIP1193Provider | null) => void;
  chainId: number | null;
  walletAddress: string;
  setWalletAddress: (address: string) => void;
  isPassportProvider: boolean;
}

export const EIP1193Context = createContext<EIP1193ContextState>({
  provider: null,
  setProvider: () => {},
  chainId: null,
  walletAddress: '',
  setWalletAddress: () => {},
  isPassportProvider: false
});

interface EIP1193ContextProvider {
  children: React.ReactNode;
}
export const EIP1193ContextProvider = ({children}: EIP1193ContextProvider) => {
  const [provider, setProvider] = useState<EIP1193Provider | null>(null);
  const [walletAddress, setWalletAddress] = useState('');
  const [chainId, setChainId] = useState<number | null>(null);
  const [isPassport, setIsPassport] = useState(false);

  useEffect(() => {
    if(!provider) {
      setWalletAddress('');
      setChainId(null);
      setIsPassport(false);
      return;
    }
    const getProviderDetails = async () => {
      setChainId(await provider.send('eth_chainId', []));
      setWalletAddress((await provider.send('eth_accounts', []))[0].toLowerCase() ?? '')
    }
    setProvider(provider as EIP1193Provider);
    setIsPassport(Boolean(provider.ethereumProvider?.isPassport))
    getProviderDetails();
  }, [provider]);

  useEffect(() => {
    if(!provider) return;

    function setChain(network: string) {
      console.log(network);
      setChainId(parseInt(network))
    }
    function setAccount(accounts: string[]) {
      console.log(accounts);
      setWalletAddress(accounts[0] ?? '');
    }

    async function setListeners(provider: EIP1193Provider) {
      try{
        provider.ethereumProvider?.on('chainChanged', setChain);
      } catch(err) {
        console.error(err)
      }

      try {
        provider.ethereumProvider?.on('accountsChanged', setAccount);
      } catch(err) {
        console.error(err)
      }

    }


    setListeners(provider);
    return () => {
      provider.ethereumProvider?.removeListener('chainChanged', setChain);
      provider.ethereumProvider?.removeListener('accountsChanged', setAccount);
    }
  }, [provider])

  return (
    <EIP1193Context.Provider value={{
      provider, 
      setProvider,
      chainId,
      walletAddress,
      setWalletAddress,
      isPassportProvider: isPassport,
      }}>
      {children}
    </EIP1193Context.Provider>
  )

}
