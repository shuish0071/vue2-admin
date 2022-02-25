import { GetCategory } from "@/api/news";

const actions = {
  // content 相当于root，requestData为传入参数，用于GetCategory
  // getInfoCategory(content, requestData) {
  getInfoCategory() {
    return new Promise((resolve, reject) => {
      GetCategory({})
        .then(response => {
          resolve(response.data.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};

export default {
  namespaced: true,
  actions
};
