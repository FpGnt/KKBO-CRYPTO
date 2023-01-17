// Get the connect button and message div
const connectButton = document.getElementById("connect-button");
const messageDiv = document.getElementById("message");
const connectButtonContainer = document.getElementById("connect-button-container");

// Add an event listener to the connect button
connectButton.addEventListener("click", () => {
    // Check if MetaMask is installed
    if (typeof window.ethereum !== 'undefined') {
        // Connect to MetaMask
        window.ethereum.enable().then(() => {
            const web3 = new Web3(window.ethereum);
            // Get the current network ID
            web3.eth.net.getId().then(networkId => {
                // Check if the network ID matches the Polygon network ID
                if (networkId === 137) {
                    // Get the user's Ethereum address
                    web3.eth.getAccounts().then(accounts => {
                        const address = accounts[0];
                        // Change the button text to the user's Ethereum address
                        connectButton.innerHTML = `Connected as ${address}`;
                        connectButtonContainer.innerHTML = `<div class="dropdown">
                                                                <a href="#">Connected as ${address}</a>
                                                                <div class="dropdown-content">
                                                                    <a href="#" id="disconnect-button">Disconnect</a>
                                                                </div>
                                                            </div>`;
                        // Add an event listener to the disconnect button
                        const disconnectButton = document.getElementById("disconnect-button");
                        disconnectButton.addEventListener("click", () => {
                            // Disable MetaMask
                            window.ethereum.disable();
                            // Change the button text to "Connect"
                        })