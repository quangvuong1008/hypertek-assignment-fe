import React, { useEffect, useState } from "react";
import WalletInfo from "./components/WalletInfo";
import MintButton from "./components/MintButton";
import CollectButton from "./components/CollectButton";
import BurnButton from "./components/BurnButton";
import axios from "axios";
import { useSnackbar } from 'notistack'
function App() {
  const { enqueueSnackbar } = useSnackbar();
  const [treasuryWallet, setTreasuryWallet] = useState(null);
  const [newWallet, setNewWallet] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const createWallet = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:3000/api/createNewWallet");
      enqueueSnackbar("New Wallet: " + response.data.walletAddress, { variant: 'success' });
      setNewWallet(response.data.walletAddress);
      setLoading(false);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        enqueueSnackbar("Error creating wallet:" + error.response.data.error, { variant: 'error' });
      } else {
        enqueueSnackbar("Error creating wallet:" + JSON.stringify(error), { variant: 'error' });
      }
      setLoading(false);
    }
  };

  const reGenerateWallet = async () => {
    setNewWallet(null);
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:3000/api/createNewWallet");
      enqueueSnackbar("New Wallet: " + response.data.walletAddress, { variant: 'success' });
      setNewWallet(response.data.walletAddress);
      setLoading(false);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        enqueueSnackbar("Error creating wallet:" + error.response.data.error, { variant: 'error' });
      } else {
        enqueueSnackbar("Error creating wallet:" + JSON.stringify(error), { variant: 'error' });
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchTreasuryWallet = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/getTreasuryWallet");
        setTreasuryWallet(response.data.walletAddress);
      } catch (error) {
        console.error("Error fetching treasury wallet:", error);
      }
    };
    fetchTreasuryWallet();
  }, []);

  return (
    <div className="App" style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#333', textAlign: 'center', marginBottom: '30px' }}>USDC Treasury</h1>

      <div style={{ backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '5px', marginBottom: '20px' }}>
        <WalletInfo title="Treasury Wallet" walletAddress={treasuryWallet} refreshTrigger={refreshTrigger} />
      </div>

      {newWallet && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <CollectButton fromAddress={newWallet} toAddress={treasuryWallet} setRefreshTrigger={setRefreshTrigger} />
          <BurnButton fromAddress={newWallet} toAddress={treasuryWallet} setRefreshTrigger={setRefreshTrigger} />
        </div>
      )}

      {!newWallet && (
        <button 
          onClick={createWallet} 
          disabled={loading}
          style={{
            backgroundColor: '#4CAF50',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
            display: 'block',
            margin: '0 auto'
          }}
        >
          {loading ? "Loading..." : "Create New Wallet"}
        </button>
      )}

      {newWallet && (
        <div style={{ backgroundColor: '#e6f7ff', padding: '20px', borderRadius: '5px', marginTop: '20px' }}>
          <WalletInfo title="New Wallet" walletAddress={newWallet} refreshTrigger={refreshTrigger} />
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <button 
              onClick={reGenerateWallet}
              style={{
                backgroundColor: '#f0ad4e',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              Re-Generate Wallet
            </button>
          </div>
        </div>
      )}

      {newWallet && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <MintButton walletAddress={newWallet} setRefreshTrigger={setRefreshTrigger} />
        </div>
      )}
    </div>
  );
}

export default App;
