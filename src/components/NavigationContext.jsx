import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import WarpScreen from "./WarpScreen"; 

const NavigationContext = createContext({
  navigate: (route) => {},
  isNavigating: false,
});

export const NavigationProvider = ({ children }) => {
  const [isNavigating, setIsNavigating] = useState(false);
  const [nextRoute, setNextRoute] = useState(null);
  const navigate = useNavigate();

  const handleNavigate = (route) => {
    if (isNavigating) return;
    setIsNavigating(true);
    setNextRoute(route);
  };

  return (
    <NavigationContext.Provider
      value={{ navigate: handleNavigate, isNavigating }}
    >
      {isNavigating && (
        <WarpScreen
          onComplete={() => {
            setIsNavigating(false);
            navigate(nextRoute);
            setNextRoute(null);
          }}
        />
      )}
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => useContext(NavigationContext);
