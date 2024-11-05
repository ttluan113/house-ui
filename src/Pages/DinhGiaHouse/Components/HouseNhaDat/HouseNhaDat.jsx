import axios from 'axios';

import { useState, useEffect } from 'react';

import classNames from 'classnames/bind';
import styles from './HouseNhaDat.module.scss';

const cx = classNames.bind(styles);

function HouseNhaDat() {
    const [tinhthanh, setTinhThanh] = useState([]);
    const [idTinhThanh, setIdTinhThanh] = useState(0);
    const [huyen, setHuyen] = useState([]);
    const [idHuyen, setIdHuyen] = useState(0);
    const [xa, setXa] = useState([]);

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

    return (
        <div>
            <div className={cx('form-select')}>
                <select
                    className="form-select"
                    aria-label="Default select example"
                    onChange={(e) => setIdTinhThanh(e.target.value)}
                >
                    <option selected>Chọn Thành Phố / Tỉnh</option>
                    {tinhthanh.map((item) => (
                        <option value={item.id}>{item.name}</option>
                    ))}
                </select>

                <select
                    className="form-select"
                    aria-label="Default select example"
                    onChange={(e) => setIdHuyen(e.target.value)}
                >
                    <option selected>Chọn Quận / Huyện</option>
                    {huyen.map((item) => (
                        <option value={item.id}>{item.name}</option>
                    ))}
                </select>

                <select className="form-select" aria-label="Default select example">
                    <option selected>Chọn Phường / Xã</option>
                    {xa.map((item) => (
                        <option value={item.id}>{item.name}</option>
                    ))}
                </select>

                <div class="form-floating mb-3">
                    <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" />
                    <label for="floatingInput">Đường</label>
                </div>

                <div class="form-floating mb-3">
                    <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" />
                    <label for="floatingInput">Diện Tích</label>
                </div>

                <div class="form-floating mb-3">
                    <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" />
                    <label for="floatingInput">Số Phòng Ngủ</label>
                </div>

                <div class="form-floating mb-3">
                    <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" />
                    <label for="floatingInput">Số Tầng</label>
                </div>

                <div class="form-floating mb-3">
                    <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" />
                    <label for="floatingInput">Số Phòng Toilet</label>
                </div>
            </div>
        </div>
    );
}

export default HouseNhaDat;
