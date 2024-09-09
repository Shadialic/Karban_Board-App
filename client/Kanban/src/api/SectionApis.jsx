import interceptor from "./axiosInstance";
const SectionApi = interceptor;

export async function getSections(userId) {
  try {
    const response = await SectionApi.get(`/section/${userId}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

export async function create(data) {
  try {
    const response = await SectionApi.post("/section", data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}
export async function deleteSection(id) {
  try {
    const response = await SectionApi.delete(`/section/${id}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}
