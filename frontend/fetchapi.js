const formData = {
  username: 'johndoe',
  password: 'someencryptedpassword',
};

const fetchAPI = async () => {
  try {
    const result = await fetch('localhost:4000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await result.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
