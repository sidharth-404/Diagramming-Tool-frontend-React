export const login = async (email, password) => {

  try {
    const response = await fetch('http://localhost:8080/api/diagrammingtool/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "userEmail": email,
            "password": password,
        }),
    });

    if (!response.ok) {
        const data = await response.text();
        throw new Error(data);
    }

    return await response.text();
} catch (error) {
    // Handle errors here
    console.error("Error during login:", error.message);
    return error.message; // Return error message to handle it further
}
  };
   
  export default login;