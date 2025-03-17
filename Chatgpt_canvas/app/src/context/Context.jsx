import { createContext, useState } from "react";


export const Context = createContext();

const ContextProvider = (props) => {
    const [backend_connect, setBackend_connect] = useState(false);
    const [initloading, setInitloading] = useState(true);


    const contextValue = {
        backend_connect,
        setBackend_connect,
        initloading,
        setInitloading,
       
    
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;