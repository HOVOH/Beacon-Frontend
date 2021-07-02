import React, { createContext, useContext, useEffect, useState } from "react";
import { IUser } from "../../api/account/IUser";
import { useWeb3React } from "@web3-react/core";
import { injected } from "../../chain/connectors";
import { PropsWithClassName } from "../../utils/classBag";
import { getLoginVerificationCode, loginWithSignature } from "../../api/authentication/web3login";
import { refreshSession } from "../../api/authentication/refresh-session";
import { whoami } from "../../api/account/account";
import { logout as serverLogout } from "../../api/authentication/logout"
import { useAlert } from "./Snackbar";

const AuthenticationContext = createContext({
  user: null as IUser|null,
  updateUser: (user: Partial<IUser>):void=> {},
  isAuthenticated: () => false as boolean,
  login: (identifier: string, password: string): Promise<boolean> => Promise.reject(false),
  logout: (): Promise<boolean> => Promise.reject(false),
  refresh: (): Promise<boolean> => Promise.reject(false),
  web3Login: (): Promise<boolean> => Promise.reject(false),
})

export function AuthenticationProvider(props:React.PropsWithChildren<PropsWithClassName>){
  const [user, setUser] = useState<IUser|null>(null);
  const {active, activate, library, account} = useWeb3React()
  const [tried, setTried] = useState(false);
  const [refreshFailed, setRefreshFailed] = useState(false);
  const {alertError} = useAlert();

  useEffect(() => {
    injected.isAuthorized().then((isAuthorized: boolean) => {
      if (isAuthorized) {
        activate(injected, undefined, true).catch(() => {
          setTried(true)
        })
      } else {
        setTried(true)
      }
    })
  }, [])

  useEffect(() => {
    if (!tried && active) {
      setTried(true)
    }
  }, [tried, active])

  // @ts-ignore
  useEffect( async ()=>{
    const refreshed = await refresh();
    if (refreshed){
      const user = await whoami();
      setUser(user);
    } else if (active){
      await web3Login();
    }
    setRefreshFailed(!refreshed);
  }, []);

  useEffect( () => {
    if (user){
      const timerId = setInterval(refresh, 600000);
      return () => { clearInterval(timerId)}
    }
  }, [user])

  useEffect(() => {
    if (refreshFailed && active && library){
      web3Login();
    }
  }, [refreshFailed, active, library])

  const web3Login = async () => {
    try{
      if (account){
        const message = await getLoginVerificationCode(account);
        const signature = await library.getSigner(account).signMessage(message);
        const session = await loginWithSignature(account, signature);
        const user = await whoami();
        setUser(user);
        setRefreshFailed(false);
        return true;
      }
    } catch (error){
      const response = error.response;
      console.log(response);
      if (response){
        if (response.status === 502) {
          alertError("Logins are currently disabled");
        } if (response.status === 403){
          alertError("Your address is not whitelisted");
        }
      } else{
        alertError("An unexpected error occured and we were unable to sign you in");
      }
    }

    return false;
  }

  const isAuthenticated = () => !!user;

  const login = async (identifier: string, password: string) => {
    return false;
  }

  const logout = async () => {
    serverLogout().then(() => {
      setUser(null);
    })
    return true;
  }

  const refresh = async () => {
    try {
      const session = await refreshSession();
      return true;
    } catch (ignored){}
    return false;
  }

  // @ts-ignore
  const updateUser = (update: Partial<IUser>)=> setUser({...user,...update})

  return (
    <AuthenticationContext.Provider
      value={{ user, isAuthenticated, login, logout, refresh, web3Login, updateUser}}
    >
      {props.children}
    </AuthenticationContext.Provider>
  )

}

export const useCredentials = () => {
  return useContext(AuthenticationContext);
}
