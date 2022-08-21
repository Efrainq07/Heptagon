import {createClient} from 'urql'
import { gql } from '@urql/core';
import axios from 'axios';

const API_URL = 'https://api-mumbai.lens.dev';

export const client = createClient({
    url: API_URL
});



export async function requestChallengeQuery(address){
    const challengeQuery = `query Challenge {
        challenge(request: { address: "${address}"  }) {
        text
        } 
        }`
    
    const response = await client.query(challengeQuery).toPromise()
    return response.data.challenge.text
} 

export async function authenticateQuery(address,signature){
    const authenticationQuery = `
    mutation Authenticate {
    authenticate(request: {
        address: "${address}",
        signature: "${signature}"
    }) {
        accessToken
        refreshToken
    }
    }`
    const response = await client.mutation(authenticationQuery).toPromise()
    return response
}

export async function albumCoverQuery(albumList){

    
    const albumStr = JSON.stringify(albumList)
    const albumQuery = `query Publications {\n  publications(\n    request: {publicationIds: ${albumStr}, metadata: {tags: {all: [\"album\", \"heptagon\"]}}}\n  ) {\n    items {\n      ...PostFields\n    }\n  }\n}\n\nfragment MediaFields on Media {\n  url\n  mimeType\n}\n\nfragment ProfileFields on Profile {\n  id\n  handle\n  ownedBy\n}\n\nfragment MetadataOutputFields on MetadataOutput {\n  name\n  description\n  content\n  media {\n    original {\n      ...MediaFields\n    }\n  }\n}\n\nfragment PostFields on Post {\n  id\n  profile {\n    ...ProfileFields\n  }\n  metadata {\n    ...MetadataOutputFields\n  }\n  appId\n}\n`

    const payload = {
        operationName: "Publications",
        variables: {},
        query: albumQuery
    }
    let result = undefined
    await axios.post(API_URL,payload).then(res => {
        result = res.data
      })
    return result
}

export async function albumSongsQuery(albumPubId){

    const songsQuery = `query Publications {\n  publications(\n    request: {commentsOf: \"${albumPubId}\", sources: [\"heptagon\"], metadata: {tags: {all: [\"song\", \"heptagon\"]}}}\n  ) {\n    items {\n      ...CommentFields\n    }\n  }\n}\n\nfragment MediaFields on Media {\n  url\n  mimeType\n}\n\nfragment ProfileFields on Profile {\n  id\n  handle\n  ownedBy\n}\n\nfragment MetadataOutputFields on MetadataOutput {\n  name\n  description\n  content\n  media {\n    original {\n      ...MediaFields\n    }\n  }\n}\n\nfragment CommentBaseFields on Comment {\n  id\n  profile {\n    ...ProfileFields\n  }\n  metadata {\n    ...MetadataOutputFields\n  }\n  appId\n}\n\nfragment CommentFields on Comment {\n  ...CommentBaseFields\n}\n`
       const payload = {
        operationName: "Publications",
        variables: {},
        query: songsQuery
    }
       let result = undefined
    await axios.post(API_URL,payload).then(res => {
        result = res.data
      })

    console.log(result)
    return result

}