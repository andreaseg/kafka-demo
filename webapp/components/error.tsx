'use client'

import styles from "./error.module.css";

import React, { ReactNode, useContext, useState } from "react";

type ErrorMessage = {
    header: string,
    description: string,
    tip: string | null
};

type ErrorType = {
    /**
     * Set global error message to appear in modal
     */
    setError: (message: ErrorMessage | null) => void
};

const ErrorContext = React.createContext<ErrorType>({
    setError: () => { }
});

export function ErrorAware({ children }: { children: ReactNode }) {

    const [errorMessage, setError] = useState<ErrorMessage | null>(null)

    return (
        <ErrorContext.Provider value={{ setError }}>
            {errorMessage &&
                <div className={styles.error_container}>
                    <div className={`${styles.error} shadow-900`}>
                        <header>⚠</header>
                        <main>
                            <h1>{errorMessage.header}</h1>
                            <div className={styles.error_text}>
                                {errorMessage.description}
                            </div>
                            {errorMessage.tip &&
                                <div className={styles.error_tip}>
                                    {errorMessage.tip}
                                </div>}
                            <div className={styles.button_container}>
                                <button className={styles.error_button} onClick={() => setError(null)}>
                                    Sorry :(
                                </button>
                            </div>
                        </main>
                    </div>
                </div>}
            {children}
        </ErrorContext.Provider>

    );
}

/**
 * Use global error handler modal
 * @returns Context of global error handler
 */
export default function useError(): ErrorType {
    return useContext(ErrorContext);
}