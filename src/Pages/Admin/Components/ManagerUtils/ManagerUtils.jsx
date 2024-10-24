import classNames from 'classnames/bind';
import styles from './ManagerUtils.module.scss';

import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import axios from 'axios';
import { requestCreateUtility } from '../../../../Config';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const cx = classNames.bind(styles);

function ManagerUtils() {
    const [utilityName, setUtilityName] = useState('');
    const [location, setLocation] = useState('');
    const [phuong, setPhuong] = useState('');
    const [district, setDistrict] = useState('');
    const [province, setProvince] = useState('');
    const [utilityTypeId, setUtilityTypeId] = useState(0);

    const [tinhthanh, setTinhThanh] = useState([]);
    const [idTinhThanh, setIdTinhThanh] = useState(0);
    const [huyen, setHuyen] = useState([]);
    const [idHuyen, setIdHuyen] = useState(0);
    const [xa, setXa] = useState([]);
    const [setIdXa] = useState(0);

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

    const handleCreateUtility = async () => {
        try {
            const data = {
                utilityName,
                location,
                phuong,
                district,
                province,
                utilityTypeId,
            };
            const res = await requestCreateUtility(data);
            if (res) {
                toast.success('Thêm Tiện Ích Thành Công !!!');
            }
        } catch (error) {
            toast.error('Lỗi Vui Lòng Thử Lại !!!');
        }
    };

    return (
        <div className={cx('wrapper')}>
            <ToastContainer />
            <h5>Thêm tiện ích</h5>
            <div className="form-floating mb-3">
                <input
                    type="text"
                    className="form-control"
                    id="floatingInput"
                    placeholder="name@example.com"
                    onChange={(e) => setUtilityName(e.target.value)}
                />
                <label for="floatingInput">Tên Tiện Ích</label>
            </div>

            <div className="form-floating mb-3">
                <input
                    type="text"
                    className="form-control"
                    id="floatingInput"
                    placeholder="name@example.com"
                    onChange={(e) => setLocation(e.target.value)}
                />
                <label for="floatingInput">Địa Chỉ</label>
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

            <select
                className="form-select mb-3"
                aria-label="Default select example"
                onChange={(e) => setUtilityTypeId(e.target.value)}
            >
                <option>Chọn Tiện Ích</option>
                <option value={1}>Trường Học</option>
                <option value={2}>Bệnh Viện</option>
                <option value={3}>Công Viên</option>
                <option value={4}>Hồ</option>
            </select>

            <Button onClick={handleCreateUtility} fullWidth variant="contained">
                Thêm Tiện Ích
            </Button>
        </div>
    );
}

export default ManagerUtils;
