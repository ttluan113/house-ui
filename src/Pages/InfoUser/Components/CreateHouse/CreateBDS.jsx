import classNames from 'classnames/bind';
import styles from './CreateBDS.module.scss';
import { requestCreateBDS } from '../../../../Config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { Editor } from '@tinymce/tinymce-react';

import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

const cx = classNames.bind(styles);

function CreateBDS() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [sophong, setSophong] = useState(0);
    const [soTang, setSoTang] = useState(0);
    const [soToilet, setSoToilet] = useState(0);
    const [district, setDistrict] = useState('');
    const [area, setArea] = useState(0);
    const [location, setLocation] = useState('');
    const [phuong, setPhuong] = useState('');
    const [province, setProvince] = useState('');

    const [dataImg, setDataImg] = useState({});

    const [tinhthanh, setTinhThanh] = useState([]);
    const [idTinhThanh, setIdTinhThanh] = useState(0);
    const [huyen, setHuyen] = useState([]);
    const [idHuyen, setIdHuyen] = useState(0);
    const [xa, setXa] = useState([]);
    const [idXa, setIdXa] = useState(0);

    const [categoryId, setCategoryId] = useState(0);

    const [checkCreateBDS, setCheckCreateBDS] = useState(false);

    const token = Cookies.get('Token');

    const decodeJwt = jwtDecode(token);

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    useEffect(() => {
        axios.get('https://esgoo.net/api-tinhthanh/1/0.htm').then((res) => setTinhThanh(res.data.data));
    }, []);

    useEffect(() => {
        if (idTinhThanh !== 0) {
            axios.get(`https://esgoo.net/api-tinhthanh/2/${idTinhThanh}.htm`).then((res) => setHuyen(res.data.data));
        }
    }, [idTinhThanh]);

    useEffect(() => {
        if (idHuyen !== 0) {
            axios.get(`https://esgoo.net/api-tinhthanh/3/${idHuyen}.htm`).then((res) => setXa(res.data.data));
        }
    }, [idHuyen]);

    const handlePostBDS = async () => {
        setCheckCreateBDS(true);
        const formData = new FormData();
        const property = {
            title: title,
            description: description,
            price: price,
            soTang: soTang,
            sophong: sophong,
            soToilet: soToilet,
            ownerId: decodeJwt.userId,
            categoryId: categoryId,
            location: location,
            phuong: phuong,
            district: district,
            province: province,
            area: area,
            age: 5,
        };

        formData.append('property', new Blob([JSON.stringify(property)], { type: 'application/json' }));

        for (let i = 0; i < dataImg.length; i++) {
            formData.append('images', dataImg[i]);
        }

        try {
            const res = await requestCreateBDS(formData);
            toast.success('Tạo Bất Động Sản Thành Công !!!');
            setCheckCreateBDS(false);
        } catch (error) {
            toast.error('Đã có lỗi xảy ra vui lòng thử lại !!!');
            setCheckCreateBDS(false);
        }
    };

    const [imagePreviews, setImagePreviews] = useState([]);
    const handleImageChange = (files) => {
        const previews = [];
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();
            reader.onload = (e) => {
                previews.push(e.target.result);
                if (previews.length === files.length) {
                    setImagePreviews(previews);
                }
            };
            reader.readAsDataURL(file);
        }
        setDataImg(files);
    };

    return (
        <div className={cx('wrapper')}>
            <ToastContainer />
            <h3>Tạo bất động sản</h3>
            <div className={cx('form')}>
                <div className="form-floating mb-3">
                    <input
                        type="text"
                        className="form-control"
                        id="floatingInput"
                        placeholder="name@example.com/"
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <label htmlFor="floatingInput">Tiêu Đề Bất Động Sản</label>
                </div>

                <Editor
                    onEditorChange={(value) => setDescription(value)}
                    apiKey="n4hxnmi16uwk9dmdgfx6nscsf8oc30528dlcub1mzsk8deqy"
                    init={{
                        plugins:
                            'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
                    }}
                    initialValue="Mô Tả Bất Động Sản!"
                />

                <div className="form-floating mb-3">
                    <input
                        type="number"
                        className="form-control"
                        id="floatingInput"
                        placeholder="name@example.com/"
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    <label htmlFor="floatingInput">Giá Bất Động Sản</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        type="number"
                        className="form-control"
                        id="floatingInput"
                        placeholder="name@example.com/"
                        onChange={(e) => setArea(e.target.value)}
                    />
                    <label htmlFor="floatingInput">Diện Tích</label>
                </div>

                <select
                    className="form-select mb-3"
                    aria-label="Default select example"
                    onChange={(e) => setCategoryId(e.target.value)}
                >
                    <option defaultValue>Loại Bất Động Sản</option>
                    <option value="2">Nhà Đất</option>
                    <option value="1">Chung Cư</option>
                </select>

                <div className="form-floating mb-3">
                    <input
                        type="text"
                        className="form-control"
                        id="floatingInput"
                        placeholder="name@example.com/"
                        onChange={(e) => setLocation(e.target.value)}
                    />
                    <label htmlFor="floatingInput">Phố</label>
                </div>

                <select
                    className="form-select mb-3"
                    aria-label="Default select example"
                    onChange={(e) => {
                        const selectedValue = e.target.value;
                        setIdTinhThanh(selectedValue); // Đặt ID
                        const selectedItem = tinhthanh.find((item) => item.id === selectedValue);
                        setProvince(selectedItem ? selectedItem.name : '');
                    }}
                >
                    {tinhthanh.map((item) => (
                        <option key={item.id} value={item.id}>
                            {item.name}
                        </option>
                    ))}
                </select>

                <select
                    className="form-select mb-3"
                    aria-label="Default select example"
                    onChange={(e) => {
                        const selectedValue = e.target.value;
                        setIdHuyen(selectedValue); // Đặt ID
                        const selectedItem = huyen.find((item) => item.id === selectedValue);
                        setDistrict(selectedItem ? selectedItem.name : '');
                    }}
                >
                    {huyen.map((item) => (
                        <option key={item.id} value={item.id}>
                            {item.name}
                        </option>
                    ))}
                </select>

                <select
                    className="form-select mb-3"
                    aria-label="Default select example"
                    onChange={(e) => {
                        const selectedValue = e.target.value;

                        setIdXa(selectedValue); // Đặt ID
                        const selectedItem = xa.find((item) => item.id === selectedValue);
                        setPhuong(selectedItem ? selectedItem.name : '');
                    }}
                >
                    {xa.map((item) => (
                        <option key={item.id} value={item.id}>
                            {item.name}
                        </option>
                    ))}
                </select>

                <div className="form-floating mb-3">
                    <input
                        type="number"
                        className="form-control"
                        id="floatingInput"
                        placeholder="name@example.com/"
                        onChange={(e) => setSophong(e.target.value)}
                    />
                    <label htmlFor="floatingInput">Số phòng</label>
                </div>

                <div className="form-floating mb-3">
                    <input
                        type="number"
                        className="form-control"
                        id="floatingInput"
                        placeholder="name@example.com/"
                        onChange={(e) => setSoTang(e.target.value)}
                    />
                    <label htmlFor="floatingInput">Số tầng</label>
                </div>

                <div className="form-floating mb-3">
                    <input
                        type="number"
                        className="form-control"
                        id="floatingInput"
                        placeholder="name@example.com/"
                        onChange={(e) => setSoToilet(e.target.value)}
                    />
                    <label htmlFor="floatingInput">Số Toilet</label>
                </div>

                <Button variant="contained" component="label" startIcon={<CloudUploadIcon />}>
                    Upload Ảnh
                    <VisuallyHiddenInput type="file" multiple onChange={(e) => handleImageChange(e.target.files)} />
                </Button>

                <div className={cx('image-preview')}>
                    {imagePreviews.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`Preview ${index}`}
                            style={{ width: '100px', height: '100px', margin: '5px' }}
                        />
                    ))}
                </div>

                <Button disabled={checkCreateBDS} variant="contained" onClick={handlePostBDS}>
                    Tạo Bất Động Sản
                </Button>
            </div>
        </div>
    );
}

export default CreateBDS;
