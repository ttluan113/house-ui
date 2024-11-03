import classNames from 'classnames/bind';
import styles from './DetailHouse.module.scss';
import Header from '../../Components/Header/Header';
import { useEffect, useState, useRef } from 'react';
import { requestGetSingleProperty, requestGetUniversities, requestGetHospitals } from '../../Config';
import { useParams } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';

import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { Tabs, Tab } from '@mui/material';

const cx = classNames.bind(styles);

function DetailHouseBDS() {
    const { id } = useParams();
    const [dataHouse, setDataHouse] = useState({});
    const [activeBtn, setActiveBtn] = useState(0);
    const mapRef = useRef(null);
    const [dataUtils, setDataUtils] = useState([]);
    const [tabIndex, setTabIndex] = useState(0); // 0: Universities, 1: Hospitals
    const mapInstance = useRef(null); // Store the map instance

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await requestGetSingleProperty(id);
                console.log(res);
                setDataHouse(res);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [id]);

    useEffect(() => {
        const fetchUtilities = async () => {
            if (dataHouse?.propertyId) {
                try {
                    let utils;
                    if (tabIndex === 0) {
                        utils = await requestGetUniversities(dataHouse.propertyId);
                    } else {
                        utils = await requestGetHospitals(dataHouse.propertyId);
                    }
                    setDataUtils(utils);
                } catch (error) {
                    console.error('Error fetching utilities:', error);
                }
            }
        };
        fetchUtilities();
    }, [tabIndex, dataHouse]);

    useEffect(() => {
        if (dataHouse?.lat && dataHouse?.lon && !mapInstance.current) {
            const map = L.map(mapRef.current, {
                center: [dataHouse.lat, dataHouse.lon],
                zoom: 17,
                minZoom: 15,
                maxZoom: 20,
                scrollWheelZoom: false,
            });

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            }).addTo(map);

            L.marker([dataHouse.lat, dataHouse.lon])
                .addTo(map)
                .bindPopup(dataHouse?.location || 'Vị trí căn nhà')
                .openPopup();

            mapInstance.current = map;

            // Cleanup on unmount
            return () => {
                mapInstance.current.remove();
                mapInstance.current = null;
            };
        }
    }, [dataHouse]);

    useEffect(() => {
        document.title = `${dataHouse?.title || 'Chi tiết nhà'}`;
    }, [dataHouse]);

    // Code sắp xếp hình ảnh
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
            const resolutions = await Promise.all(dataHouse.images.map((img) => getImageResolution(img)));

            const maxResImage = resolutions.reduce((max, current) =>
                current.resolution > max.resolution ? current : max,
            );

            setLargestImage(maxResImage.src);
        };

        if (dataHouse.images?.length) findLargestImage();
    }, [dataHouse.images]);

    const handleTabChange = (event, newValue) => {
        setTabIndex(newValue);
    };

    return (
        <div className={cx('wrapper')}>
            <header>
                <Header />
            </header>

            <main className={cx('main')}>
                <div className={cx('img-detail')}>
                    <div className={cx('img-big')}>{largestImage && <img src={largestImage} alt="big-img" />}</div>

                    {dataHouse.images?.length > 1 && (
                        <div className={cx('img-small')}>
                            {dataHouse.images
                                .filter((img) => img !== largestImage) // Exclude largest image from thumbnails
                                .map((img, index) => (
                                    <img key={index} src={img} alt={`img-${index}`} />
                                ))}
                        </div>
                    )}
                </div>

                <div className={cx('btn-detail')}>
                    <button onClick={() => setActiveBtn(0)} className={cx({ 'active-button': activeBtn === 0 })}>
                        Giá Bán
                    </button>
                    <button onClick={() => setActiveBtn(1)} className={cx({ 'active-button': activeBtn === 1 })}>
                        Tiện ích
                    </button>
                </div>

                <div className={cx('info-house')}>
                    <h2 style={{ color: '#000' }}>{dataHouse.title}</h2>
                    <div className={cx('info-detail-house')}>
                        <div className={cx('column-detail')}>
                            <div className={cx('info-house-1')}>
                                <span>Giá Bán</span>
                                <p>{Number(dataHouse?.price).toLocaleString()} VND</p>
                            </div>
                            <div className={cx('info-house-1')}>
                                <span>Địa Chỉ</span>
                                <p>{`${dataHouse?.location || ''} - ${dataHouse?.phuong || ''} - ${
                                    dataHouse?.district || ''
                                } - ${dataHouse?.province || ''}`}</p>
                            </div>
                            <div className={cx('info-house-1')}>
                                <span>Số Phòng</span>
                                <p>{dataHouse?.sophong || 0}</p>
                            </div>
                            <div className={cx('info-house-1')}>
                                <span>Số Tầng</span>
                                <p>{dataHouse?.soTang || 0}</p>
                            </div>
                            <div className={cx('info-house-1')}>
                                <span>Số Toilet</span>
                                <p>{dataHouse?.soToilet || 0}</p>
                            </div>
                        </div>

                        <div className={cx('des')}>
                            <h4>Mô Tả Căn Nhà</h4>
                            <div dangerouslySetInnerHTML={{ __html: dataHouse?.description }} />
                        </div>
                    </div>

                    <div className={cx('utils')}>
                        <div
                            id="map"
                            className={cx('maps')}
                            ref={mapRef}
                            style={{ width: '100%', height: '600px' }}
                        ></div>

                        <Tabs value={tabIndex} onChange={handleTabChange} centered>
                            <Tab label="Trường học" />
                            <Tab label="Bệnh viện" />
                        </Tabs>

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

export default DetailHouseBDS;
