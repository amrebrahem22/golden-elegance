export const endpoint = "http://127.0.0.1:8000/api";
export const authEndpoint = "http://127.0.0.1:8000";

export const authLoginURL = `${authEndpoint}/auth/login/`;
export const authRegisterURL = `${authEndpoint}/auth/registration/`;

export const accountsList = `${endpoint}/accounts/`;
export const accountCreate = `${endpoint}/create/`;
export const accountDetail = (username) => `${endpoint}/account/${username}/`;
export const accountDelete = (username) => `${endpoint}/account/${username}/delete/`;
export const accountUpdate = (username) => `${endpoint}/account/${username}/updare/`;

export const commentCreate = `${endpoint}/comments/create/`;
export const commentUpdate = (id) => `${endpoint}/comments/${id}/updare/`;
export const commentDelete = (id) => `${endpoint}/comments/${id}/delete/`;

export const postList = `${endpoint}/posts/`;
export const postCreate = `${endpoint}/posts/create/`;
export const postDetail = (id) => `${endpoint}/posts/${id}/`;
export const postDelete = (id) => `${endpoint}/posts/${id}/delete/`;
export const postUpdate = (id) => `${endpoint}/posts/${id}/update/`;
export const postImageCreate = `${endpoint}/posts/image/create/`;
export const postImageUpdate = (id) => `${endpoint}/posts/image/${id}/update/`;
export const postImageDelete = (id) => `${endpoint}/posts/image/${id}/delete/`;
