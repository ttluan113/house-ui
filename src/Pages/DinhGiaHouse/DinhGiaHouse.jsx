import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './DinhGiaHouse.module.scss';

import Header from '../../Components/Header/Header';
import imgBgr from '../../assets/img/test.png';

import HouseChungCu from './Components/HouseChungCu/HouseChungCu';
import HouseNhaDat from './Components/HouseNhaDat/HouseNhaDat';

const cx = classNames.bind(styles);

function DinhGiaHouse() {
    useEffect(() => {
        document.title = 'Thông tin định giá';
    }, []);

    const [checkData, setCheckData] = useState(false);
    const [checkTab, setCheckTab] = useState(0);
    const [predictionData, setPredictionData] = useState(null);
    const [area, setArea] = useState(0);
    const handlePredict = async (requestData) => {
        const apiUrl =
            checkTab === 0 ? 'http://localhost:5000/predict_house' : 'http://localhost:5000/predict_apartment';

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setArea(requestData.row_list[3]);
            setPredictionData(data.prediction); // Store the prediction result
            setCheckData(true); // Show the prediction result
        } catch (error) {
            console.error('Lỗi khi gọi API:', error);
        }
    };

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
                            {/* Additional content omitted for brevity */}
                        </div>

                        <div className={cx('form')}>
                            <div className={cx('title')}>
                                <h4>Định Giá Bất Động Sản</h4>
                            </div>

                            <div className={cx('form-btn')}>
                                <button onClick={() => setCheckTab(0)} id={cx(checkTab === 0 ? 'active' : '')}>
                                    Nhà Đất
                                </button>
                                <button onClick={() => setCheckTab(1)} id={cx(checkTab === 1 ? 'active' : '')}>
                                    Chung Cư
                                </button>
                            </div>

                            {checkTab === 1 ? (
                                <HouseChungCu onPredict={handlePredict} />
                            ) : (
                                <HouseNhaDat onPredict={handlePredict} />
                            )}
                        </div>
                    </div>
                </div>
            </main>

            {checkData && predictionData ? (
                <div className={cx('chart')}>
                    <h4>Dữ Liệu Định Giá</h4>
                    <div>
                        <h2>Định Giá Cho Bất Động Sản</h2>
                        <span>Cập Nhật Lúc: {new Date().toLocaleTimeString()}</span>
                    </div>
                    <div className={cx('chart-item')}>
                        <div id={cx('item')}>
                            <span>Định giá tham khảo</span>
                            <h2>{((predictionData[0] * area) / 1000).toFixed(2)} tỉ đồng</h2>
                        </div>
                        <div id={cx('item')}>
                            <span>Giá Theo m2</span>
                            <h2>{(predictionData[0] * 1).toFixed(2)} trăm triệu đồng</h2>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
}

export default DinhGiaHouse;
