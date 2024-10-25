import classNames from 'classnames/bind';
import styles from './UiBuyHouse.module.scss';

import Slider from 'react-slick';

import axios from 'axios';

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function UiBuyHouse({ dataHouseAll }) {
    console.log(dataHouseAll);
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((currentSlide + 1) % dataHouseAll.length);
        }, 6000);
        return () => clearInterval(interval);
    }, [currentSlide]);

    const settings = {
        dots: false,
        infinite: true,
        speed: 2000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        beforeChange: (_oldIndex, newIndex) => setCurrentSlide(newIndex),
    };

    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);

    const [minValue, setMinValue] = useState(1);
    const [maxValue, setMaxValue] = useState(500);

    const [minPrice, setMinPrice] = useState(1);
    const [maxPrice, setMaxPrice] = useState(100000000000);

    const [province, setProvince] = useState('');
    const [checkPostType, setCheckPostType] = useState('');

    const [district, setDistrict] = useState('');

    const [propertyType, setPropertyType] = useState('');

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

    useEffect(() => {
        axios.get('https://esgoo.net/api-tinhthanh/1/0.htm').then((res) => setTinhThanh(res.data.data));
    }, []);

    useEffect(() => {
        axios.get(`https://esgoo.net/api-tinhthanh/2/0${1}.htm`).then((res) => setHuyen(res.data.data));
    }, [idTinhThanh]);

    const handleSearchHouse = async () => {
        const data = {
            ...(province && { province: province }),
            minPrice: minPrice,
            maxPrice: maxPrice,
            minArea: minValue,
            maxArea: maxValue,
            postType: checkPostType,
            district: district,
            propertyType: propertyType,
        };
        localStorage.setItem('data', JSON.stringify(data));
        navigate('/search');
    };

    return (
        <div className={cx('header-main')}>
            <div className={cx('column-right')}>
                <Slider {...settings}>
                    {dataHouseAll.length > 0 &&
                        dataHouseAll
                            ?.filter((item) => item.charged === 1)
                            .map((house, index) => (
                                <div>
                                    <div className={cx('form-slide')}>
                                        <img src={house.property.images[0]} alt="Banner 1" className={cx('img-big')} />
                                        <div
                                            id={cx(currentSlide === index ? 'animation-text' : '')}
                                            className={cx('text-slide')}
                                        >
                                            <div className={cx('text-content')}>
                                                <h2>{house.postTitle}</h2>
                                                {/* <h2>{house.price.toLocaleString() + ' VND'}</h2> */}
                                                <h2>
                                                    {house.property.phuong} - {house.property.district}
                                                </h2>
                                                <button id={cx('btn-watch-house')}>
                                                    <Link to={`/bds/${house.postId}`}>Xem Ngay</Link>
                                                </button>
                                            </div>
                                        </div>
                                        <div
                                            id={cx(currentSlide === index ? 'animation-img' : '')}
                                            className={cx('img-slide')}
                                        >
                                            <img src={house.property.images[0]} alt="Banner 1" id={cx('img-slide')} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                </Slider>
            </div>

            <div className={cx('column-left')}>
                <h2>Tìm Kiếm Ngay</h2>
                <div className={cx('search-house')}>
                    <div className={cx('btn-select')}>
                        <button className={cx('active-button')}>Dự án</button>
                    </div>
                    <div className={cx('search-input')}>
                        <select
                            class="form-select"
                            aria-label="Default select example"
                            onChange={(e) => setProvince(e.target.value)}
                            style={{ width: '70%' }}
                        >
                            <option selected>Chọn Thành Phố</option>
                            <option value="Hà Nội">Hà Nội</option>
                        </select>

                        <select
                            class="form-select"
                            aria-label="Default select example"
                            onChange={(e) => setDistrict(e.target.value)}
                            style={{ width: '50%' }}
                        >
                            <option selected>Chọn quận</option>
                            {huyen.map((item) => (
                                <option key={item.id} value={item.name}>
                                    {item.name}
                                </option>
                            ))}
                        </select>

                        <button onClick={handleSearchHouse}>Tìm kiếm</button>
                    </div>

                    <div className={cx('select-option')}>
                        <select
                            className="form-select"
                            aria-label="Chọn loại BĐS"
                            onChange={(e) => setPropertyType(e.target.value)}
                        >
                            <option selected>Loại BĐS</option>
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
                            <div onClick={() => setIsOpen(!isOpen)} className={cx('label-range')}>
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

                        <div className={cx('div-range')}>
                            <div onClick={() => setIsOpen2(!isOpen2)} className={cx('label-range')}>
                                <span>
                                    Khoảng giá {minPrice.toLocaleString()} - {maxPrice.toLocaleString()} VND
                                </span>
                                <FontAwesomeIcon icon={faChevronDown} />
                            </div>
                            {isOpen2 && (
                                <div className={cx('modal-range')}>
                                    <div className={cx('input-search')}>
                                        <div>
                                            <div className="form-floating mb-3">
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    id="minPrice"
                                                    placeholder="Từ"
                                                    value={minPrice}
                                                    onChange={(e) => setMinPrice(Number(e.target.value))}
                                                />
                                                <label htmlFor="minPrice">Từ</label>
                                            </div>
                                        </div>
                                        <FontAwesomeIcon icon={faArrowRight} />
                                        <div>
                                            <div className="form-floating mb-3">
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    id="maxPrice"
                                                    placeholder="Đến"
                                                    value={maxPrice}
                                                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                                                />
                                                <label htmlFor="maxPrice">Đến</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="range-slider">
                                        <div className="slider-container">
                                            <input
                                                type="range"
                                                value={minPrice}
                                                min={minPriceSearch}
                                                max={maxPriceSearch}
                                                className="thumb thumb-left"
                                                onChange={handleMinPrice}
                                            />
                                            <input
                                                type="range"
                                                value={maxPrice}
                                                min={minPriceSearch}
                                                max={maxPriceSearch}
                                                className="thumb thumb-right"
                                                onChange={handleMaxPrice}
                                            />
                                            <div className="slider-track"></div>
                                            <div
                                                className="slider-range"
                                                style={{
                                                    left: `${(minPrice / maxPriceSearch) * 100}%`,
                                                    right: `${100 - (maxPrice / maxPriceSearch) * 100}%`,
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
                                                <span>10,000,000,000 VND</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={cx('btn-apply-price')}>
                                        <button onClick={() => setIsOpen2(false)} id={cx('close')}>
                                            Bỏ Chọn
                                        </button>
                                        <button onClick={handleSearch} id={cx('succes')}>
                                            Áp Dụng
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UiBuyHouse;
