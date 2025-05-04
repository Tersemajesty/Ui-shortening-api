

export async function loginUser(email, password) {
    await new Promise((resolve) => setTimeout(resolve, 1000))
  
    // For demo purposes, we'll accept any email that looks valid with password "password"
    if (!isValidEmail(email)) {
      throw new Error("Invalid email format")
    }
  
    // if (password !== "password") {
    //   throw new Error("Invalid credentials")
    // }
  
    // Create a mock user
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (user) => user.email === email && user.password === password
    );
  
    if (!user) {
      throw new Error("Invalid credentials");
    }
  
    // Store in localStorage for persistence
    localStorage.setItem("auth_token", "mock_token_" + user.id)
    localStorage.setItem("user", JSON.stringify(user))
  
    return user
  }
  
  export async function signupUser(name, email, password) {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))
  
    // Validate email
    if (!isValidEmail(email)) {
      throw new Error("Invalid email format")
    }
  
    // Create a mock user
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
      throw new Error("User already exists");
    }
  
    const newUser = {
      id: "user_" + Math.random().toString(36).substr(2, 9),
      name,
      email,
      password,
    };
  
    // Store in localStorage for persistence
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("auth_token", "mock_token_" + newUser.id);
    localStorage.setItem("user", JSON.stringify(newUser));
  
    return user
  }
  
  export async function getCurrentUser() {
    // Check if we have a token
    const token = localStorage.getItem("auth_token")
    if (!token) {
      return null
    }
  
    // Get user from localStorage
    const userJson = localStorage.getItem("user")
    if (!userJson) {
      return null
    }
  
    return JSON.parse(userJson)
  }
  
  function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }
  