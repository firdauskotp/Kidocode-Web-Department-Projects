document.addEventListener('DOMContentLoaded', async () => {
    const web3 = new Web3(window.ethereum);
    const contractAddress = 'YOUR_CONTRACT_ADDRESS'; // Replace with your actual contract address
    const contractABI = [/* Your full contract ABI */]; // Replace with full ABI

    let contract;
    let accounts;
    let tokenId;

    async function connectWallet() {
        try {
            accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            contract = new web3.eth.Contract(contractABI, contractAddress);
        } catch (error) {
            console.error("Wallet connection failed", error);
            document.getElementById('status-message').textContent = 'Failed to connect wallet';
        }
    }

    // Parse URL parameters to get token details
    function getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1]);
    }

    async function loadNFTDetails() {
        tokenId = getUrlParameter('tokenId');
        
        try {
            const metadata = await contract.methods.tokenMetadata(tokenId).call();
            
            document.getElementById('nft-name').textContent = metadata.name;
            document.getElementById('nft-description').textContent = metadata.description;
            document.getElementById('token-id').textContent = `Token ID: ${tokenId}`;

            // Assuming metadata.uri is an IPFS or web URL to the image
            const nftImage = document.getElementById('nft-image');
            nftImage.innerHTML = `<img src="${metadata.uri}" alt="${metadata.name}">`;
        } catch (error) {
            console.error("Failed to load NFT details", error);
            document.getElementById('status-message').textContent = 'Failed to load NFT details';
        }
    }

    async function transferNFT() {
        const recipientAddress = document.getElementById('recipient-address').value;
        const statusMessage = document.getElementById('status-message');

        // Basic address validation
        if (!web3.utils.isAddress(recipientAddress)) {
            statusMessage.textContent = 'Invalid Ethereum address';
            return;
        }

        try {
            await connectWallet();
            
            await contract.methods.transferNFT(tokenId, recipientAddress)
                .send({ from: accounts[0] });

            statusMessage.textContent = 'NFT transferred successfully!';
            statusMessage.style.color = 'green';
        } catch (error) {
            console.error("Transfer failed", error);
            statusMessage.textContent = `Transfer failed: ${error.message}`;
            statusMessage.style.color = 'red';
        }
    }

    // Event Listeners
    document.getElementById('transfer-btn').addEventListener('click', transferNFT);

    // Initialize
    await connectWallet();
    await loadNFTDetails();
});