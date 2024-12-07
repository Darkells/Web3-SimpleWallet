// src/types.d.ts
interface EthereumProvider {
    isMetaMask?: boolean;
    request: (args: { method: string; params?: unknown[] }) => Promise<any>;
    on?: (event: string, listener: (...args: any[]) => void) => void;
  }
  
  interface Window {
    ethereum?: EthereumProvider;
  }
  