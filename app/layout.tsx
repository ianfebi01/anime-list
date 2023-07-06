"use client";
import { ApolloProvider } from "@apollo/client";
import "./globals.css";
import { Inter } from "next/font/google";
import client from "@/graphql/apollo-client";
import { css } from "@emotion/react";
import Navbar from "@/components/Molecules/Navbar";
import "@/assets/scss/main.scss";
import { DefaultProvider } from "@/context/defaultContext";
import { Suspense } from "react";
import Loading from "./loading";

import Loader from "@/components/Atoms/Loader";
import { Toaster } from "react-hot-toast";
import { CheckedIcon, ModalInformationIcon } from "@/components/Icons";

const font = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DefaultProvider>
      <html lang="en">
        <body className={font.className}>
          <Suspense fallback={<Loading />}>
            <ApolloProvider client={client}>
              <div
                css={css`
                  width: 100%;
                  height: 100vh;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  border-color: #fff;
                `}
              >
                <Toaster
                  toastOptions={{
                    icon: (
                      <div
                        css={css`
                          font-size: 20px;
                          transform: translateY(3px);
                          color: #00a790;
                        `}
                      >
                        <CheckedIcon />
                      </div>
                    ),
                    position: "top-center",
                    style: {
                      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                      height: "44px",
                      fontSize: "14px",
                    },
                  }}
                />
                <div
                  id="globalLoader"
                  style={{
                    position: "fixed",
                    width: "100%",
                    height: "100%",
                    background: "#FFF",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: "999",
                  }}
                >
                  <Loader />
                </div>

                <div
                  css={css`
                    display: flex;
                    justify-content: center;
                    z-index: 10;
                    position: fixed;
                    top: 0;
                    width: 100%;
                  `}
                >
                  <Navbar />
                </div>
                {children}
              </div>
            </ApolloProvider>
          </Suspense>
        </body>
      </html>
    </DefaultProvider>
  );
}
