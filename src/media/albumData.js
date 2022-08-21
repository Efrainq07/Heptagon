import {albumCoverQuery, albumSongsQuery} from '../graphql-api/APIQueries'
import {library} from '../helpers/albumList'

export async function getAlbumData(){
    const albumMetadata = await albumCoverQuery(library)
    let albumData = albumMetadata.data.publications.items.map(element => {
       return { 
        title: element.metadata.name,
        image: element.metadata.media[0].original.url,
        publicationId: element.id
        }
    });
    return albumData
}

export async function getAlbumContent(albumPubId){
    const contentMetadata = await albumSongsQuery(albumPubId)
    let albumContent = contentMetadata.data.publications.items.map(element => {
        return { 
         title: element.metadata.name,
         audio: element.metadata.media[0].original.url,
         publicationId: element.id
         }
     });
     return albumContent
}