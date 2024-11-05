import classNames from 'classnames/bind';
import styles from './DinhGiaHouse.module.scss';

import Header from '../../Components/Header/Header';
import imgBgr from '../../assets/img/test.png';

import { useEffect, useState } from 'react';

import HouseChungCu from './Components/HouseChungCu/HouseChungCu';
import HouseNhaDat from './Components/HouseNhaDat/HouseNhaDat';

import images from './Components/images';

const cx = classNames.bind(styles);

function DinhGiaHouse() {
    useEffect(() => {
        document.title = 'Thông tin định giá';
    }, []);

    const [checkData, setCheckData] = useState(false);

    const [checkTab, setCheckTab] = useState(0);

    return (
        <div className={cx('wrapper')}>
            <header>
                <Header />
            </header>

            <main className={cx('main')}>
                <div className={cx('search')}>
                    <img src={imgBgr} alt="" />
                    <div className={cx('form-search')}>
                        <div>
                            <h1>Xác định giá trị bất động sản nhanh và chính xác nhất</h1>
                            <div style={{ display: 'flex', gap: '20px', paddingTop: '30px' }}>
                                <span style={{ fontSize: '23px', fontWeight: '500' }}>1,110+ dự án</span>
                                <span style={{ fontSize: '23px', fontWeight: '500' }}>5,247,000+ BĐS đã xác thực</span>
                                <span style={{ fontSize: '23px', fontWeight: '500' }}>1,000,000+ lượt định giá</span>
                            </div>
                        </div>

                        <div className={cx('form')}>
                            <div className={cx('title')}>
                                <h4>Định Giá Căn Hộ Chung Cư</h4>
                            </div>

                            <div className={cx('form-btn')}>
                                <button onClick={() => setCheckTab(0)} id={cx(checkTab === 0 ? 'active' : '')}>
                                    Nhà Đất
                                </button>
                                <button onClick={() => setCheckTab(1)} id={cx(checkTab === 1 ? 'active' : '')}>
                                    Chung Cư
                                </button>
                            </div>

                            {checkTab === 1 ? <HouseChungCu /> : <HouseNhaDat />}

                            <button
                                onClick={() => setCheckData(!checkData)}
                                style={{ width: '100%' }}
                                type="button"
                                class="btn btn-primary"
                            >
                                Định Giá Ngay
                            </button>
                        </div>
                    </div>
                </div>
            </main>
            {checkData ? (
                <div className={cx('chart')}>
                    <h4>Dữ Liệu Định Giá</h4>
                    <div>
                        <h2>Định Giá Cho Căn Nhà Căn D2.08.02 - Tầng 08 - Tòa D2</h2>
                        <span>Cập Nhật Lúc: {new Date().toLocaleTimeString()}</span>
                    </div>
                    <div className={cx('chart-item')}>
                        <div id={cx('item')}>
                            <img src={images.logo} alt="" />
                            <div>
                                <span>Định giá tham khảo</span>
                                <h2>9,239,485,420đ</h2>
                            </div>
                        </div>
                        <div id={cx('item')}>
                            <img src={images.logo2} alt="" />
                            <div>
                                <span>Giá Theo m2</span>
                                <h2>85,630,077đ</h2>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
}

export default DinhGiaHouse;
