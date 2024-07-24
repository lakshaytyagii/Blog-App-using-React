import authService from './auth';

const handleLogin = async () => {
  try {
    const email = "user@example.com";
    const password = "userpassword";
    console.log("Starting login process...");
    const session = await authService.login({ email, password });
    console.log("Login successful, fetching user...");
    if (session) {
      const user = await authService.getCurrentUser();
      console.log("Logged in user:", user);
    } else {
      console.error("Login failed, session not created.");
    }
  } catch (error) {
    console.error("Error during login or fetching user:", error);
  }
};

export default handleLogin

