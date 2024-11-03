import classNames from 'classnames/bind';
import styles from './DetailHouse.module.scss';
import Header from '../../Components/Header/Header';
import { useEffect, useState, useRef } from 'react';
import { requestGetOneHouse, requestGetUniversities, requestGetHospitals } from '../../Config';
import { useParams } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import { Box, Typography, Rating, Tabs, Tab } from '@mui/material';
// import ChatModal from './ChatModal.jsx';
const cx = classNames.bind(styles);

function DetailHouse() {
    const { id } = useParams();
    const [dataHouse, setDataHouse] = useState({});
    const [activeBtn, setActiveBtn] = useState(0);
    const mapRef = useRef(null);
    const [dataUtils, setDataUtils] = useState([]);
    const [tabIndex, setTabIndex] = useState(0); // 0: Trường học, 1: Bệnh viện

    const handleTabChange = (event, newValue) => {
        setTabIndex(newValue);
    };

    // Fetch house data
    useEffect(() => {
        const fetchHouseData = async () => {
            try {
                const data = await requestGetOneHouse(id);
                console.log(data);
                setDataHouse(data);
            } catch (error) {
                console.error('Error fetching house data:', error);
            }
        };

        if (id) {
            fetchHouseData();
        }
    }, [id]);

    // Fetch utilities based on tab index
    useEffect(() => {
        const fetchUtilities = async () => {
            if (!dataHouse?.property?.propertyId) {
                console.warn('Property ID is missing, cannot fetch utilities.');
                return;
            }

            try {
                let data;

                console.log('Fetching utilities for tabIndex:', tabIndex);
                if (tabIndex === 0) {
                    console.log('Requesting universities for propertyId:', dataHouse.property.propertyId);
                    data = await requestGetUniversities(dataHouse.property.propertyId);
                } else {
                    console.log('Requesting hospitals for propertyId:', dataHouse.property.propertyId);
                    data = await requestGetHospitals(dataHouse.property.propertyId);
                }

                console.log(data);
                setDataUtils(data);
            } catch (error) {
                console.error('Error fetching utilities:', error);
            }
        };

        fetchUtilities();
    }, [tabIndex, dataHouse]); // Depend on dataHouse instead of id

    // Initialize map
    useEffect(() => {
        if (dataHouse?.property?.lat && dataHouse?.property?.lon) {
            const map = L.map(mapRef.current, {
                center: [dataHouse.property.lat, dataHouse.property.lon],
                zoom: 16,
                minZoom: 15,
                maxZoom: 20,
                scrollWheelZoom: false,
            });

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            }).addTo(map);

            // Marker for house
            L.marker([dataHouse.property.lat, dataHouse.property.lon])
                .addTo(map)
                .bindPopup(dataHouse.property.location || 'Vị trí căn nhà')
                .openPopup();

            // Add markers for utilities
            dataUtils.forEach((utility) => {
                const icon =
                    tabIndex === 0
                        ? L.icon({ iconUrl: '/markers/university_nbg.png', iconSize: [35, 50] })
                        : L.icon({ iconUrl: '/markers/hospital_nbg.png', iconSize: [35, 50] });

                L.marker([utility.lat, utility.lon], { icon }).addTo(map).bindPopup(utility.utilityName);
            });

            // Cleanup when the component unmounts
            return () => map.remove();
        } else {
            console.warn('Latitude or Longitude is missing, map will not be initialized.');
        }
    }, [dataHouse, dataUtils, tabIndex]);

    useEffect(() => {
        document.title = `${dataHouse?.postTitle || 'Chi tiết nhà'}`;
        console.log(dataHouse);
    }, [dataHouse]);

    // Handle largest image selection
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
                                .filter((img) => img !== largestImage)
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
                <Button onClick={() => setChatOpen(true)} variant="outlined" color="primary">
                    Chat with Author
                </Button>

                {/* Chat Modal */}
                {/* <ChatModal
                    open={chatOpen}
                    onClose={() => setChatOpen(false)}
                    currentUserId={currentUserId}
                    postAuthorId={postAuthorId}
                /> */}
            </main>
        </div>
    );
}

export default DetailHouse;
