"use server";
import {UrlProps} from "@/type";
import getCollection, {URLS_COLLECTION} from "@/db";

export default async function createNewAlias(
    //receive the inputs from the front-end
    url: string,
    alias:string,
    //return either an error message or null if everything is fine
): Promise<string | null> {
    //catch the potential errors made by the users
    try{
        //try to read the input as a url, and will throw an error if the format is wrong
        const inputUrl = new URL(url);
        //only accept the valid urls that start with http or https
        if(inputUrl.protocol !== "http:" && inputUrl.protocol !== "https:") {
            return "Please retry with valid urls that start with http or https";
        }
    }
    catch{
        //if the url that the user gives is just an arbitrary string
        return "Invalid url, please try again";
    }

    //get the box (collection) which stores all the alias and url pairs
    const urlsCollection = await getCollection(URLS_COLLECTION);
    //check whether the alias that users input has already existed
    const existing = await urlsCollection.find({alias:alias}).toArray();
    if(existing.length>0){
        return "Your input alias has been used by others, please try a different one";
    }

//fill in the UrlProps template we created in another file with the user input
const p:UrlProps = {
    url: url,
    alias: alias,
};
//by using insertOne(), we save this new alias and url pair into the collection
const data = await urlsCollection.insertOne({...p});
//triggered if mongodb did not save it successfully
if(!data.acknowledged){
    return "Failed to save, please try again";
}
return null; //there is no error if we do not trigger the above errors
}