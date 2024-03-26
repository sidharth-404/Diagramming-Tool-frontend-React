const login = async (email, password) => {
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
      const data = await response.json();
      throw new Error(data.error); // Extracting the error message
    }
   
    return response.json();
  };
   
  export default login;