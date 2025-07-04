import React, { useEffect, useState } from "react";
import { Provider, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";
import Toast from "react-native-toast-message";
import { fetchSuccess } from "./redux/auth/authSlice";
import { AppNavigation } from "./navigation/navigation";
import store from "./redux/store";

const AppInitializer = ({ children }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const bootstrap = async () => {
      try {
        const token = await AsyncStorage.getItem("accessToken");
        if (token) {
          const decoded = jwtDecode(token);
          dispatch(fetchSuccess({ user: decoded, token }));
        }
      } catch (err) {
        console.log("Failed to load token", err);
      } finally {
        setLoading(false);
      }
    };
    bootstrap();
  }, []);
  if (loading) return null;
  return children;
};

const AppWithStore = () => (
  <Provider store={store}>
    <AppInitializer>
      <AppNavigation />
      <Toast />
    </AppInitializer>
  </Provider>
);

export default AppWithStore;
