export const useLogin = () => {
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("user"))) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [JSON.parse(localStorage.getItem("user"))]);
  return isLogin;
};
