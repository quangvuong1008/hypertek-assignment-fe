import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import USDC_ABI from "../abi/ERC20.json";

const WalletInfo = ({ title, walletAddress, refreshTrigger }) => {
  const [balanceUSDC, setBalanceUSDC] = useState(0);
  const [balanceETH, setBalanceETH] = useState(0);
  useEffect(() => {
    const fetchBalance = async (walletAddress) => {
      const provider = new ethers.providers.JsonRpcProvider(process.env.REACT_APP_RPC_URL);
      const usdcContract = new ethers.Contract(process.env.REACT_APP_USDC_CONTRACT_ADDRESS, USDC_ABI, provider);
      const balance = await usdcContract.balanceOf(walletAddress);
      setBalanceUSDC(ethers.utils.formatUnits(balance, 6)); // USDC has 6 decimals
    };
    const fetchBalanceETH = async (walletAddress) => {
      const provider = new ethers.providers.JsonRpcProvider(process.env.REACT_APP_RPC_URL);
      const balance = await provider.getBalance(walletAddress);
      setBalanceETH(ethers.utils.formatEther(balance));
    };
    if (walletAddress) {
      fetchBalance(walletAddress);
      fetchBalanceETH(walletAddress);
    }
  }, [walletAddress, refreshTrigger]);

  return (
    <div className="wallet-info">
      <h3 className="wallet-title">{title}</h3>
      <p className="wallet-address">
        Address: <a href={`https://sepolia.etherscan.io/address/${walletAddress}`} target="_blank" rel="noopener noreferrer">{walletAddress}</a>
      </p>
      <div className="balance-container">
        <p className="balance-item">USDC Balance: <span className="balance-value">{balanceUSDC}</span></p>
        <p className="balance-item">ETH Balance: <span className="balance-value">{balanceETH}</span></p>
      </div>
    </div>
  );
};

export default WalletInfo;
