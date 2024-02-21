import axios from "axios";
import { saveAs } from 'file-saver';
import { SmartlinkFormValues } from "@/components/form/schema/FormSchema";
import { LoginFormSchemaValues } from "@/components/login/LoginFormSchema";

export interface User {
  username: string;
  user_id: string;
}



const api = axios.create({
  baseURL: import.meta.env.VITE_API_HOST,
  headers: {
    'api-key': import.meta.env.VITE_API_KEY,
  },
});

function nullToEmptyString(_key: string, value: any) {
  return value === null ? '' : value;
}

export const verifyUser = async () => {
  const token = localStorage.getItem('token');

  try {
    const response = await api.get<User>('users/verify', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return null;
  }
}


export const apiGetStats = async (startIndex: number, count: number, sortField: string = "updated_at", sortOrder: string = "desc", searchTerm?: string) => {
  try {
    const response = await api.get('smartlinks/stats', {
      params: {
        startIndex,
        count,
        sortField,
        sortOrder,
        searchTerm,
        timestamp: Date.now(),
      },
    });
    return response.data;
  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  }
}

export const apiGetDetails = async (sl_name: string) => {
  try {
    const response = await api.get(`smartlinks/${sl_name}`);

    return JSON.parse(JSON.stringify(response.data), nullToEmptyString);
  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  }
};

export const apiGetHistory = async (sl_name: string) => {
  try {
    const response = await api.get(`smartlinks/${sl_name}/history`)
    console.log(response.data);
    return JSON.parse(JSON.stringify(response.data), nullToEmptyString);
  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  }
};

export const apiDownloadFiles = async (sl_names: string[]) => {
  const token = localStorage.getItem('token');

  try {
    const response = await api.post(`smartlinks/download`, sl_names, {
      responseType: 'arraybuffer',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const blob = new Blob([response.data], { type: 'application/zip' });
    saveAs(blob, `files.zip`);
  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  }
}


function appendFormData(formData: SmartlinkFormValues) {
  const form = new FormData();

  Object.keys(formData).forEach((key) => {
    if (key !== 'og_image_file' && key !== 'og_image') { // Skip 'og_image_file' during this phase
      const typedKey = key as keyof SmartlinkFormValues;
      form.append(typedKey, JSON.stringify(formData[typedKey]));
    }
  });

  if (formData.og_image_file) {
    form.append('og_image_file', formData.og_image_file as Blob);
  }

  return form;
}



export const apiSubmitFormData = async (formData: SmartlinkFormValues) => {
  const form = appendFormData(formData);

  const token = localStorage.getItem('token');

  try {
    const response = await api.post(`smartlinks/${formData.sl_name}/create`, form, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      console.error("An error occurred:", error.message);
    } else {
      console.error("An error occurred:", error);
    }
    throw error;
  }
}

export const apiUpdateEntry = async (formData: SmartlinkFormValues) => {
  const form = appendFormData(formData);
  const token = localStorage.getItem('token');


  try {
    const response = await api.post(`smartlinks/${formData.sl_name}/update`, form, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      console.error("An error occurred:", error.message);
    } else {
      console.error("An error occurred:", error);
    }
    throw error;
  }
}

export const apiLogin = async (data: LoginFormSchemaValues) => {
  try {
    const response = await api.post('users/login', {
      username: data.username,
      password: data.password
    });

    // Extract the token from the response
    const accessToken = response.data;

    // Store the token in local storage
    localStorage.setItem('token', accessToken);

    return response;

  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  }
}
export const apiLogout = async () => {
  const token = localStorage.getItem('token');

  try {
    const response = await api.post('users/logout', {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    localStorage.removeItem('token');

    return response;

  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  }
}



export const apiUploadFile = async (file: File, sl_name: string) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post(`obs/${sl_name}/upload`, formData);
    return response.data;
  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  }
}

export const apiGetSlNames = async () => {
  const token = localStorage.getItem('token');

  try {
    const response = await api.post('smartlinks/names', {} ,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.slnames;
  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  }
}