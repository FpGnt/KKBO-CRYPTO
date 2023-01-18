const connectButton = document.getElementById("connect-button");
const dropdownContent = document.getElementById("dropdown-content");

if(localStorage.getItem("connected") === "true"){

    address = localStorage.getItem("address")
    
    const dropdown = document.getElementById("dropdown");
    const shortenedAddress = address.substring(0, 4) + "..." + address.substr(-5);
    document.getElementById("connect-button").innerHTML = shortenedAddress;

    connectButton.addEventListener("mouseover", () => {
        if (localStorage.getItem("connected") === "true") {
            dropdown.style.display = "block";
            dropdownContent.classList.add("show");

        }
    });
    
    dropdown.addEventListener("mouseout", () => {
        if (localStorage.getItem("connected") === "true") {
            dropdown.style.display = "none";
            dropdownContent.classList.remove("show");

        }
    });
    const disconnectButton = document.getElementById("disconnect-button");

    // Add an event listener to the disconnect button
    disconnectButton.addEventListener("click", () => {
        // Disable MetaMask
        window.ethereum.disable();
        // Clear the LocalStorage
        localStorage.removeItem("connected");
        localStorage.removeItem("address");
        localStorage.removeItem("token");
        location.reload();

        document.getElementById("connect-button").innerHTML = "Connect Wallet";
    });  

}
// Add an event listener to the button
connectButton.addEventListener("click", () => {
    // Check if MetaMask is installed
    if (localStorage.getItem("connected") !== "true") {
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

                fetch("http://localhost:3000/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        username: address,
                    })
                })
                .then(res => res.json())
                .then(data => {
                    // Save token to local storage
                    localStorage.setItem("token", data.token);
                });
                // Save the connection status and address in LocalStorage
                localStorage.setItem("connected", "true");
                localStorage.setItem("address", address);

                const connectButton = document.getElementById("connect-button");
                const dropdown = document.getElementById("dropdown");
                connectButton.addEventListener("mouseover", () => {
                    if (localStorage.getItem("connected") === "true") {
                        dropdown.style.display = "block";
                    }
                });
                
                dropdown.addEventListener("mouseout", () => {
                    if (localStorage.getItem("connected") === "true") {
                        dropdown.style.display = "none";
                    }
                });
                // Change the button text to the user's Ethereum address
                const shortenedAddress = address.substring(0, 4) + "..." + address.substr(-5);
                document.getElementById("connect-button").innerHTML = shortenedAddress;;


            });
            


        } else {
                    // The user is not connected to the Polygon network
                    // Create the modal element
                    let modal = document.createElement("div");
                    modal.classList.add("modal");
                    modal.innerHTML = `
                    <div class="modal-content">
                        <span class="close">&times;</span>
                        <p>You are not connected to the Polygon network in MetaMask. Please add the Polygon network to your MetaMask wallet before continue</p>
                    </div>
                    `;
                    document.body.appendChild(modal);

                    // Get the modal element
                    let modalContent = document.getElementsByClassName("modal")[0];
                    // Get the <span> element that closes the modal
                    let span = document.getElementsByClassName("close")[0];
                    // When the user clicks on the button, open the modal
                    modalContent.style.display = "block";
                    // When the user clicks on <span> (x), close the modal
                    span.onclick = function() {
                        modalContent.style.display = "none";
                    }
                    // When the user clicks anywhere outside of the modal, close it
                    window.onclick = function(event) {
                        if (event.target == modalContent) {
                            modalContent.style.display = "none";
                        }
                    }
                }
            });
        });
    }
});

// Add a event listener for the "accountsChanged" event
window.ethereum.on("accountsChanged", accounts => {
    // Check if the user has disconnected from MetaMask
    if (!accounts[0]) {
        // Clear the LocalStorage
        localStorage.removeItem("connected");
        localStorage.removeItem("address");
        localStorage.removeItem("token");
        // Change the button text to "Connect"
        document.getElementById("connect-button").innerHTML = "Connect Wallet";
    }
});

const disconnectButton = document.getElementById("disconnect-button");

    // Add an event listener to the disconnect button
    disconnectButton.addEventListener("click", () => {
        // Disable MetaMask
 
        // Clear the LocalStorage
        localStorage.removeItem("connected");
        localStorage.removeItem("address");
        localStorage.removeItem("token");
        location.reload();

        document.getElementById("connect-button").innerHTML = "Connect Wallet";
    });  
