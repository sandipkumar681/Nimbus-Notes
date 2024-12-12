import { useState } from "react";
import loadingBarContext from "./loadingBarContext";

const LoadingBarState = (props) => {
  const [progress, setProgress] = useState(1);

  return (
    <loadingBarContext.Provider value={{ progress, setProgress }}>
      {props.children}
    </loadingBarContext.Provider>
  );
};

export default LoadingBarState;
