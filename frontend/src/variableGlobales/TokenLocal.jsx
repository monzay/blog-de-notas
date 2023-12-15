export const mandarTokenDelLocalStorage = async (tokenLocal) =>{
    try {
      const data = await fetch("http://localhost:3000/singUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tokenLocal),
      });
        const response = await data.json()
        console.log(response)
     } catch (e) {
      console.log(e.errors);
    }
  }