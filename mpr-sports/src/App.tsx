import { useState } from "react";
import type { FormEvent } from "react";
import "./App.css";
import { AnnotationGuidePage } from "./components/AnnotationGuidePage";

const UNLOCK_STORAGE_KEY = "mpr-sports:staging-unlocked";

function isStoredUnlocked() {
  return window.localStorage.getItem(UNLOCK_STORAGE_KEY) === "true";
}

export default function App() {
  const requiredPassword = (import.meta.env.VITE_SITE_PASSWORD ?? "").trim();
  const gateEnabled = requiredPassword.length > 0;

  const [isUnlocked, setIsUnlocked] = useState<boolean>(() => (gateEnabled ? isStoredUnlocked() : true));
  const [inputPassword, setInputPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleUnlock = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (inputPassword === requiredPassword) {
      window.localStorage.setItem(UNLOCK_STORAGE_KEY, "true");
      setIsUnlocked(true);
      setErrorMessage("");
      setInputPassword("");
      return;
    }

    setErrorMessage("Password incorreta. Tenta novamente.");
  };

  const handleRelock = () => {
    window.localStorage.removeItem(UNLOCK_STORAGE_KEY);
    setIsUnlocked(false);
    setInputPassword("");
    setErrorMessage("");
  };

  if (gateEnabled && !isUnlocked) {
    return (
      <div className="gatePage">
        <div className="gateCard">
          <p className="gateKicker">Staging Access</p>
          <h1 className="gateTitle">MPR SPORTS</h1>
          <p className="gateText">Este ambiente esta protegido. Introduz a password para continuar.</p>

          <form className="gateForm" onSubmit={handleUnlock}>
            <input className="gateInput" type="password" value={inputPassword} onChange={(event) => setInputPassword(event.target.value)} placeholder="Password" autoFocus />
            <button className="gateButton" type="submit">
              Entrar
            </button>
          </form>

          {errorMessage ? <p className="gateError">{errorMessage}</p> : null}
        </div>
      </div>
    );
  }

  return (
    <div>
      <nav className="topNav">
        <button type="button" className="navItem active">
          Guia de Anotacao
        </button>
        {gateEnabled ? (
          <button type="button" className="navItem navItemGhost" onClick={handleRelock}>
            Lock
          </button>
        ) : null}
      </nav>

      <div className="pageWrap">
        <AnnotationGuidePage />
      </div>
    </div>
  );
}
