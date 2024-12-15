// Contract details 
const contractABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "initialOwner",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "ERC721EnumerableForbiddenBatchMint",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "ERC721IncorrectOwner",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "ERC721InsufficientApproval",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "approver",
				"type": "address"
			}
		],
		"name": "ERC721InvalidApprover",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			}
		],
		"name": "ERC721InvalidOperator",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "ERC721InvalidOwner",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			}
		],
		"name": "ERC721InvalidReceiver",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			}
		],
		"name": "ERC721InvalidSender",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "ERC721NonexistentToken",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "ERC721OutOfBoundsIndex",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "OwnableInvalidOwner",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "OwnableUnauthorizedAccount",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "approved",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "ApprovalForAll",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "buyNFT",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "cancelSale",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "getApproved",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "getSaleDetails",
		"outputs": [
			{
				"internalType": "address",
				"name": "seller",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "isForSale",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			}
		],
		"name": "isApprovedForAll",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			}
		],
		"name": "listForSale",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "uri",
				"type": "string"
			}
		],
		"name": "mintNFT",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "mintPrice",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "mintingEnabled",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "ownerOf",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "data",
				"type": "bytes"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "setApprovalForAll",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_price",
				"type": "uint256"
			}
		],
		"name": "setMintPrice",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes4",
				"name": "interfaceId",
				"type": "bytes4"
			}
		],
		"name": "supportsInterface",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "toggleMinting",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "tokenByIndex",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "tokenCounter",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "tokenMetadata",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "uri",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "tokenOfOwnerByIndex",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "tokenSales",
		"outputs": [
			{
				"internalType": "address",
				"name": "seller",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "isForSale",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "tokenURI",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "tokensOfOwner",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];

//contract details
const ContractABI = [/*my abi here*/];
const contractAddress = "0x703795fbE76418a59e96bD4571faef3FED3BFB14"; //NFTVault__.sol
const pinataJWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJiMjMxYTc0NS1lYjVlLTQxYTEtYjlmNS05OGEwMTI3Y2NmNzEiLCJlbWFpbCI6ImFobWFkc3lha2lyMDIwQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiIzYjM5MzBiYzkyZTUxZDE1ZGNlMSIsInNjb3BlZEtleVNlY3JldCI6IjNlMWU2NDU0ZDJkNGU2MWFmMzVmYjk0MDhjODNjZThiODY1ZTBkOGYyODEyYjZlOGYyOGQ4MTk1MjMzYmQ0NTkiLCJleHAiOjE3NjMzNTUyMDd9.i2w2GtL2z_hZ9zBNqztYFztIQibMQuPeOy9MoiiC9N4";

// General: Web3 initialization
let web3;
if (window.ethereum) {
  web3 = new Web3(window.ethereum);
} else {
  alert("Please install MetaMask!");
}

// Update UI based on connection status
const updateUI = async (connected, account = '') => {
    const connectButton = document.getElementById("connect-button");
    const disconnectButton = document.getElementById("disconnect-button");
    const walletStatus = document.getElementById("wallet-status");
    
    if (connected) {
      connectButton.style.display = "none";
      disconnectButton.style.display = "block";
      walletStatus.textContent = `Wallet Connected: ${account}`;
      // Verify the connection is still valid
      const isStillConnected = await checkWalletConnection();
      if (!isStillConnected) {
        connected = false;
        account = '';
      }
    } else {
      connectButton.style.display = "block";
      disconnectButton.style.display = "none";
      walletStatus.textContent = "";
      localStorage.removeItem("userAccount");
    }
};

// Check wallet connection status
const checkWalletConnection = async () => {
  try {
    if (!window.ethereum) {
      console.log("MetaMask not installed");
      return false;
    }

    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
    if (accounts.length > 0) {
      const userAccount = accounts[0];
      // Verify the account is still authorized
      const isAuthorized = await window.ethereum._metamask.isUnlocked();
      if (isAuthorized) {
        localStorage.setItem("userAccount", userAccount);
        updateUI(true, userAccount);
        return true;
      }
    }
    
    localStorage.removeItem("userAccount");
    updateUI(false);
    return false;
  } catch (error) {
    console.error("Error checking wallet connection:", error);
    localStorage.removeItem("userAccount");
    updateUI(false);
    return false;
  }
};

// Initialize connection check on page load
window.addEventListener('load', async () => {
  await checkWalletConnection();
});

// Wallet connection
document.getElementById("connect-button")?.addEventListener("click", async () => {
  try {
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    const userAccount = accounts[0];
    localStorage.setItem("userAccount", userAccount);
    updateUI(true, userAccount);
    // Refresh the page to ensure all components are aware of the connection
    window.location.reload();
  } catch (error) {
    console.error("Wallet connection failed:", error);
    alert("Failed to connect wallet.");
  }
});

// Wallet disconnection
document.getElementById("disconnect-button")?.addEventListener("click", async () => {
  try {
    // Clear local storage
    localStorage.removeItem("userAccount");
    
    // Disconnect from MetaMask
    await window.ethereum.request({
      method: "wallet_revokePermissions",
      params: [{
        eth_accounts: {}
      }]
    });
    
    // Update UI
    updateUI(false);
    
    // For older versions of MetaMask that might not support wallet_revokePermissions
    if (window.ethereum._metamask && typeof window.ethereum._metamask.isUnlocked === 'function') {
      try {
        await window.ethereum._metamask.isUnlocked();
      } catch (e) {
        console.log("Additional disconnect attempt completed");
      }
    }

    // Reload page to reset all states
    window.location.reload();
  } catch (error) {
    console.error("Error disconnecting wallet:", error);
    alert("Failed to disconnect wallet. You may need to disconnect manually through MetaMask.");
  }
});

// Handle account changes
window.ethereum?.on('accountsChanged', async (accounts) => {
  if (accounts.length === 0) {
    // User disconnected their wallet
    localStorage.removeItem("userAccount");
    updateUI(false);
    window.location.reload();
  } else {
    // User switched accounts
    const userAccount = accounts[0];
    localStorage.setItem("userAccount", userAccount);
    await updateUI(true, userAccount);
    window.location.reload();
  }
});

// Handle chain changes
window.ethereum?.on('chainChanged', () => {
  // Reload the page on chain change as recommended by MetaMask
  window.location.reload();
});

// File handling
let selectedFile;
document.getElementById("file-picker")?.addEventListener("change", (event) => {
  selectedFile = event.target.files[0];
  document.getElementById("drop-zone").textContent = selectedFile.name;
});

document.getElementById("drop-zone")?.addEventListener("drop", (event) => {
  event.preventDefault();
  selectedFile = event.dataTransfer.files[0];
  document.getElementById("drop-zone").textContent = selectedFile.name;
});

document.getElementById("drop-zone")?.addEventListener("dragover", (event) => {
  event.preventDefault();
});

// Minting functionality
document.getElementById("mint-button")?.addEventListener("click", async () => {
	try {
	  // First, verify the current connection status
	  const isConnected = await checkWalletConnection();
	  if (!isConnected) {
		alert("Please connect your wallet first.");
		window.location.href = "wallet.html";
		return;
	  }
  
	  const userAccount = localStorage.getItem("userAccount");
	  // Double check the account exists and is valid
	  const accounts = await window.ethereum.request({ method: 'eth_accounts' });
	  if (!accounts.includes(userAccount)) {
		alert("Please reconnect your wallet.");
		localStorage.removeItem("userAccount");
		window.location.href = "wallet.html";
		return;
	  }
  
	  const nftName = document.getElementById("nft-name").value.trim();
	  const nftDescription = document.getElementById("nft-description").value.trim();
  
	  if (!selectedFile) {
		alert("Please upload a file.");
		return;
	  }
  
	  if (!nftName || !nftDescription) {
		alert("Please provide a name and description for your NFT.");
		return;
	  }
  
	  // Show loading state
	  const mintButton = document.getElementById("mint-button");
	  const originalButtonText = mintButton.textContent;
	  mintButton.disabled = true;
	  mintButton.textContent = "Processing...";
  
	  try {
		const contract = new web3.eth.Contract(contractABI, contractAddress);
		
		// Get the current token counter to use as the token ID
		const nextTokenId = await contract.methods.tokenCounter().call();
		
		// Create a URL-safe version of the name
		const safeNftName = nftName.replace(/[^a-z0-9]/gi, '_');
		
		// Create metadata object
		const metadata = {
		  name: nftName,
		  description: nftDescription,
		  image: "" // Will be updated after file upload
		};
  
		// Modify file name to include token ID
		const fileExtension = selectedFile.name.split('.').pop();
		
		// Create new filename with token ID for both image and metadata
		const modifiedImageFileName = `${nextTokenId}_${safeNftName}.${fileExtension}`;
		const modifiedMetadataFileName = `${nextTokenId}_${safeNftName}_metadata.json`;
		
		// Create a new File object with the modified image name
		const modifiedFile = new File([selectedFile], modifiedImageFileName, {
		  type: selectedFile.type
		});
  
		// Upload modified file to IPFS
		const formData = new FormData();
		formData.append("file", modifiedFile);
  
		const ipfsResponse = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
		  method: "POST",
		  headers: {
			Authorization: `Bearer ${pinataJWT}`,
		  },
		  body: formData,
		});
  
		const ipfsImageData = await ipfsResponse.json();
		if (!ipfsImageData.IpfsHash) throw new Error("IPFS upload failed.");
  
		const imageUri = `https://gateway.pinata.cloud/ipfs/${ipfsImageData.IpfsHash}`;
		metadata.image = imageUri;
  
		// Upload metadata to IPFS with custom filename
		const metadataBlob = new Blob([JSON.stringify(metadata)], { type: 'application/json' });
		const metadataFile = new File([metadataBlob], modifiedMetadataFileName, { type: 'application/json' });
		
		const metadataFormData = new FormData();
		metadataFormData.append("file", metadataFile);
  
		const metadataResponse = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
		  method: "POST",
		  headers: {
			Authorization: `Bearer ${pinataJWT}`,
		  },
		  body: metadataFormData,
		});
  
		const metadataIpfsData = await metadataResponse.json();
		if (!metadataIpfsData.IpfsHash) throw new Error("Metadata upload failed.");
  
		const metadataUri = `https://gateway.pinata.cloud/ipfs/${metadataIpfsData.IpfsHash}`;
  
		// Mint NFT using metadata URI
		const receipt = await contract.methods
		  .mintNFT(
			userAccount,     // recipient
			nftName,         // name
			nftDescription,  // description
			metadataUri     // uri (now points to metadata JSON)
		  )
		  .send({ 
			from: userAccount,
			value: await contract.methods.mintPrice().call() // Include mint price
		  });
  
		// Display success
		document.getElementById("minted-nft").innerHTML = `
		  <br>
		  <h3>NFT Minted Successfully!</h3>
		  <table>
			<tr><td>Name:</td><td>${nftName}</td></tr>
			<tr><td>Description:</td><td>${nftDescription}</td></tr>
			<tr><td>Image:</td><td><img src="${imageUri}" alt="${nftName}" width="200" /></td></tr>
			<tr><td>Token ID:</td><td>${nextTokenId}</td></tr>
			<tr><td>Metadata:</td><td><a href="${metadataUri}" target="_blank">View on IPFS</a></td></tr>
		  </table>
		`;
	  } catch (error) {
		throw error;
	  } finally {
		// Reset button state
		mintButton.disabled = false;
		mintButton.textContent = originalButtonText;
	  }
	} catch (error) {
	  console.error("Minting error:", error);
	  alert(`Failed to mint NFT: ${error.message}`);
	}
  });

// Display NFTs in Gallery
document.addEventListener("DOMContentLoaded", async () => {
	if (document.getElementById("nft-list")) {
	  try {
		// Show loading spinner
		const loadingSpinner = document.getElementById("loading");
		loadingSpinner.style.display = "block";
  
		// Verify wallet connection first
		const isConnected = await checkWalletConnection();
		if (!isConnected) {
		  alert("Please connect your wallet first.");
		  window.location.href = "wallet.html";
		  return;
		}
  
		const userAccount = localStorage.getItem("userAccount");
		// Double check the account exists and is valid
		const accounts = await window.ethereum.request({ method: 'eth_accounts' });
		if (!accounts.includes(userAccount)) {
		  alert("Please reconnect your wallet.");
		  localStorage.removeItem("userAccount");
		  window.location.href = "wallet.html";
		  return;
		}
  
		// Update wallet display
		const walletDisplay = document.getElementById("wallet-display");
		walletDisplay.textContent = `Connected Wallet: ${userAccount}`;
  
		const contract = new web3.eth.Contract(contractABI, contractAddress);
		const balance = await contract.methods.balanceOf(userAccount).call();
		const gallery = document.getElementById("nft-list");
		gallery.innerHTML = ''; // Clear existing content
  
		if (balance == 0) {
		  gallery.innerHTML = '<p class="no-nfts">No NFTs found in your collection.</p>';
		  loadingSpinner.style.display = "none";
		  return;
		}
  
		for (let i = 0; i < balance; i++) {
		  try {
			const tokenId = await contract.methods.tokenOfOwnerByIndex(userAccount, i).call();
			const metadata = await contract.methods.tokenMetadata(tokenId).call();
  
			// Fetch metadata from IPFS if it exists
			let nftData = metadata;
			if (metadata.uri && metadata.uri.includes('ipfs')) {
			  try {
				const response = await fetch(metadata.uri.replace('ipfs://', 'https://gateway.pinata.cloud/ipfs/'));
				if (response.ok) {
				  const ipfsMetadata = await response.json();
				  nftData = {
					...metadata,
					image: ipfsMetadata.image || metadata.uri
				  };
				}
			  } catch (error) {
				console.warn(`Failed to fetch IPFS metadata for token ${tokenId}:`, error);
			  }
			}
  
			// Create NFT card
			const nftCard = document.createElement('div');
			nftCard.className = 'nft-card';
			nftCard.innerHTML = `

			  <div class="nft-image">
				<img src="${nftData.image || nftData.uri}" 
					 alt="${nftData.name}" 
					 onerror="this.onerror=null; this.src='placeholder.png';"
					 loading="lazy" />
			  </div>
			  <div class="nft-info">
				<h3>${nftData.name}</h3>
				<p>${nftData.description}</p>
				<p class="token-id">Token ID: ${tokenId}</p>
				<div class="button-container">
      				<button onclick="goToTransferPage(${tokenId})" class="primary-button">Transfer</button>
      				<button onclick="goToSellPage(${tokenId})" class="primary-button">Sell</button>
    			</div>
			  </div>
			`;
  
			gallery.appendChild(nftCard);
		  } catch (error) {
			console.error(`Failed to load token ${i}:`, error);
			// Create error card
			const errorCard = document.createElement('div');
			errorCard.className = 'nft-card error';
			errorCard.innerHTML = `
			  <div class="nft-info">
				<h3>Error Loading NFT</h3>
				<p>Failed to load token ${i}</p>
			  </div>
			`;
			gallery.appendChild(errorCard);
		  }
		}
	  } catch (error) {
		console.error("Error fetching NFTs:", error);
		const gallery = document.getElementById("nft-list");
		gallery.innerHTML = '<p class="error-message">Failed to load NFTs. Please try again later.</p>';
	  } finally {
		// Hide loading spinner
		document.getElementById("loading").style.display = "none";
	  }
	}
  });

  function goToTransferPage(tokenId) {
    localStorage.setItem("selectedTokenId", tokenId);
    window.location.href = "transfer.html";
}

  function goToSellPage(tokenId) {
	localStorage.setItem("selectedTokenId", tokenId);
    window.location.href = `sell.html?tokenId=${tokenId}`;
}

// Handle document content loaded for the transfer page
document.addEventListener("DOMContentLoaded", async () => {
    const tokenId = localStorage.getItem("selectedTokenId");
    if (!tokenId) {
        alert("No NFT selected for transfer.");
        window.location.href = "gallery.html";
        return;
    }

    // UI Elements
    const nftName = document.getElementById("nft-name");
    const nftDescription = document.getElementById("nft-description");
    const nftImage = document.getElementById("nft-image");
    const nftDetails = document.getElementById("nft-details");

    const transferButton = document.getElementById("transfer-button");
    const burnButton = document.getElementById("burn-button");
    const recipientInput = document.getElementById("recipient");
    const spinner = document.getElementById("loading");

    const showToast = (message, type = "success") => {
        const toast = document.getElementById("toast");
        toast.textContent = message;
        toast.className = `toast ${type}`;
        toast.style.display = "block";

        setTimeout(() => {
            toast.style.display = "none";
        }, 3000);
    };

    // Burn address constant
    const burnAddress = "0x000000000000000000000000000000000000dEaD";

    // Burn button click event
    burnButton.addEventListener("click", () => {
        recipientInput.value = burnAddress;
    });

    // Fetch NFT metadata
	try {
        // Fetch metadata URI from the contract
        const contract = new web3.eth.Contract(contractABI, contractAddress);
        const metadata = await contract.methods.tokenMetadata(tokenId).call();

        console.log("Fetched NFT Metadata:", metadata);

        // Resolve metadata URI
        let metadataUri = metadata.uri || metadata.URI || metadata[2];
        if (metadataUri.startsWith("ipfs://")) {
            metadataUri = metadataUri.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/");
        }

        console.log("Metadata URI:", metadataUri);

        // Fetch metadata JSON from the resolved URI
        const metadataResponse = await fetch(metadataUri);
        if (!metadataResponse.ok) {
            throw new Error(`Failed to fetch metadata: ${metadataResponse.statusText}`);
        }

        const parsedMetadata = await metadataResponse.json();
        console.log("Parsed Metadata JSON:", parsedMetadata);

        // Update UI with parsed metadata
        nftDetails.textContent = `Token ID: ${tokenId}`;
        nftName.textContent = parsedMetadata.name || metadata.name || "NFT Name Unavailable";
        nftDescription.textContent = parsedMetadata.description || metadata.description || "No description provided.";

        // Resolve image URL
        let imageUrl = parsedMetadata.image || metadata[2];
        if (imageUrl.startsWith("ipfs://")) {
            imageUrl = imageUrl.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/");
        }

        console.log("Image URL:", imageUrl);

        nftImage.src = imageUrl;
        nftImage.onerror = () => {
            console.error("Failed to load image:", imageUrl);
            nftImage.src = "placeholder.png";
        };

    } catch (error) {
        console.error("Error fetching metadata or rendering NFT:", error);
        nftName.textContent = "Error loading NFT";
        nftDescription.textContent = "Metadata could not be retrieved.";
        nftImage.src = "placeholder.png";
    }

    // Transfer button logic
    transferButton.addEventListener("click", async () => {
        const recipient = recipientInput.value.trim();
        if (!web3.utils.isAddress(recipient)) {
            showToast("Invalid wallet address.", "error");
            return;
        }

        if (recipient.toLowerCase() === burnAddress.toLowerCase()) {
            const confirmBurn = confirm("Are you sure you want to burn this NFT? This action cannot be undone.");
            if (!confirmBurn) {
                return;
            }
        }

        try {
            spinner.style.display = "block";
            const accounts = await web3.eth.getAccounts();
            const sender = accounts[0];
            const contract = new web3.eth.Contract(contractABI, contractAddress);

            await contract.methods
                .transferFrom(sender, recipient, tokenId)
                .send({ from: sender });

            showToast("NFT transferred successfully!", "success");
            setTimeout(() => {
                window.location.href = "gallery.html";
            }, 3000);
        } catch (error) {
            console.error("Transfer failed:", error);
            showToast("Transfer failed. Please try again.", "error");
        } finally {
            spinner.style.display = "none";
        }
    });
});

// Handle document content loaded for the sell page
document.addEventListener("DOMContentLoaded", async () => {
    const tokenId = localStorage.getItem("selectedTokenId");
    if (!tokenId) {
        alert("No NFT selected for selling.");
        window.location.href = "gallery.html";
        return;
    }

    // UI Elements
    const nftName = document.getElementById("nft-name");
    const nftDescription = document.getElementById("nft-description");
    const nftImage = document.getElementById("nft-image");
    const nftDetails = document.getElementById("nft-details");
    const sellButton = document.getElementById("sell-button");
    const priceInput = document.getElementById("price");
    const spinner = document.getElementById("loading");

    const showToast = (message, type = "success") => {
        const toast = document.getElementById("toast");
        toast.textContent = message;
        toast.className = `toast ${type}`;
        toast.style.display = "block";

        setTimeout(() => {
            toast.style.display = "none";
        }, 3000);
    };

    // Fetch NFT metadata
    try {
        const contract = new web3.eth.Contract(contractABI, contractAddress);
        const metadata = await contract.methods.tokenMetadata(tokenId).call();

        let metadataUri = metadata.uri || metadata.URI || metadata[2];
        if (metadataUri.startsWith("ipfs://")) {
            metadataUri = metadataUri.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/");
        }

        const metadataResponse = await fetch(metadataUri);
        if (!metadataResponse.ok) throw new Error("Failed to fetch metadata.");

        const parsedMetadata = await metadataResponse.json();

        nftDetails.textContent = `Token ID: ${tokenId}`;
        nftName.textContent = parsedMetadata.name || "NFT Name Unavailable";
        nftDescription.textContent = parsedMetadata.description || "No description provided.";

        let imageUrl = parsedMetadata.image || metadata[2];
        if (imageUrl.startsWith("ipfs://")) {
            imageUrl = imageUrl.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/");
        }

        nftImage.src = imageUrl;
        nftImage.onerror = () => {
            nftImage.src = "placeholder.png";
        };
    } catch (error) {
        console.error("Error loading NFT metadata:", error);
        nftName.textContent = "Error loading NFT";
        nftDescription.textContent = "Metadata could not be retrieved.";
        nftImage.src = "placeholder.png";
    }

    // Sell button logic
    sellButton.addEventListener("click", async () => {
        const price = parseFloat(priceInput.value.trim());
        if (isNaN(price) || price <= 0) {
            showToast("Please enter a valid price.", "error");
            return;
        }

        try {
            spinner.style.display = "block";
            const accounts = await web3.eth.getAccounts();
            const seller = accounts[0];
            const contract = new web3.eth.Contract(contractABI, contractAddress);

            await contract.methods.listForSale(tokenId, web3.utils.toWei(price.toString(), "ether"))
                .send({ from: seller });

            showToast("NFT listed for sale successfully!", "success");
            setTimeout(() => {
                window.location.href = "marketplace.html";
            }, 3000);
        } catch (error) {
            console.error("Error listing NFT for sale:", error);
            showToast("Failed to list NFT for sale. Please try again.", "error");
        } finally {
            spinner.style.display = "none";
        }
    });
});



// marketplace.html - Fetch and display NFTs for sale
async function loadMarketplace() {
    const marketplaceContainer = document.getElementById("marketplace-container");
    marketplaceContainer.innerHTML = "";

    const totalSupply = await contract.methods.tokenCounter().call();
    for (let tokenId = 0; tokenId < totalSupply; tokenId++) {
        const saleDetails = await contract.methods.getSaleDetails(tokenId).call();
        if (saleDetails.isForSale) {
            const metadata = await contract.methods.tokenMetadata(tokenId).call();

            const nftDiv = document.createElement("div");
            nftDiv.className = "nft";

            nftDiv.innerHTML = `
                <img src="${metadata.uri}" alt="${metadata.name}">
                <h2>${metadata.name}</h2>
                <p>${metadata.description}</p>
                <p>Token ID: ${tokenId}</p>
                <p>Price: ${web3.utils.fromWei(saleDetails.price, "ether")} ETH</p>
                <button class="buy-button" data-token-id="${tokenId}" data-price="${saleDetails.price}">
                    Buy
                </button>
            `;

            marketplaceContainer.appendChild(nftDiv);
        }
    }

    document.querySelectorAll(".buy-button").forEach(button => {
        button.addEventListener("click", event => {
            const tokenId = event.target.getAttribute("data-token-id");
            const price = event.target.getAttribute("data-price");
            window.location.href = `buy.html?tokenId=${tokenId}&price=${price}`;
        });
    });
}

if (window.location.pathname.includes("marketplace.html")) {
    loadMarketplace();
}

// buy.html - Buy NFT functionality
document.getElementById("buy-button").addEventListener("click", async () => {
    const tokenId = parseInt(new URLSearchParams(window.location.search).get("tokenId"));
    const price = new URLSearchParams(window.location.search).get("price");

    try {
        const accounts = await ethereum.request({ method: "eth_requestAccounts" });
        const account = accounts[0];
        await contract.methods.buyNFT(tokenId).send({ from: account, value: price });
        alert("NFT purchased successfully!");
        window.location.href = "marketplace.html";
    } catch (error) {
        console.error("Error buying NFT:", error);
        alert("Failed to purchase NFT.");
    }
});


// Buy NFT Logic
document.addEventListener('DOMContentLoaded', async () => {
    if (window.location.pathname.includes('buy.html')) {
        const queryParams = new URLSearchParams(window.location.search);
        const tokenId = queryParams.get('tokenId');
        const price = queryParams.get('price');

        if (!tokenId || !price) {
            displayToast('Error: Missing NFT details!', 'error');
            return;
        }

        try {
            const nftDetails = await getNFTDetails(tokenId);
            displayNFTDetails(nftDetails, price);
        } catch (error) {
            console.error('Failed to fetch NFT details:', error);
            displayToast('Failed to load NFT details.', 'error');
        }

        document.getElementById('buy-button').addEventListener('click', async () => {
            await buyNFT(tokenId, price);
        });
    }
});

// Fetch NFT details (stub for now, customize as needed)
async function getNFTDetails(tokenId) {
    // Replace this with logic to fetch NFT details from the contract
    return {
        name: `NFT #${tokenId}`,
        description: 'This is a placeholder NFT description.',
        image: 'placeholder.png',
    };
}

// Display NFT details on the page
function displayNFTDetails(details, price) {
    document.getElementById('nft-name').textContent = details.name;
    document.getElementById('nft-description').textContent = details.description;
    document.getElementById('nft-image').src = details.image;
    document.getElementById('nft-details').textContent = `Token ID: ${tokenId}`;
    document.getElementById('nft-price').textContent = `Price: ${Web3.utils.fromWei(price, 'ether')} ETH`;
}

// Buy NFT function
async function buyNFT(tokenId, price) {
    try {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        const buyer = accounts[0];

        const result = await contract.methods
            .buyNFT(tokenId)
            .send({ from: buyer, value: price });

        console.log('Transaction successful:', result);
        displayToast('NFT purchased successfully!', 'success');
        document.getElementById('buy-status').textContent = 'Purchase complete!';
    } catch (error) {
        console.error('Transaction failed:', error);
        displayToast('Purchase failed. Please try again.', 'error');
        document.getElementById('buy-status').textContent = 'Purchase failed.';
    } finally {
        document.getElementById('loading').style.display = 'none';
    }
}

// Display toast notifications
function displayToast(message, type) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type}`;
    toast.style.display = 'block';

    setTimeout(() => {
        toast.style.display = 'none';
    }, 3000);
}






