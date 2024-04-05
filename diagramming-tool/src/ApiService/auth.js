const login = async (email, password) => {
  try {
    const response = await fetch('http://localhost:8080/api/diagrammingtool/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userEmail: email,
        password: password,
      }),
    });

    if (!response.ok) {
      throw new Error('Login failed. Please try again.'); // Throw an error message if response is not ok
    }

    const data = await response.json(); // Parse response JSON data
    return data; // Return response JSON data
  } catch (error) {
    throw new Error('Login failed. Please try again.'); // Throw generic error message for any other errors
  }
};

export { login };
