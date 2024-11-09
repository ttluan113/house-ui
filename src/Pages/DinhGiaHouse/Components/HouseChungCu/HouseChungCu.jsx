import axios from 'axios';

import { useState, useEffect } from 'react';

import classNames from 'classnames/bind';
import styles from './HouseChungCu.module.scss';

const cx = classNames.bind(styles);

function HouseChungCu({ onPredict }) {
    const [huyen, setHuyen] = useState([]);
    const [xa, setXa] = useState([]);

    // Input fields
    const [formData, setFormData] = useState({
        idTinhThanh: '01', // Hà Nội
        idHuyen: 0,
        idXa: 0,
        duong: '',
        dienTich: '',
        soPhongNgu: '',
        soToilet: '',
        school: 1,
        market: 1,
        hospital: 1,
        park: 1,
        swimming: 1,
        gym: 1,
        oto: 1,
        modern: 0,
    });

    // Fetch districts (Huyện) based on selected Tỉnh/Thành (Hà Nội)
    useEffect(() => {
        axios.get(`https://esgoo.net/api-tinhthanh/2/01.htm`).then((res) => setHuyen(res.data.data));
    }, []);

    // Fetch wards (Xã) based on selected district (Huyện)
    useEffect(() => {
        if (formData.idHuyen !== 0) {
            axios.get(`https://esgoo.net/api-tinhthanh/3/${formData.idHuyen}.htm`).then((res) => setXa(res.data.data));
        }
    }, [formData.idHuyen]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle prediction
    const handlePredict = () => {
        const huyenElement = document.querySelector("select[name='idHuyen']");
        const xaElement = document.querySelector("select[name='idXa']");
        const selectedHuyen = huyenElement.options[huyenElement.selectedIndex].text;
        const selectedXa = xaElement.options[xaElement.selectedIndex].text;

        const modernValue = parseInt(formData.modern);
        const modernCondition = modernValue > 5 ? 0 : 1;

        const requestData = {
            row_list: [
                formData.duong,
                selectedXa,
                selectedHuyen,
                parseFloat(formData.dienTich),
                parseInt(formData.soPhongNgu),
                parseInt(formData.soToilet),
                1, // Assume default values for additional params
                1,
                1,
                1,
                1,
                1,
                1,
                modernCondition,
            ],
        };
        onPredict(requestData);
    };
    return (
        <div>
            <div className={cx('form-select')}>
                <select className="form-select" disabled>
                    <option value="01">Hà Nội</option>
                </select>

                <select className="form-select" name="idHuyen" onChange={handleChange}>
                    <option value="">Chọn Quận / Huyện</option>
                    {huyen.map((item) => (
                        <option key={item.id} value={item.id}>
                            {item.name}
                        </option>
                    ))}
                </select>

                <select className="form-select" name="idXa" onChange={handleChange} disabled={!formData.idHuyen}>
                    <option value="">Chọn Phường / Xã</option>
                    {xa.map((item) => (
                        <option key={item.id} value={item.id}>
                            {item.name}
                        </option>
                    ))}
                </select>

                <div className="form-floating mb-3">
                    <input
                        type="text"
                        className="form-control"
                        name="duong"
                        placeholder="Đường"
                        onChange={handleChange}
                    />
                    <label>Đường</label>
                </div>

                <div className="form-floating mb-3">
                    <input
                        type="number"
                        className="form-control"
                        name="dienTich"
                        placeholder="Diện Tích"
                        onChange={handleChange}
                    />
                    <label>Diện Tích</label>
                </div>

                <div className="form-floating mb-3">
                    <input
                        type="number"
                        className="form-control"
                        name="soPhongNgu"
                        placeholder="Số Phòng Ngủ"
                        onChange={handleChange}
                    />
                    <label>Số Phòng Ngủ</label>
                </div>

                <div className="form-floating mb-3">
                    <input
                        type="number"
                        className="form-control"
                        name="modern"
                        placeholder="Số tuổi"
                        onChange={handleChange}
                    />
                    <label>Số Tuổi</label>
                </div>

                <div className="form-floating mb-3">
                    <input
                        type="number"
                        className="form-control"
                        name="soToilet"
                        placeholder="Số Toilet"
                        onChange={handleChange}
                    />
                    <label>Số Toilet</label>
                </div>

                <button onClick={handlePredict} className="btn btn-primary" style={{ width: '100%' }}>
                    Định Giá Ngay
                </button>
            </div>
        </div>
    );
}

export default HouseChungCu;
