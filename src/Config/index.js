import axios from 'axios';
import Cookies from 'js-cookie';

const token = Cookies.get('Token');

export const request = axios.create({
    baseURL: 'http://localhost:8080/api',
});

export const requestLogin = async (data) => {
    const res = await request.post('/auth/login', { usernameOrEmail: data.email, password: data.password });
    return res;
};

export const requestRegister = async (data) => {
    const res = await request.post('/auth/register', {
        name: data.name,
        username: data.username,
        email: data.email,
        password: data.password,
        phone: data.phone,
    });
    return res;
};

export const requestCreateBDS = async (formData) => {
    const res = await request.post('/properties/properties-with-images', formData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return res;
};

export const requestGetSingleProperty = async (id) => {
    const res = await request.get(`/properties/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    return res.data;
};

export const requestGetBDSByUserId = async (id) => {
    const res = await request.get(`/properties/user/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    return res.data;
};

export const requestGetAllBDS = async () => {
    const res = await request.get('/properties', { headers: { Authorization: `Bearer ${token}` } });
    return res.data;
};

export const requestGetStatusHouse = async () => {
    const res = await request.get(
        '/posts/status',
        { params: { status: 'pending' } },
        { headers: { Authorization: `Bearer ${token}` } },
    );
    return res.data;
};
export const requestCountPostsByPropertyId = async (propertyId) => {
    const res = await request.get(`/posts/count/${propertyId}`, { headers: { Authorization: `Bearer ${token}` } });
    return res.data;
};

export const requestGetPostsByPropertyId = async (propertyId) => {
    const res = await request.get(`/posts/properties/${propertyId}`, { headers: { Authorization: `Bearer ${token}` } });
    return res.data;
};
export const requestGetPostByUserId = async (id) => {
    const res = await request.get(`/posts/users/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    return res.data;
};

export const requestUpdateStatus = async (id) => {
    const res = await request.put(
        `/posts/${id}/status`,
        { status: 'approved' },
        { headers: { Authorization: `Bearer ${token}` } },
    );
    return res.data;
};

export const requestPostBlog = async (data) => {
    const res = await request.post('/posts', data, { headers: { Authorization: `Bearer ${token}` } });
    return res.data;
};

export const requestGetAllHouse = async () => {
    const res = await request.get('/posts/status?status=approved');
    return res.data;
};

export const requestGetOneHouse = async (id) => {
    const res = await request.get(`/posts/${id}`);
    return res.data;
};

export const requestSearchHouse = async (data) => {
    const res = await request.post('/posts/search', data, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
};

export const requestUploadImg = async (data) => {
    const { postId, img } = data;

    const form = new FormData();

    for (let i = 0; i < img.length; i++) {
        form.append('images', img[i]);
    }

    const propertyId = postId;

    const res = await request.post(`properties/${propertyId}/images`, form, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
};

export const requestHeartHouse = async ({ postId, userId }) => {
    const res = await request.post('/favorites', { postId, userId }, { headers: { Authorization: `Bearer ${token}` } });
    return res;
};

export const requestGetHouseHeart = async (userId) => {
    const res = await request.get(`/favorites/${userId}`, { headers: { Authorization: `Bearer ${token}` } });
    return res.data;
};

export const requestGetAllUser = async () => {
    const res = await request.get('/users', { headers: { Authorization: `Bearer ${token}` } });
    return res.data;
};

export const requestGetUtils = async (data) => {
    const res = await request.get(`/utilities/near/${data}`, { headers: { Authorization: `Bearer ${token}` } });
    return res.data;
};

export const requestCreateUtility = async (data) => {
    const res = await request.post('/utilities', data, { headers: { Authorization: `Bearer ${token}` } });
    return res.data;
};

export const requestGetAllUtils = async () => {
    const res = await request.get('/utilities', { headers: { Authorization: `Bearer ${token}` } });
    return res.data;
};

export const requestPaymentsMomo = async (postId) => {
    const res = await request.put(`/posts/${postId}/payments?amount=10000`, null, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
};

/// auth

export const requestAuthMe = async (id) => {
    const res = await request.get(`/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
};

export const requestVerifyAccount = async (email) => {
    const res = await request.post(`/users/send-verification-email?email=${email}`, null, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res;
};
