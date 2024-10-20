import classNames from 'classnames/bind';
import styles from './DetailHouse.module.scss';
import Header from '../../Components/Header/Header';
import { useEffect, useState, useRef } from 'react';
import { requestGetOneHouse } from '../../Config';
import { useParams } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';

const cx = classNames.bind(styles);

function DetailHouse() {
    const { id } = useParams();
    const [dataHouse, setDataHouse] = useState({});
    const [activeBtn, setActiveBtn] = useState(0);
    const mapRef = useRef(null); // Tham chiếu đến thẻ chứa bản đồ

    useEffect(() => {
        const fetchData = async () => {
            const res = await requestGetOneHouse(id);
            console.log(res);
            setDataHouse(res);
        };
        fetchData();
    }, [id]);

    // Khởi tạo bản đồ khi component đã render
    useEffect(() => {
        if (dataHouse.property?.lat && dataHouse.property?.lon) {
            const map = L.map(mapRef.current, {
                center: [dataHouse.property.lat, dataHouse.property.lon],
                zoom: 17, // Zoom mặc định
                minZoom: 15, // Giới hạn zoom tối thiểu
                maxZoom: 20, // Giới hạn zoom tối đa
                scrollWheelZoom: false, // Vô hiệu hóa zoom bằng chuột
            });

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            }).addTo(map);

            L.marker([dataHouse.property.lat, dataHouse.property.lon])
                .addTo(map)
                .bindPopup(dataHouse.property.location || 'Vị trí căn nhà')
                .openPopup();

            return () => map.remove(); // Cleanup khi component unmount
        }
    }, [dataHouse]);

    return (
        <div className={cx('wrapper')}>
            <header>
                <Header />
            </header>

            <main className={cx('main')}>
                <div className={cx('img-detail')}>
                    <div className={cx('img-big')}>
                        {dataHouse.property?.images[0] && <img src={dataHouse.property.images[0]} alt="big-img" />}
                    </div>
                    {dataHouse.property?.images.length > 1 && (
                        <div className={cx('img-small')}>
                            {dataHouse.property.images.slice(1).map((img, index) => (
                                <img key={index} src={img} alt={`img-${index}`} />
                            ))}
                        </div>
                    )}
                </div>
                <div className={cx('btn-detail')}>
                    <button onClick={() => setActiveBtn(0)} id={cx(activeBtn === 0 && 'active-button')}>
                        Giá Bán
                    </button>
                    <button onClick={() => setActiveBtn(1)} id={cx(activeBtn === 1 && 'active-button')}>
                        Tiện ích
                    </button>
                </div>
                <div className={cx('info-house')}>
                    <h2 style={{ color: '#000' }}>{dataHouse.property?.title}</h2>
                    <h4>Mô Tả Căn Nhà</h4>
                    <div className={cx('column-detail')}>
                        <div className={cx('info-house-1')}>
                            <span>Giá Bán</span>
                            <p>{Number(dataHouse.property?.price).toLocaleString()} VND</p>
                        </div>
                        <div className={cx('info-house-1')}>
                            <span>Địa Chỉ</span>
                            <p>{`${dataHouse.property?.location} - ${dataHouse.property?.phuong} - ${dataHouse.property?.district} - ${dataHouse.property?.province}`}</p>
                        </div>
                        <div className={cx('info-house-1')}>
                            <span>Số Phòng</span>
                            <p>{dataHouse.property?.sophong || 0}</p>
                        </div>
                        <div className={cx('info-house-1')}>
                            <span>Số Tầng</span>
                            <p>{dataHouse.property?.soTang || 0}</p>
                        </div>
                        <div className={cx('info-house-1')}>
                            <span>Số Toilet</span>
                            <p>{dataHouse.property?.soToilet || 0}</p>
                        </div>
                    </div>
                    <div className={cx('des')}>
                        <div dangerouslySetInnerHTML={{ __html: dataHouse.property?.description }} />
                    </div>
                </div>
            </main>
            <div id="map" className={cx('maps')} ref={mapRef} style={{ height: '600px' }}></div>
        </div>
    );
}

export default DetailHouse;
