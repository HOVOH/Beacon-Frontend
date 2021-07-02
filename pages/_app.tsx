import '../styles/globals.css'
import { Dashboard } from '../layouts/Dashboard';
import { TopBar } from "../components/navigation/TopBar";
import { DashboardNav } from "../components/navigation/DashboardNav";
import React from "react";
import { BeaconWeb3Provider } from "../components/providers/BeaconWeb3Provider";
import { AuthenticationProvider } from "../components/providers/AuthenticationProvider";
import { QueryClient, QueryClientProvider } from "react-query";
import { AppProps } from "next/app";
import SnackBar from "../components/providers/Snackbar";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <SnackBar>
        <BeaconWeb3Provider>
          <AuthenticationProvider>
            <Dashboard
              navigation={<DashboardNav/>}
              topBar={<TopBar/>}
              main={<Component {...pageProps} />}
            />
          </AuthenticationProvider>
        </BeaconWeb3Provider>
      </SnackBar>
    </QueryClientProvider>
    )
}

export default MyApp;
