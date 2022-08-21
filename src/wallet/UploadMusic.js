import { client } from "../graphql-api/APIQueries";
import { signText } from "./WalletConnect";
import { handleAuth } from "./WalletConnect";
import {providerexp} from "../App.js" 
import Web3 from "web3";

async function ABIgen(address) {
    
    const GET_DEFAULT_PROFILES = `
    query($request: DefaultProfileRequest!) {
      defaultProfile(request: ethereumAddress:${address} ) {
        id
        name
        bio
        attributes {
            displayType
            traitType
            key
            value
        }
        followNftAddress
        metadata
        isDefault
    }
    `;
    const response = await client.query(GET_DEFAULT_PROFILES).toPromise()
    const id = response.data.defaultProfile.id

    const post = `  
        mutation CreatePostTypedData {
            createPostTypedData(request: {
              profileId: ${id},
              contentURI: ${ipfs},
              collectModule: {
                revertCollectModule: true
              },
              referenceModule: {
                followerOnlyReferenceModule: false
              }
            })`


    const response2 = await client.mutation(post).toPromise()

    return response2.data.createPostTypedData
    
}

export async function uploadMusic(ABI,ipfs,address) {

    const challengeText= `query Challenge {
        challenge(request: { address: "${address}"  }) {
            text
        } 
    }`
    const connection = new Web3(providerexp)
    let signature = await signText(providerexp,address,connection,challengeText)  
    
    const challenge = await ABIGEN(addresss, ipfs)
    const response = await 



}
const mumbai_contract = "0x60Ae865ee4C725cd04353b5AAb364553f56ceF82"
const mumbai_abi = `[{"inputs":[{"internalType":"address","name":"_logic","type":"address"},{"internalType":"address","name":"admin_","type":"address"},{"internalType":"bytes","name":"_data","type":"bytes"}],"stateMutability":"payable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"previousAdmin","type":"address"},{"indexed":false,"internalType":"address","name":"newAdmin","type":"address"}],"name":"AdminChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"beacon","type":"address"}],"name":"BeaconUpgraded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"implementation","type":"address"}],"name":"Upgraded","type":"event"},{"stateMutability":"payable","type":"fallback"},{"inputs":[],"name":"admin","outputs":[{"internalType":"address","name":"admin_","type":"address"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newAdmin","type":"address"}],"name":"changeAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"implementation","outputs":[{"internalType":"address","name":"implementation_","type":"address"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newImplementation","type":"address"}],"name":"upgradeTo","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newImplementation","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"upgradeToAndCall","outputs":[],"stateMutability":"payable","type":"function"},{"stateMutability":"payable","type":"receive"}]`
const abi = ""

