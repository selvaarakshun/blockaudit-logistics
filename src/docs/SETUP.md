
# GuudzChain Setup Instructions

This document provides instructions on how to set up and run the GuudzChain application, including how to connect to a Hyperledger Fabric network.

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Docker and Docker Compose (for running Hyperledger Fabric)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-org/guudzchain.git
   cd guudzchain
   ```

2. Install dependencies:
   ```
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173/`

## Connecting to Hyperledger Fabric

### Option 1: Use the Mock Implementation

The application includes a mock implementation of Hyperledger Fabric connectivity. This allows you to test the UI without an actual Fabric network.

1. Navigate to the Blockchain Explorer or Dashboard
2. Select the "Hyperledger" tab
3. Choose a network from the dropdown and connect
4. Execute chaincode operations

All operations will be simulated with mock data.

### Option 2: Connect to a Local Hyperledger Fabric Network

1. Set up a local Hyperledger Fabric network using the official test-network:

   ```
   git clone https://github.com/hyperledger/fabric-samples.git
   cd fabric-samples/test-network
   ./network.sh up
   ```

2. Deploy the sample chaincode:

   ```
   ./network.sh deployCC -ccn basic -ccp ../asset-transfer-basic/chaincode-go -ccl go
   ```

3. In the application settings, update the connection profile with your local network information.

### Option 3: Connect to a Remote Hyperledger Fabric Network

To connect to a production Hyperledger Fabric network:

1. Obtain the connection profile from your network administrator
2. Generate the certificates and store them securely
3. Configure the application to use these credentials:
   - Go to Settings > Blockchain > Hyperledger Fabric
   - Upload your connection profile
   - Provide organization and user credentials

## Working with Smart Contracts

The application supports both Ethereum-compatible smart contracts and Hyperledger Fabric chaincode.

### Ethereum Smart Contracts

1. Navigate to Blockchain Explorer > Smart Contracts
2. You can deploy a new contract or interact with existing ones
3. Connect MetaMask or another Web3 wallet when prompted

### Hyperledger Fabric Chaincode

1. Connect to a Hyperledger Fabric network
2. Navigate to the Chaincode Executor
3. Select chaincode name, function, and provide arguments
4. Execute the function

## Data Storage

The application stores data in:

1. Browser's localStorage for user preferences and recent transactions
2. Connected blockchain networks for permanent storage

## Troubleshooting

If you encounter connection issues:

1. Check network connectivity
2. Verify your credentials and certificates
3. Ensure the blockchain network is running and accessible
4. Check console logs for specific error messages

For detailed logs, open your browser's developer console (F12).

## Additional Resources

- [Hyperledger Fabric Documentation](https://hyperledger-fabric.readthedocs.io/)
- [Ethereum Development Docs](https://ethereum.org/developers/)
- [Web3.js Documentation](https://web3js.readthedocs.io/)

For more information, contact support@guudzchain.com
