import classNames from 'classnames/bind';
import styles from './DetailHouse.module.scss';
import Header from '../../Components/Header/Header';
import { useEffect, useState, useRef } from 'react';
import { requestGetOneHouse, requestGetUtils } from '../../Config';
import { useParams } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';

import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

const cx = classNames.bind(styles);

function DetailHouse() {
    const { id } = useParams();
    const [dataHouse, setDataHouse] = useState({});
    const [activeBtn, setActiveBtn] = useState(0);
    const mapRef = useRef(null); // Tham chiếu đến thẻ chứa bản đồ
    const [dataUtils, setDatautils] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await requestGetOneHouse(id);
            setDataHouse(res);
            if (res.property.lon === null || res.property.lat === null) {
                return;
            }
            const dataUtils = await requestGetUtils(res?.property?.propertyId);
            setDatautils(dataUtils);
        };
        fetchData();
    }, [id]);

    useEffect(() => {
        if (dataHouse?.property?.lat && dataHouse?.property?.lon) {
            const map = L.map(mapRef.current, {
                center: [dataHouse?.property?.lat, dataHouse?.property?.lon],
                zoom: 17, // Default zoom level
                minZoom: 15, // Minimum zoom level
                maxZoom: 20, // Maximum zoom level
                scrollWheelZoom: false, // Disable zoom by scrolling
            });

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            }).addTo(map);

            L.marker([dataHouse?.property?.lat, dataHouse?.property?.lon])
                .addTo(map)
                .bindPopup(dataHouse?.property?.location || 'Vị trí căn nhà')
                .openPopup();

            // Cleanup when the component unmounts
            return () => map.remove();
        } else {
            console.warn('Latitude or Longitude is missing, map will not be initialized.');
        }
    }, [dataHouse]);

    useEffect(() => {
        document.title = `${dataHouse?.postTitle || 'Chi tiết nhà'}`;
        console.log(dataHouse);
    }, [dataHouse]);

    // sap xep
    const [largestImage, setLargestImage] = useState(null);
    const getImageResolution = (src) => {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve({ src, resolution: img.width * img.height });
            img.src = src;
        });
    };

    // Find the image with the largest resolution
    useEffect(() => {
        const findLargestImage = async () => {
            const resolutions = await Promise.all(dataHouse.property.images.map((img) => getImageResolution(img)));

            const maxResImage = resolutions.reduce((max, current) =>
                current.resolution > max.resolution ? current : max,
            );

            setLargestImage(maxResImage.src);
        };

        if (dataHouse?.property?.images.length) findLargestImage();
    }, [dataHouse?.property?.images]);

    return (
        <div className={cx('wrapper')}>
            <header>
                <Header />
            </header>

            <main className={cx('main')}>
                {dataHouse?.charged === 1 && <h5>Tin được tài trợ bởi : MasterHouse</h5>}
                <div className={cx('img-detail')}>
                    <div className={cx('img-big')}>{largestImage && <img src={largestImage} alt="big-img" />}</div>

                    {dataHouse?.property?.images.length > 1 && (
                        <div className={cx('img-small')}>
                            {dataHouse?.property?.images
                                .filter((img) => img !== largestImage) // Exclude largest image from thumbnails
                                .map((img, index) => (
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
                    <div className={cx('info-detail-house')}>
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
                            <h4>Mô Tả Căn Nhà</h4>
                            <div dangerouslySetInnerHTML={{ __html: dataHouse.property?.description }} />
                        </div>
                    </div>
                    <div className={cx('utils')}>
                        <div
                            id="map"
                            className={cx('maps')}
                            ref={mapRef}
                            style={{ width: '100%', height: '600px' }}
                        ></div>

                        <div className={cx('list-utils')}>
                            {dataUtils?.map((data, index) => (
                                <Box key={index} sx={{ '& > legend': { mt: 2 } }} className={cx('utility-item')}>
                                    <Typography component="legend">{data?.utilityName}</Typography>
                                    <Rating name="read-only" value={5} readOnly />
                                </Box>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default DetailHouse;
