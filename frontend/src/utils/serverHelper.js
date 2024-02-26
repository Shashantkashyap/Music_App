const BASE = "https://music-app-backend-q92a.onrender.com"

export const makeUnauthenticatedPOSTRequest = async(route, body) => {
    const response = await fetch(`${BASE}/${route}`,{
        method:"POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
        
    });
    const formattedResponse = await response.json();

    return formattedResponse;

};

export const makeAuthenticatedPOSTRequest = async (route, body) => {
    const token = localStorage.getItem("token");
    console.log("FUNCTION TOKEN", token)
    
    const response = await fetch(`${BASE}/${route}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(body),
    });
    console.log("FUNCTION RESPONSE", response);
    const formattedResponse = await response.json();
    return formattedResponse;
};

export const makeAuthenticatedGETRequest = async (route) => {
    const token = localStorage.getItem("token");
    
    const response = await fetch(`${BASE}/${route}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        
    });
    const formattedResponse = await response.json();
    return formattedResponse;
};

