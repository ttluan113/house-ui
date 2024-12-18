import classNames from 'classnames/bind';
import styles from './SearchHouse.module.scss';

import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import CardBody from '../../Components/CardBody/CardBody';

import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faChevronDown } from '@fortawesome/free-solid-svg-icons';

import axios from 'axios';

import { requestSearchHouse } from '../../Config';

const cx = classNames.bind(styles);

function SearchHouse() {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);

    const [minValue, setMinValue] = useState(1);
    const [maxValue, setMaxValue] = useState(500);

    const [minPrice, setMinPrice] = useState(1);
    const [maxPrice, setMaxPrice] = useState(100000000000);

    const [province, setProvince] = useState('');
    const [checkPostType, setCheckPostType] = useState('');

    const [propertyType, setPropertyType] = useState('');
    const [district, setDistrict] = useState('');

    const [dataSearch, setDataSearch] = useState([]);

    const min = 0;
    const max = 500;

    const minPriceSearch = 0;
    const maxPriceSearch = 100000000000;

    const handleMinChange = (e) => {
        const value = Math.min(Number(e.target.value), maxValue - 1);
        setMinValue(value);
    };

    const handleMaxChange = (e) => {
        const value = Math.max(Number(e.target.value), minValue + 1);
        setMaxValue(value);
    };

    const handleMinPrice = (e) => {
        const value = Math.min(Number(e.target.value), maxPrice - 1);
        setMinPrice(value);
    };

    const handleMaxPrice = (e) => {
        const value = Math.max(Number(e.target.value), minPrice + 1);
        setMaxPrice(value);
    };

    const handleSearch = () => {
        setIsOpen(false);
        setIsOpen2(false);
    };

    const [tinhthanh, setTinhThanh] = useState([]);
    const [idTinhThanh, setIdTinhThanh] = useState(1);
    const [huyen, setHuyen] = useState([]);
    const [idHuyen, setIdHuyen] = useState(0);
    const [xa, setXa] = useState([]);

    useEffect(() => {
        axios.get('https://esgoo.net/api-tinhthanh/1/0.htm').then((res) => setTinhThanh(res.data.data));
    }, []);

    useEffect(() => {
        if (province === 'Hà Nội' || province === 'Hồ Chí Minh') {
            console.log(huyen);
            const provinceId = province === 'Hà Nội' ? '01' : '79'; // Assume Hà Nội = 1, Hồ Chí Minh = 2
            axios.get(`https://esgoo.net/api-tinhthanh/2/${provinceId}.htm`).then((res) => setHuyen(res.data.data));
        } else {
            setHuyen([]); // Reset district list if no matching province
        }
    }, [province]);

    const handleSearchHouse = async () => {
        const data = {
            province: province,
            propertyType: propertyType,
            minPrice: minPrice,
            maxPrice: maxPrice,
            minArea: minValue,
            maxArea: maxValue,
            postType: checkPostType,
            district: district,
        };

        localStorage.setItem('data', JSON.stringify(data));

        const newData = localStorage.getItem('data');

        const res = await requestSearchHouse(JSON.parse(newData));

        setDataSearch(res.content);
    };

    const newData = localStorage.getItem('data');

    useEffect(() => {
        const fetchData = async () => {
            const res = await requestSearchHouse(JSON.parse(newData));
            setDataSearch(res.content);
        };
        fetchData();
    }, []);

    useEffect(() => {
        document.title = 'Tìm Kiếm Nhà Cho Bạn';
    }, []);

    return (
        <div className={cx('wrapper')}>
            <header>
                <Header />
            </header>

            <main className={cx('main')}>
                <div className={cx('inner')}>
                    <div className={cx('header-search')}>
                        <div className={cx('select-option')}>
                            <select
                                className="form-select"
                                aria-label="Chọn loại BĐS"
                                onChange={(e) => setPropertyType(e.target.value)}
                            >
                                <option value={null}>Loại BĐS</option>
                                <option value="chung cư">Chung Cư</option>
                                <option value="Nhà Đất">Nhà Đất</option>
                            </select>

                            <select
                                className="form-select"
                                aria-label="Chọn kiểu nhà"
                                onChange={(e) => setCheckPostType(e.target.value)}
                            >
                                <option selected>Kiểu Nhà</option>
                                <option value="for_rent">Cho Thuê</option>
                                <option value="for_sale">Đăng Bán</option>
                            </select>

                            <div className={cx('div-range')}>
                                <div
                                    onClick={() => {
                                        setIsOpen(!isOpen);
                                        setIsOpen2(false);
                                    }}
                                    className={cx('label-range')}
                                >
                                    <span>
                                        Diện Tích {minValue} - {maxValue} m²
                                    </span>
                                    <FontAwesomeIcon icon={faChevronDown} />
                                </div>
                                {isOpen && (
                                    <div className={cx('modal-range')}>
                                        <div className={cx('input-search')}>
                                            <div>
                                                <div className="form-floating mb-3">
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        id="minArea"
                                                        placeholder="Từ"
                                                        value={minValue}
                                                        onChange={(e) => setMinValue(Number(e.target.value))}
                                                    />
                                                    <label htmlFor="minArea">Từ</label>
                                                </div>
                                            </div>
                                            <FontAwesomeIcon icon={faArrowRight} />
                                            <div>
                                                <div className="form-floating mb-3">
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        id="maxArea"
                                                        placeholder="Đến"
                                                        value={maxValue}
                                                        onChange={(e) => setMaxValue(Number(e.target.value))}
                                                    />
                                                    <label htmlFor="maxArea">Đến</label>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="range-slider">
                                            <div className="slider-container">
                                                <input
                                                    type="range"
                                                    value={minValue}
                                                    min={min}
                                                    max={max}
                                                    className="thumb thumb-left"
                                                    onChange={handleMinChange}
                                                />
                                                <input
                                                    type="range"
                                                    value={maxValue}
                                                    min={min}
                                                    max={max}
                                                    className="thumb thumb-right"
                                                    onChange={handleMaxChange}
                                                />
                                                <div className="slider-track"></div>
                                                <div
                                                    className="slider-range"
                                                    style={{
                                                        left: `${(minValue / max) * 100}%`,
                                                        right: `${100 - (maxValue / max) * 100}%`,
                                                    }}
                                                ></div>

                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        paddingTop: '10px',
                                                    }}
                                                >
                                                    <span>0</span>
                                                    <span>500 m²</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className={cx('list-range')}>
                                            <ul>
                                                <li
                                                    onClick={() => {
                                                        setMinValue(35);
                                                        setMaxValue(45);
                                                    }}
                                                >
                                                    35 - 45 m2
                                                </li>
                                                <li
                                                    onClick={() => {
                                                        setMinValue(45);
                                                        setMaxValue(60);
                                                    }}
                                                >
                                                    45 - 60 m2
                                                </li>
                                                <li
                                                    onClick={() => {
                                                        setMinValue(60);
                                                        setMaxValue(80);
                                                    }}
                                                >
                                                    60 - 80 m2
                                                </li>
                                                <li
                                                    onClick={() => {
                                                        setMinValue(80);
                                                        setMaxValue(100);
                                                    }}
                                                >
                                                    80 - 100 m2
                                                </li>
                                                <li
                                                    onClick={() => {
                                                        setMinValue(120);
                                                        setMaxValue(140);
                                                    }}
                                                >
                                                    120 - 140 m2
                                                </li>
                                                <li
                                                    onClick={() => {
                                                        setMinValue(140);
                                                        setMaxValue(160);
                                                    }}
                                                >
                                                    140 - 160 m2
                                                </li>
                                                <li
                                                    onClick={() => {
                                                        setMinValue(180);
                                                        setMaxValue(200);
                                                    }}
                                                >
                                                    180 - 200 m2
                                                </li>
                                            </ul>
                                        </div>

                                        <div className={cx('btn-apply-price')}>
                                            <button onClick={() => setIsOpen(false)} id={cx('close')}>
                                                Bỏ Chọn
                                            </button>
                                            <button onClick={handleSearch} id={cx('succes')}>
                                                Áp Dụng
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className={cx('select-option')}>
                                <select
                                    className="form-select"
                                    aria-label="Khoảng giá"
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        if (value === '0-1') {
                                            setMinPrice(0);
                                            setMaxPrice(1_000_000_000);
                                        } else if (value === '1-5') {
                                            setMinPrice(1_000_000_001);
                                            setMaxPrice(5_000_000_000);
                                        } else if (value === '5-10') {
                                            setMinPrice(5_000_000_001);
                                            setMaxPrice(10_000_000_000);
                                        } else if (value === '>10') {
                                            setMinPrice(10_000_000_001);
                                            setMaxPrice(100_000_000_000); // Giá trị lớn hơn 10 tỉ
                                        }
                                    }}
                                >
                                    <option value="" selected>
                                        Chọn khoảng giá
                                    </option>
                                    <option value="0-1">0 - 1 Tỉ</option>
                                    <option value="1-5">1 - 5 Tỉ</option>
                                    <option value="5-10">5 - 10 Tỉ</option>
                                    <option value=">10">Trên 10 Tỉ</option>
                                </select>
                            </div>
                        </div>
                        <div className={cx('search-input')}>
                            <select
                                class="form-select"
                                aria-label="Default select example"
                                onChange={(e) => setDistrict(e.target.value)}
                            >
                                <option selected>Chọn quận</option>
                                {huyen.map((item) => (
                                    <option key={item.id} value={item.full_name}>
                                        {item.full_name}
                                    </option>
                                ))}
                            </select>

                            <select
                                class="form-select"
                                aria-label="Default select example"
                                onChange={(e) => setProvince(e.target.value)}
                            >
                                <option selected>Chọn Thành Phố</option>
                                <option value="Hà Nội">Hà Nội</option>
                                <option value="Hồ Chí Minh">Hồ Chí Minh</option>
                            </select>
                            <button onClick={handleSearchHouse}>Tìm kiếm</button>
                        </div>
                    </div>
                    {dataSearch.length > 0 ? (
                        <div className={cx('result')}>
                            {dataSearch.map((item) => (
                                <CardBody house={item} />
                            ))}
                        </div>
                    ) : (
                        <div className={cx('loading')}>
                            <p>Chúng tôi chưa có dữ liệu của bạn tìm kiếm </p>
                        </div>
                    )}
                </div>
            </main>

            <footer>
                <Footer />
            </footer>
        </div>
    );
}

export default SearchHouse;
