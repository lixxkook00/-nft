import axios from "axios";


export async function signUpAccount(data) {
    console.log('data',data)
    const formData = new FormData(); 
    formData.append("name",data.username);
    formData.append("email",data.email);
    formData.append("password",data.password);
    formData.append("wallet",data.wallet);

    const result = await axios.post('http://test.longhorizon.xyz/api/register',formData);
    console.log('result',result.data.success);
    return result.data.success;
}

