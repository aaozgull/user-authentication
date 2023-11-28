import { useContext, useState } from "react";
import { login } from "../Util/auth";
import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { Alert } from "react-native";

function LoginScreen() {
  const [isAuthenticating, setAuthenticating] = useState(false);
  const authCtx = useContext(AuthContent);

  async function loginHandler() {
    setAuthenticating(true);
    try {
      const token = await login(email, password);
      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert(
        "Authentication fail!",
        "could not log you in. please check your credentials"
      );
      setAuthenticating(false);
    }
  }
  if (isAuthenticating) {
    return <LoadingOverlay message={"Logging user..."} />;
  }
  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
