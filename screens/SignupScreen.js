import { useContext, useState } from "react";
import AuthContent from "../components/Auth/AuthContent";
import { createUser } from "../Util/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { Alert } from "react-native";
import { AuthContext } from "../store/auth-context";

function SignupScreen({ email, password }) {
  const [isAuthenticating, setAuthenticating] = useState(false);
  const authCtx = useContext(AuthContext);

  async function signUpHandler() {
    setAuthenticating(true);
    try {
      const token = await createUser(email, password);
      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert(
        "Authentication fail!",
        "could not create user. please check your input and try later..."
      );
      setAuthenticating(false);
    }
    
  }
  if (isAuthenticating) {
    return <LoadingOverlay message={"Creating user..."} />;
  }

  return <AuthContent onAuthenticate={signUpHandler} />;
}

export default SignupScreen;
