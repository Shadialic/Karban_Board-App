import interceptor from "./AxiosInstance";
const TaskApi = interceptor;

export async function createTask(data, sectionId) {
  try {
    const response = await TaskApi.post(`/task/${sectionId}`, data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}
export async function updatePosition(data) {
  try {
    const response = await TaskApi.put(`/task/update-position`, data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}
export async function deleteTask(id) {
  try {
    const response = await TaskApi.delete(`/task/${id}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}
export async function EditTask(data) {
  console.log(data,'dfdsfsfsdfsdf');
  
  try {
    const response = await TaskApi.put(`/task/edit-task`,data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}
