import { redirect } from "next/navigation";
import getUrlByAlias from "@/lib/getUrlByAlias";

//we need to input an alias to find its long url, then we redirect the user to that long url
export default async function AliasPage({params}:{
    params:Promise<{alias:string}>; }){
    const {alias} = await params; //get the alias from the input params
    const url = await getUrlByAlias(alias); //get the long url corresponding to the input alias

    //if the url does not exist in our db, then redirect to our home page
    if(!url){
        redirect("/");
    }
    redirect(url);
}