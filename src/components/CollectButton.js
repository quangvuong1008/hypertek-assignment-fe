import React, { useState } from "react";
import axios from "axios";
import { useSnackbar } from 'notistack'

const CollectButton = ({ fromAddress, toAddress, setRefreshTrigger }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const collectUSDC = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:3000/api/collectUSDC", {
        fromAddress
      });
      setLoading(false);
      enqueueSnackbar("Collect transaction: " + response.data.transactionTX, { variant: 'success' });
      setRefreshTrigger((prev) => prev + 1);
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.data && error.response.data.error) {
        enqueueSnackbar("Error collecting USDC:" + error.response.data.error, { variant: 'error' });
      } else {
        enqueueSnackbar("Error collecting USDC:" + JSON.stringify(error), { variant: 'error' });
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

  return (
    <button 
      onClick={collectUSDC} 
      disabled={loading} 
      style={loading ? disabledButtonStyle : buttonStyle}
    >
      {loading ? "Loading..." : "Collect USDC"}
    </button>
  );

  return <button onClick={collectUSDC} disabled={loading}>{loading ? "Loading..." : "Collect USDC"}</button>;
};

export default CollectButton;
