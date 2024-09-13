import interceptor from "./AxiosInstance";
const SectionApi = interceptor;

export async function getSections(userId) {
  try {
    const response = await SectionApi.get(`/section/${userId}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

export async function createSections(data) {
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
export async function editToSection(data) {
  console.log(data,'dfdsfsfsdfsdf');
  try {
    const response = await SectionApi.put(`/section/edit-section`,data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}
