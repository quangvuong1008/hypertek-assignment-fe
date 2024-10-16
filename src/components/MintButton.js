import React, { useState } from "react";
import axios from "axios";
import { useSnackbar } from 'notistack'

const MintButton = ({ walletAddress, setRefreshTrigger }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(100);

  const mintUSDC = async () => {
    setLoading(true);
    if (amount <= 0) {
      enqueueSnackbar("Amount must be greater than 0", { variant: 'error' });
      return;
    }
    try {
      const response = await axios.post("https://hypertek-assignment-be.onrender.com/api/mintUSDC", {
        amount: amount, // Example amount of 100 USDC
        walletAddress,
      });
      console.log("Mint transaction: ", response.data.transactionTX);
      enqueueSnackbar({
        action: 'Mint transaction: ',
        message: response.data.transactionTX,
        variant: 'success'
      });
      setLoading(false);
      setRefreshTrigger((prev) => prev + 1);
    } catch (error) {
      setLoading(false)
      if (error.response && error.response.data && error.response.data.error) {
        enqueueSnackbar("Error minting USDC:" + error.response.data.error, { variant: 'error' });
      } else {
        enqueueSnackbar("Error minting USDC:" + JSON.stringify(error), { variant: 'error' });
      }
    }
  };
  const buttonStyle = {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s ease',
  };

  const disabledButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#a5d6a7',
    cursor: 'not-allowed',
  };

  const inputStyle = {
    padding: '8px',
    fontSize: '14px',
    marginRight: '10px',
    borderRadius: '3px',
    border: '1px solid #ccc',
  };

  return (
    <div>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={inputStyle}
        min="1"
      />
      <button 
        onClick={mintUSDC} 
        disabled={loading} 
        style={loading ? disabledButtonStyle : buttonStyle}
      >
        {loading ? "Loading..." : `Mint ${amount} USDC`}
      </button>
    </div>
  );
};

export default MintButton;
