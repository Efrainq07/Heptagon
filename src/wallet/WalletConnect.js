import { ethers } from "ethers" ;
import { requestChallengeQuery, authenticateQuery } from '../graphql-api/APIQueries';


export async function signText(provider,address,connection,text){

  let signature = undefined
  const signer = provider.getSigner()

  if (connection.wc) {
    signature = await provider.send(
        'personal_sign',
        [ ethers.utils.hexlify(ethers.utils.toUtf8Bytes(text)), address.toLowerCase() ]
    );
  }
  else { 
    signature = await signer.signMessage(text)
  }

  return signature

}

export async function handleAuth(connection,provider) {
  const address = (await connection.eth.getAccounts())[0]

  
  let challengeText = await requestChallengeQuery(address)

  let signature = await signText(provider,address,connection,challengeText)  
  
  const response = await authenticateQuery(address,signature)

  console.log({response})
}

