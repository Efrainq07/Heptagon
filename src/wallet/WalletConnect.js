import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3 from "web3"
import {createClient} from 'urql'
import { ethers } from "ethers" ;


const API_URL = 'https://api-mumbai.lens.dev';

var account = null
var contract = null

// export default async function connectWallet() {
//     var provider = await web3modal.connect()

//     await provider.enable();
//     var web3 = new Web3(provider)

//     await window.ethereum.send('eth_requestAccounts')
//     var accounts = await web3.eth.getAccounts()
//     account = accounts[0]
//     document.getElementById('wallet-address').textContent = account; 
//     //contract = new web3.eth.Contract(ABI, ADDRESS);
// };

// firmar 



// Retos conchesumare 


const client = createClient(
  {
    url: API_URL
  }
)

async function generateChallenge(address){

   console.log(address)
const challengeQuery = `query Challenge {
  challenge(request: { address: "${address}"  }) {
  text
  } 
  }`
  const response = await client.query(challengeQuery).toPromise()
  console.log("response Challenge",response)
  return response
}

export async function handleAuth(connection,provider) {
  const address = (await connection.eth.getAccounts())[0]
  console.log("address-> ",address)
  let challenge = await generateChallenge(address)
  // Signature va aqui 
  const signer = provider.getSigner()
  
  let signature = "undefined"
  let challengeText = challenge.data.challenge.text
  if (connection.wc) {

    signature = await provider.send(
        'personal_sign',
        [ ethers.utils.hexlify(ethers.utils.toUtf8Bytes(challengeText)), address.toLowerCase() ]
    );
  }
  else { 
    signature = await signer.signMessage(challengeText)
  }

  const authenticationQuery = `
  mutation Authenticate {
  authenticate(request: {
    address: "${address}",
    signature: "${signature}"
  }) {
    accessToken
    refreshToken
  }
}
`
const response = await client.mutation(authenticationQuery).toPromise()
console.log("response Auth",response)
}

// export function createAuth(address, signature) {

//   const AUTHENTICATION = `
//   mutation Authenticate {
//     authenticate(request: {
//       address: $address ,
//       signature: $signature
//     }) {
//       accessToken
//       refreshToken
//     }
//   }
// `

// return apolloClient.mutate({
//   mutation: gql(AUTHENTICATION),
//   variables: {
//     request: {
//       address,
//       signature,
//     },
//   },
// })
// }
