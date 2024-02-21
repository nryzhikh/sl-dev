import axios from "axios";


const dbFetchData = async () => {
    try {
        const appCode = import.meta.env.VITE_API_APP_CODE;
        const host = import.meta.env.VITE_API_HOST;

        const headers = {
            'api-key': appCode,
        };

        const response = await axios.get(`${host}/get_data`, { headers });

        return response.data;
    } catch (error) {
        console.error("An error occurred:", error);
        throw error;
    }
};

  const fetchSmartlinkDataHistory = async (sl_name: string) => {
    const response = await fetch(`https://c3b61d836ed04714a4a3144f18614da6.apig.ru-moscow-1.hc.sbercloud.ru/fetchHistory?slName=${sl_name}`);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
};


  export {
    dbFetchData,
    fetchSmartlinkDataHistory
  };