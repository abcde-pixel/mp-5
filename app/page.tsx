"use client";
import UrlForm from "@/components/UrlForm";
import styled from "styled-components";

const PageWrapper = styled.div`
    min-height: 100vh;
    padding: 32px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #e8f8ef;
`;

const Title = styled.h1`
    text-align: center;
    font-size: 48px;
    margin-bottom: 8px
`;

export default function Home() {
  return (
      <PageWrapper>
        <Title>URL Shortener</Title>
        <UrlForm />
      </PageWrapper>
  );
}
