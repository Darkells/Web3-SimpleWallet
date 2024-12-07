import React, { useState } from 'react';
import { ethers } from 'ethers';
import './Wallet.less';

const Wallet: React.FC = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // 连接钱包
  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        setError('MetaMask is not installed. Please install it to use this app.');
        return;
      }

      // 使用 ethers.js 6.x 创建 Web3Provider
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // 获取地址
      const account = await signer.getAddress();
      setWalletAddress(account);

      // 获取余额
      const balance = await provider.getBalance(account);
      setBalance(ethers.formatEther(balance)); // 以太坊单位转换
    } catch (err) {
      console.error(err);
      setError('Failed to connect wallet');
    }
  };

  // 断开钱包
  const disconnectWallet = () => {
    setWalletAddress(null);
    setBalance(null);
    setError(null);
  };

  // 切换网络
  const switchNetwork = async (chainId: string) => {
    try {
      if (!window.ethereum) {
        setError('MetaMask is not installed.');
        return;
      }
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId }],
      });
    } catch (switchError: unknown) {
      console.error(switchError);
      setError('Failed to switch network.');
    }
  };

  return (
    <div className="wallet-container">
      {/* 顶部切换网络按钮 */}
      <div className="network-switch">
        {walletAddress && (
          <>
            <button onClick={() => switchNetwork('0x1')} className="button mainnet">
              Switch to Mainnet
            </button>
            <button onClick={() => switchNetwork('0x5')} className="button goerli">
              Switch to Goerli
            </button>
          </>
        )}
      </div>

      {/* 右上角按钮 */}
      <header className="wallet-header">
        {!walletAddress ? (
          <button onClick={connectWallet} className="button connect">
            Connect Wallet
          </button>
        ) : (
          <>
            <span className="welcome-text">
              Hello, {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
            </span>
            <button onClick={disconnectWallet} className="button disconnect">
              Disconnect
            </button>
          </>
        )}
      </header>

      {/* 中间余额展示 */}
      {walletAddress && (
        <div className="balance-card">
          <p className="balance-title">Balance</p>
          <p className="balance-value">{balance} ETH</p>
        </div>
      )}

      {/* 错误信息 */}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Wallet;
