"use client";
import createNewAlias from "@/lib/createNewAlias";
import { Button, FormHelperText, TextField } from "@mui/material";
import styled from "styled-components";
import { useState } from "react";

const StyledForm = styled.form`
    margin: 0 auto;
    width: 100%;
    max-width: 700px;
    padding: 32px;
    background-color: white;
    border: 1px solid #d1fae5;
`;

const StyledRow = styled.div`
    display: flex;
    flex-direction: column;
    margin: 16px 0;
`

export default function UrlForm(){
    //store all of the below in the state to remember what users typed and what we need to show
    const [url, setUrl] = useState("");
    const [alias, setAlias] = useState("");
    const [error, setError] = useState("");
    const [shortUrl, setShortUrl] = useState("");

    return(
        <StyledForm
            //all of the content is included in the StyledForm tag because the submit button
            //only works for the form it is in
            onSubmit={async (event) => {
                //prevent the web from automatically refreshing the page
                event.preventDefault();
                setError("");
                setShortUrl("");
                createNewAlias(url,alias)
                    //after the server finishes executing createNewAlias(), err is either an error message or null
                    .then((err) => {
                        if(err){
                            setError(err);
                        }
                        else{
                            setShortUrl("https://mp-5-url-shortener.vercel.app/" + alias);
                        }
                    })
                    //something unexpected happened
                    .catch((err) => {
                        console.error(err);
                        setError("Something went wrong, please try again");
                    });
            }}
            >
            <StyledRow>
                <TextField
                    variant="filled" //the style of the input box from MUI
                    label="URL" //the text shown in the input box
                    value={url} //the input box shows what is stored in url
                    onChange={(e) => setUrl(e.target.value)} //update url every time users input something
                />
            </StyledRow>
            <StyledRow>
                <TextField
                variant="filled"
                label="Alias"
                value={alias}
                onChange={(e) => setAlias(e.target.value)}
                />
            </StyledRow>
            {/* show the error message when there is an error */}
            {error !== "" && <FormHelperText error>{error}</FormHelperText>}
            <StyledRow>
                <Button
                    variant="contained"
                    type="submit"
                    disabled={url === "" || alias === ""} //users cannot click the button if url or alias is empty
                    >Shorten me
                </Button>
            </StyledRow>
            {/* only show the short url after it is created successfully */}
            {shortUrl !== "" && (
                <p>
                    Your short URL: <a href={shortUrl}>{shortUrl}</a>
                </p>
            )}
        </StyledForm>
    );
}