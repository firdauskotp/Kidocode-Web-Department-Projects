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
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "newUri",
				"type": "string"
			}
		],
		"name": "updateTokenURI",
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
const contractAddress = "0xeC68870f87Aef24f4722Fa7791F8A27eDeBED79d"; //NFTrader3.sol
const pinataJWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJiMjMxYTc0NS1lYjVlLTQxYTEtYjlmNS05OGEwMTI3Y2NmNzEiLCJlbWFpbCI6ImFobWFkc3lha2lyMDIwQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiIzYjM5MzBiYzkyZTUxZDE1ZGNlMSIsInNjb3BlZEtleVNlY3JldCI6IjNlMWU2NDU0ZDJkNGU2MWFmMzVmYjk0MDhjODNjZThiODY1ZTBkOGYyODEyYjZlOGYyOGQ4MTk1MjMzYmQ0NTkiLCJleHAiOjE3NjMzNTUyMDd9.i2w2GtL2z_hZ9zBNqztYFztIQibMQuPeOy9MoiiC9N4";

const showToast = (message, type = "success") => {
	const toast = document.getElementById("toast");
	toast.textContent = message;
	toast.className = `toast ${type}`;
	toast.style.display = "block";

	setTimeout(() => {
		toast.style.display = "none";
	}, 3000);
};

// General: Web3 initialization
let web3;
if (window.ethereum) {
  web3 = new Web3(window.ethereum);
} else {
  showToast("Please install MetaMask!", "error");
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
document.getElementById("connect-button")?.addEventListener
// Should check element exists before adding listener:
const connectButton = document.getElementById("connect-button");
if (connectButton) {
    connectButton.addEventListener("click", async () => {
		try {
			const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
			const userAccount = accounts[0];
			localStorage.setItem("userAccount", userAccount);
			updateUI(true, userAccount);
			// Refresh the page to ensure all components are aware of the connection
			window.location.reload();
		  } catch (error) {
			console.error("Wallet connection failed:", error);
			showToast("Failed to connect wallet.", "error");
		  }
    });
}

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
	showToast("Failed to disconnect wallet. You may need to disconnect manually through MetaMask.", "error");
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

// Handle document content loaded for the mint page
document.addEventListener("DOMContentLoaded", () => {
	// Clear the description field and other inputs on page load
	document.getElementById("nft-description").value = "";
	document.getElementById("nft-name").value = "";
	if (document.getElementById("file-name")) {
		document.getElementById("file-name").textContent = "No file selected";
	}
  
	// Maximum allowed file size in bytes (e.g., 10MB)
	const MAX_FILE_SIZE = 10 * 1024 * 1024;
  
	// File handling
	let selectedFile;
	const filePicker = document.getElementById("file-picker");
	const dropZone = document.getElementById("drop-zone");
	const fileNameDisplay = document.getElementById("file-name");
	const clearFileButton = document.getElementById("clear-file");
  
  // Handle click on the drop zone to open file explorer
  dropZone?.addEventListener("click", () => {
	filePicker.click();
  });    
	
	// Handle manual file selection
	filePicker?.addEventListener("change", (event) => {
		selectedFile = event.target.files[0];
		if (selectedFile) {
			fileNameDisplay.textContent = selectedFile.name;
			clearFileButton.style.display = "inline-block";
		}
	});
  
	// Handle drag-and-drop file selection
	dropZone?.addEventListener("drop", (event) => {
		event.preventDefault();
		selectedFile = event.dataTransfer.files[0];
		if (selectedFile) {
			fileNameDisplay.textContent = selectedFile.name;
			clearFileButton.style.display = "inline-block";
		}
	});
  
	dropZone?.addEventListener("dragover", (event) => {
		event.preventDefault();
	});
  
	// Prevent "Clear Selection" button click from triggering the drop zone click
	clearFileButton?.addEventListener("click", (event) => {
		event.stopPropagation(); // Prevent the click from propagating to the drop zone
		selectedFile = null;
		filePicker.value = ""; // Reset file picker
		fileNameDisplay.textContent = "No file selected";
		clearFileButton.style.display = "none";
	});
  
	// Minting functionality
	document.getElementById("mint-button")?.addEventListener("click", async () => {
		try {
		  // Verify wallet connection
		  const isConnected = await checkWalletConnection();
		  if (!isConnected) {
			showToast("Please connect your wallet first.", "error");
			setTimeout(() => window.location.href = "wallet.html", 3000);
		  return;
		  }
	
		  const userAccount = localStorage.getItem("userAccount");
		  const accounts = await window.ethereum.request({ method: "eth_accounts" });
		  if (!accounts.includes(userAccount)) {
			showToast("Please connect your wallet first.", "error");
			localStorage.removeItem("userAccount");
			setTimeout(() => window.location.href = "wallet.html", 3000);
			return;
		  }
	
		  // Input validation
		  const nftName = document.getElementById("nft-name").value.trim();
		  const nftDescription = document.getElementById("nft-description").value.trim();
		  const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
	
		  if (!selectedFile) {
			showToast("Please upload a file.", "error");
			return;
		  }
	
		  if (!allowedTypes.includes(selectedFile.type)) {
			showToast("Invalid file type. Please upload an image.", "error");
			return;
		  }
	
		  if (selectedFile.size > MAX_FILE_SIZE) {
			showToast("File size must be less than 10MB.", "error");
			return;
		  }
	
		  if (!nftName || !nftDescription) {
			showToast("Please provide a name and description for your NFT.", "error");
			return;
		  }
	
		  if (nftName.length > 50) {
			showToast("NFT name must be 50 characters or less.", "error");
			return;
		  }
	
		  if (nftDescription.length > 500) {
			showToast("NFT description must be 500 characters or less.", "error");
			return;
		  }
	
		  // Get mint price first for confirmation
		  const contract = new web3.eth.Contract(contractABI, contractAddress);
		  const mintPrice = await contract.methods.mintPrice().call();
		  const mintPriceEth = web3.utils.fromWei(mintPrice, 'ether');
	
		  // Show confirmation dialog
		  const confirmMessage = `You are about to mint an NFT with:

● Name: ${nftName}
● Description: ${nftDescription}
● Image: ${selectedFile.name}

This will:
1. Upload your image to IPFS
2. Create metadata with your NFT details
3. Trigger a transaction to mint your NFT

Would you like to proceed?`;			
	
		  if (!confirm(confirmMessage)) {
			return;
		  }
	
		  // Show loading state
		  const mintButton = document.getElementById("mint-button");
		  const originalButtonText = mintButton.textContent;
		  mintButton.disabled = true;
		  mintButton.textContent = "Preparing files...";
	
		  try {
			const nextTokenId = await contract.methods.tokenCounter().call();
	
			// Upload image to IPFS first
			const safeNftName = nftName.replace(/[^a-z0-9]/gi, "_");
			const fileExtension = selectedFile.name.split(".").pop();
			const modifiedImageFileName = `${nextTokenId}_${safeNftName}.${fileExtension}`;
	
			const modifiedFile = new File([selectedFile], modifiedImageFileName, {
			  type: selectedFile.type,
			});
	
			const formData = new FormData();
			formData.append("file", modifiedFile);
	
			mintButton.textContent = "Uploading image...";
			const ipfsResponse = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
			  method: "POST",
			  headers: {
				Authorization: `Bearer ${pinataJWT}`,
			  },
			  body: formData,
			});
	
			const ipfsImageData = await ipfsResponse.json();
			if (!ipfsImageData.IpfsHash) throw new Error("IPFS image upload failed.");
	
			const imageUri = `https://gateway.pinata.cloud/ipfs/${ipfsImageData.IpfsHash}`;
	
			// Create and upload metadata
			mintButton.textContent = "Uploading metadata...";
			const metadata = {
			  name: nftName,
			  description: nftDescription,
			  image: imageUri,
			};
	
			const modifiedMetadataFileName = `${nextTokenId}_${safeNftName}_metadata.json`;
			const metadataBlob = new Blob([JSON.stringify(metadata)], { type: "application/json" });
			const metadataFile = new File([metadataBlob], modifiedMetadataFileName, {
			  type: "application/json",
			});
	
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
	
			// Update button text for blockchain interaction
			mintButton.textContent = "Confirm transaction in wallet...";
	
			// Now initiate the blockchain transaction with the complete metadata
			const receipt = await contract.methods
			  .mintNFT(userAccount, nftName, nftDescription, metadataUri)
			  .send({
				from: userAccount,
				value: mintPrice
			  });
	
			// Show success message with detailed information
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
			mintButton.disabled = false;
			mintButton.textContent = originalButtonText;
		  }
		} catch (error) {
		  console.error("Minting error:", error);
		  alert(`Failed to mint NFT: ${error.message}`);
		}
	  });
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
			showToast("Please connect your wallet first.", "error");
			setTimeout(() => window.location.href = "wallet.html", 3000);
		  return;
		}
  
		const userAccount = localStorage.getItem("userAccount");
		// Double check the account exists and is valid
		const accounts = await window.ethereum.request({ method: 'eth_accounts' });
		if (!accounts.includes(userAccount)) {
		  showToast("Please connect your wallet first.", "error");
		  localStorage.removeItem("userAccount");
		  setTimeout(() => window.location.href = "wallet.html", 3000);
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
		
				// Check if the NFT is on sale
				const saleDetails = await contract.methods.getSaleDetails(tokenId).call();
				const isForSale = saleDetails.isForSale;
		
				// Create NFT card
				const nftCard = document.createElement('div');
				nftCard.className = 'nft-card';
				nftCard.innerHTML = `
					<div class="nft-image">
						<img src="${nftData.image || nftData.uri}" 
							 alt="${nftData.name}" 
							 onerror="this.onerror=null; this.src='https://picsum.photos/900/600';"
							 loading="lazy" />
					</div>
					<div class="nft-info">
						<h3>${nftData.name}</h3>
						<p>${nftData.description}</p>
						<p class="token-id">Token ID: ${tokenId}</p>
						<div class="button-container">
							${isForSale ? '' : `<button onclick="goToTransferPage(${tokenId})" class="primary-button">Transfer</button>`}

							<button onclick="${isForSale ? `goToCancelSellPage(${tokenId})` : `goToSellPage(${tokenId})`}" 
									class="secondary-button">
								${isForSale ? "Cancel Sale" : "Sell"}
							</button>
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

function goToCancelSellPage(tokenId) {
    localStorage.setItem("selectedTokenId", tokenId);
    window.location.href = "cancel_sell.html";
}

// Handle document content loaded for the transfer page
document.addEventListener("DOMContentLoaded", async () => {
    const tokenId = localStorage.getItem("selectedTokenId");
    if (!tokenId) {
        //alert("No NFT selected for transfer.");
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

    // Burn address constant
    const burnAddress = "0x000000000000000000000000000000000000dEaD";

	// Store connected wallet address
	let senderAddress = null;

	try {
		// Get the currently connected wallet address
		const accounts = await web3.eth.getAccounts();
		senderAddress = accounts[0];

	} catch (error) {
		console.error("Error fetching wallet address:", error);
		showToast("Unable to fetch wallet address. Please try again.", "error");
		return;
	}

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
            nftImage.src = "https://picsum.photos/900/600";
        };

    } catch (error) {
        console.error("Error fetching metadata or rendering NFT:", error);
        nftName.textContent = "Error loading NFT";
        nftDescription.textContent = "Metadata could not be retrieved.";
        nftImage.src = "https://picsum.photos/900/600";
    }

    // Transfer button logic
    transferButton.addEventListener("click", async () => {
        const recipient = recipientInput.value.trim();
        if (!web3.utils.isAddress(recipient)) {
            showToast("Invalid wallet address.", "error");
            return;
        }

		// Prevent transferring NFT to the user's own address
        if (recipient.toLowerCase() === senderAddress.toLowerCase()) {
            showToast("You cannot transfer an NFT to your own wallet.", "error");
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
        //alert("No NFT selected for selling.");
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
            nftImage.src = "https://picsum.photos/900/600";
        };
    } catch (error) {
        console.error("Error loading NFT metadata:", error);
        nftName.textContent = "Error loading NFT";
        nftDescription.textContent = "Metadata could not be retrieved.";
        nftImage.src = "https://picsum.photos/900/600";
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

// Handle document content loaded for the marketplace page
document.addEventListener("DOMContentLoaded", async () => {
    const marketplaceContainer = document.getElementById("marketplace");
    const loadingSpinner = document.getElementById("loading");
    const statusMessage = document.getElementById("marketplace-status");

    try {
        const contract = new web3.eth.Contract(contractABI, contractAddress);
        const totalSupply = await contract.methods.tokenCounter().call();

        let nftsForSale = [];
        for (let tokenId = 0; tokenId < totalSupply; tokenId++) {
            const saleDetails = await contract.methods.getSaleDetails(tokenId).call();
            if (saleDetails.isForSale) {
                nftsForSale.push({
                    tokenId,
                    seller: saleDetails.seller,
                    price: web3.utils.fromWei(saleDetails.price, "ether"),
                });
            }
        }

        if (nftsForSale.length === 0) {
            statusMessage.textContent = "No NFTs are currently listed for sale.";
            statusMessage.style.display = "block";
            loadingSpinner.style.display = "none";
            return;
        }

        for (const nft of nftsForSale) {
            const metadata = await contract.methods.tokenMetadata(nft.tokenId).call();
            let metadataUri = metadata.uri || metadata.URI || metadata[2];
            if (metadataUri.startsWith("ipfs://")) {
                metadataUri = metadataUri.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/");
            }

            let parsedMetadata;
            try {
                const metadataResponse = await fetch(metadataUri);
				if (metadataResponse.ok) {
					parsedMetadata = await metadataResponse.json();
				} else {
					throw new Error("Invalid metadata response");
				}
            } catch (error) {
                console.warn(`Failed to fetch metadata for token ${nft.tokenId}:`, error);
                parsedMetadata = {
                    name: `Token #${nft.tokenId}`,
                    description: "No description available.",
                    image: "https://picsum.photos/900/600",
                };
            }

            const nftCard = document.createElement("div");
            nftCard.className = "nft-card";

            const imageUrl = parsedMetadata.image.startsWith("ipfs://")
                ? parsedMetadata.image.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/")
                : parsedMetadata.image;

			// Display the seller's wallet address or ENS
			let sellerDisplay = nft.seller;
			try {
				const sellerEns = await web3.eth.ens.getName(nft.seller);
				if (sellerEns && sellerEns.name) {
					sellerDisplay = sellerEns.name;
				}else {
					// Split the wallet address into two lines
					const halfLength = Math.ceil(nft.seller.length / 2);
					sellerDisplay = `${nft.seller.slice(0, halfLength)}<br>${nft.seller.slice(halfLength)}`;
				}
			} catch (err) {
				console.warn("ENS resolution failed. Falling back to wallet address.");
				// Split the wallet address into two lines
				const halfLength = Math.ceil(nft.seller.length / 2);
				sellerDisplay = `${nft.seller.slice(0, halfLength)}<br>${nft.seller.slice(halfLength)}`;
			}
				
            nftCard.innerHTML = `
                <div class="nft-image">
                    <img src="${imageUrl}" alt="${parsedMetadata.name}">
                </div>
                <div class="nft-info">
                    <h3>${parsedMetadata.name || `Token #${nft.tokenId}`}</h3>
                    <p>${parsedMetadata.description || "No description provided."}</p>
                    <p>Token ID: ${nft.tokenId}</p>
                    <p>Price: ${nft.price} ETH</p>
					<p>Seller: ${sellerDisplay}</p>
                    <button onclick="goToBuyPage(${nft.tokenId}, '${nft.price}')" class="primary-button">Purchase</button>
                </div>
            `;
            marketplaceContainer.appendChild(nftCard);
        }

        loadingSpinner.style.display = "none";
    } catch (error) {
        console.error("Error loading marketplace:", error);
        statusMessage.textContent = "Failed to load NFTs. Please try again later.";
        statusMessage.style.display = "block";
        loadingSpinner.style.display = "none";
    }

    // Function to redirect user to buy.html
    window.goToBuyPage = (tokenId, price) => {
        localStorage.setItem("selectedTokenId", tokenId);
        localStorage.setItem("selectedPrice", price);
        window.location.href = `buy.html?tokenId=${tokenId}&price=${price}`;
    };
});

// Handle document content loaded for the buy page
document.addEventListener("DOMContentLoaded", async () => {
    const tokenId = localStorage.getItem("selectedTokenId");
    const priceInEth = localStorage.getItem("selectedPrice");
    const nftImage = document.getElementById("nft-image");
    const nftName = document.getElementById("nft-name");
    const nftDescription = document.getElementById("nft-description");
    const nftDetails = document.getElementById("nft-details");
    const nftPrice = document.getElementById("nft-price");
    const nftSeller = document.getElementById("nft-seller");
    const buyButton = document.getElementById("buy-button");
    const spinner = document.getElementById("loading");

    if (!tokenId || !priceInEth) {
        //showToast("Invalid NFT selection. Please return to marketplace", "error");
        return;
    }

    try {
        const contract = new web3.eth.Contract(contractABI, contractAddress);

        // Fetch sale details
        const saleDetails = await contract.methods.getSaleDetails(tokenId).call();
        const seller = saleDetails.seller;

        // Attempt to resolve ENS name
        let sellerDisplay = seller; // Default to wallet address
        try {
            const sellerEns = await web3.eth.ens.getName(seller);
            if (sellerEns && sellerEns.name) {
                sellerDisplay = sellerEns.name;
            }
        } catch (error) {
            console.warn("Failed to resolve ENS name for seller:", seller);
        }

        // Fetch and display NFT metadata
        const metadata = await contract.methods.tokenMetadata(tokenId).call();
        let metadataUri = metadata.uri || metadata.URI || metadata[2];
        if (metadataUri.startsWith("ipfs://")) {
            metadataUri = metadataUri.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/");
        }

        const metadataResponse = await fetch(metadataUri);
        if (!metadataResponse.ok) throw new Error("Failed to fetch metadata.");
        const parsedMetadata = await metadataResponse.json();

        nftName.textContent = parsedMetadata.name || `NFT #${tokenId}`;
        nftDescription.textContent = parsedMetadata.description || "No description available.";
        nftDetails.textContent = `Token ID: ${tokenId}`;
        nftPrice.textContent = `Price: ${priceInEth} ETH`;
        nftSeller.textContent = `Seller: ${sellerDisplay}`;

        let imageUrl = parsedMetadata.image || "https://picsum.photos/900/600";
        if (imageUrl.startsWith("ipfs://")) {
            imageUrl = imageUrl.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/");
        }
        nftImage.src = imageUrl;
        nftImage.onerror = () => (nftImage.src = "https://picsum.photos/900/600");
    } catch (error) {
        console.error("Error loading NFT metadata or seller information:", error);
    }
	
    // Buy Button Logic
	buyButton.addEventListener("click", async () => {
		try {
			// Verify wallet connection first
			const isConnected = await checkWalletConnection();
			if (!isConnected) {
				showToast("Please connect your wallet first.", "error");
				setTimeout(() => window.location.href = "wallet.html", 3000);
			return;
			}
			spinner.style.display = "block";
	
			const accounts = await web3.eth.getAccounts();
			const buyer = accounts[0];
			const contract = new web3.eth.Contract(contractABI, contractAddress);
	
			// Fetch sale details
			const saleDetails = await contract.methods.getSaleDetails(tokenId).call();
			const seller = saleDetails.seller.toLowerCase();
			const isForSale = saleDetails.isForSale;
	
			// Validate sale
			if (!isForSale) {
				showToast("This NFT is not listed for sale.", "error");
				spinner.style.display = "none";
				return;
			}
	
			if (buyer.toLowerCase() === seller) {
				showToast("You cannot purchase your own NFT!", "error");
				spinner.style.display = "none";
				return;
			}
	
			const priceWei = web3.utils.toWei(priceInEth, "ether");
	
			// Proceed with the purchase if all validations pass
			await contract.methods.buyNFT(tokenId).send({
				from: buyer,
				value: priceWei,
			});
	
			showToast("NFT purchase successful!", "success");
			setTimeout(() => {
				window.location.href = "gallery.html";
			}, 3000);
		} catch (error) {
			console.error("Error purchasing NFT:", error);
			showToast("Failed to complete the purchase. Please try again.", "error");
		} finally {
			spinner.style.display = "none";
		}
	});	
});

// Handle document content loaded for the cancel sell page
document.addEventListener("DOMContentLoaded", async () => {
    const tokenId = localStorage.getItem("selectedTokenId");
    const cancelButton = document.getElementById("cancel-button");
    const spinner = document.getElementById("loading");

    try {
        const contract = new web3.eth.Contract(contractABI, contractAddress);
        const metadata = await contract.methods.tokenMetadata(tokenId).call();

        // Update NFT details
        const nftName = document.getElementById("nft-name");
        const nftDescription = document.getElementById("nft-description");
        const nftDetails = document.getElementById("nft-details");
        const nftPrice = document.getElementById("nft-price");
        const nftImage = document.getElementById("nft-image");

        let metadataUri = metadata.uri || metadata.URI || metadata[2];
        if (metadataUri.startsWith("ipfs://")) {
            metadataUri = metadataUri.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/");
        }

        const metadataResponse = await fetch(metadataUri);
        const parsedMetadata = await metadataResponse.json();

        nftName.textContent = parsedMetadata.name || `NFT #${tokenId}`;
        nftDescription.textContent = parsedMetadata.description || "No description available.";
        nftDetails.textContent = `Token ID: ${tokenId}`;

        const saleDetails = await contract.methods.getSaleDetails(tokenId).call();
        nftPrice.textContent = `Price: ${web3.utils.fromWei(saleDetails.price, "ether")} ETH`;

        let imageUrl = parsedMetadata.image || "https://picsum.photos/900/600";
        if (imageUrl.startsWith("ipfs://")) {
            imageUrl = imageUrl.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/");
        }
        nftImage.src = imageUrl;
        nftImage.onerror = () => (nftImage.src = "https://picsum.photos/900/600");

        cancelButton.addEventListener("click", async () => {
            spinner.style.display = "block";

            try {
                const accounts = await web3.eth.getAccounts();
                await contract.methods.cancelSale(tokenId).send({ from: accounts[0] });

                showToast("Sale canceled successfully!", "success");
                setTimeout(() => window.location.href = "gallery.html", 3000);
            } catch (error) {
                console.error("Error canceling sale:", error);
                showToast("Failed to cancel the sale. Please try again.", "error");
            } finally {
                spinner.style.display = "none";
            }
        });
    } catch (error) {
        console.error("Error loading NFT details:", error);
    }
});

