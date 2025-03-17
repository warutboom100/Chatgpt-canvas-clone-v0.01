import axios from 'axios';

const baseUrl = import.meta.env.UI_API_IP_ADDRESS;


export const intl_PCServer = async (setBackend_connect) => {
    try {
        const response = await axios.get(`${baseUrl}/initialization`,{ timeout: 5000 }, );
        setBackend_connect(true);
        return response;

    } catch (error) {
        console.error('Error during authentication:', error);
    }
};

export const login_Auth = async (username,password,setCookie) => {
    try {
      const response = await axios.post(
        `${baseUrl}/wepapp_auth`,
        { username: username, password: password },{ timeout: 5000 }   
      );

      setCookie("user_hci",response.data.user+"|"+response.data.token, { path: '/' },{ expires: 5 })
      return response;
    } catch (error) {
      return error;
    }
};

