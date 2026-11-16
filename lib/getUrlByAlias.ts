import getCollection, { URLS_COLLECTION } from "@/db";

//pair the alias with the long url, so that the users could be redirected to the long url with
//corresponding alias
export default async function getUrlByAlias(
    //receive the alias from the url that the user visits
    alias: string
): Promise<string | null>  {
    const urlsCollection = await getCollection(URLS_COLLECTION); //get the box from db
    const data = await urlsCollection.find({alias: alias}).toArray(); //find the record whose alias matches

    //if the alias has not been created
    if(data.length===0) {
        return null;
    }
    return data[0].url; //otherwise, we are able to return the long url
}
