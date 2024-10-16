import React, { useState } from "react";
import axios from "axios";
import { useSnackbar } from 'notistack'

const BurnButton = ({ fromAddress, toAddress, setRefreshTrigger }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const burnUSDC = async () => {
    setLoading(true);
    try {
      const response = await axios.post("https://hypertek-assignment-be.onrender.com/api/burnUSDC", {
        fromAddress,
        toAddress,
      });
      console.log("Burn transaction: ", response.data.transactionTX);
      enqueueSnackbar("Burn transaction: " + response.data.transactionTX, { variant: 'success' });
      setLoading(false);
      setRefreshTrigger((prev) => prev + 1);
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.data && error.response.data.error) {
        enqueueSnackbar("Error Burning USDC:" + error.response.data.error, { variant: 'error' });
      } else {
        enqueueSnackbar("Error Burning USDC:" + JSON.stringify(error.response.data.error), { variant: 'error' });
      }
    }
  };
  const buttonStyle = {
    backgroundColor: '#ff4d4d',
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
    backgroundColor: '#ffb3b3',
    cursor: 'not-allowed',
  };

  return (
    <button 
      onClick={burnUSDC} 
      disabled={loading} 
      style={loading ? disabledButtonStyle : buttonStyle}
    >
      {loading ? "Loading..." : "Burn USDC"}
    </button>
  );
};

export default BurnButton;
