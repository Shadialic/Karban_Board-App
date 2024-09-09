import interceptor from "./axiosInstance";
const AuthApi = interceptor;

export async function RegisterUser(data) {
  try {
    const response = await AuthApi.post("/auth/register", data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}
export async function LoginUser(data) {
  try {
    const response = await AuthApi.post("/auth/login", data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}
