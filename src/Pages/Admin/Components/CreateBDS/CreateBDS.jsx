import classNames from 'classnames/bind';
import styles from './CreateBDS.module.scss';
import { requestCreateBDS, requestGetAllBlog, requestUploadImg } from '../../../../Config'; // Bỏ requestGetDistricts, requestGetPhuong, requestGetProvinces
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import ModalAddImages from './Modal/ModalAddImages';

import { Editor } from '@tinymce/tinymce-react';

const cx = classNames.bind(styles);

function CreateBDS() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [sophong, setSophong] = useState(0);
    const [soTang, setSoTang] = useState(0);
    const [soToilet, setSoToilet] = useState(0);
    const [userId, setUserId] = useState(0);
    const [district, setDistrict] = useState('');
    const [area, setArea] = useState(0);
    const [location, setLocation] = useState('');
    const [phuong, setPhuong] = useState('');
    const [province, setProvince] = useState('');

    const [tinhthanh, setTinhThanh] = useState([]);
    const [idTinhThanh, setIdTinhThanh] = useState(0);
    const [huyen, setHuyen] = useState([]);
    const [idHuyen, setIdHuyen] = useState(0);
    const [xa, setXa] = useState([]);
    const [setIdXa] = useState(0);

    const [checkLengthImg, setCheckLengthImg] = useState(false);

    const [dataBlogNoImage, setDataBlogNoImage] = useState([]);

    const handleUploadImg = useCallback(async (data) => {
        const imageNames = Array.from(data.img);

        const newData = {
            img: imageNames,
            postId: data.postId,
        };

        const res = await requestUploadImg(newData);

        const res1 = await requestGetAllBlog();
        const img = res1.filter((item) => item?.images?.length <= 0);
        setDataBlogNoImage(img);
        if (img.length > 0) {
            setCheckLengthImg(true);
        } else {
            setCheckLengthImg(false);
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const res = await requestGetAllBlog();
            const img = res.filter((item) => item?.images?.length <= 0);
            setDataBlogNoImage(img);
            if (img.length > 0) {
                setCheckLengthImg(true);
            } else {
                setCheckLengthImg(false);
            }
        };
        fetchData();
    }, [checkLengthImg]);

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
        const data = {
            title,
            description,
            price,
            soTang,
            sophong,
            soToilet,
            userId,
            propertyId: 101,
            statusId: 1,
            ownerId: 1,
            categoryId: 4,
            location: location,
            phuong: `Phường ${phuong}`,
            district: district,
            province: province,
            area: area,
            lat: 21.004751,
            lon: 105.863135,
            age: 5,
        };

        try {
            const res = await requestCreateBDS(data);
            if (res.status === 200) {
                toast.success('Tạo Bất Động Sản Thành Công !!!');
            }
        } catch (error) {
            toast.error('Đã có lỗi xảy ra vui lòng thử lại !!!');
        }
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
                <select className="form-select mb-3" aria-label="Default select example">
                    <option defaultValue>Loại Bất Động Sản</option>
                    <option value="4">Nhà Đất</option>
                    <option value="5">Chung Cư</option>
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
                {/* thành phố */}
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
                    <label htmlFor="floatingInput">Số Tầng</label>
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

                <div className="form-floating mb-3">
                    <input
                        type="number"
                        className="form-control"
                        id="floatingInput"
                        placeholder="name@example.com/"
                        onChange={(e) => setUserId(e.target.value)}
                    />
                    <label htmlFor="floatingInput">Tạo Bất Động Sản cho User ID</label>
                </div>

                <button onClick={handlePostBDS} type="button" className="btn btn-primary">
                    Tạo Bất Động Sản
                </button>
            </div>
            <ModalAddImages show={checkLengthImg} dataBlogNoImage={dataBlogNoImage} handleUploadImg={handleUploadImg} />
        </div>
    );
}

export default CreateBDS;
