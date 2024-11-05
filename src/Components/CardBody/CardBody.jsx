import classNames from 'classnames/bind';
import styles from './CardBody.module.scss';

import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown, faLayerGroup, faLocationArrow, faSackDollar, faHeart } from '@fortawesome/free-solid-svg-icons';
import { faFontAwesome } from '@fortawesome/free-regular-svg-icons';
import { requestGetHouseHeart, requestHeartHouse } from '../../Config';
import decodedJWT from '../../utils/decodeJWT';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const cx = classNames.bind(styles);

function CardBody({ house, isFavorite }) {
    const token = decodedJWT();
    const [dataFavorite, setDataFavorite] = useState([]);

    const handleHeartHouse = async (postId) => {
        const data = { postId, userId: token?.userId };
        const res = await requestHeartHouse(data);

        if (res.status === 201) {
            toast.success('Đã thêm vào yêu thích');
            setDataFavorite((prev) => [...prev, postId]); // Add postId to favorites
        } else {
            toast.error('Đã có lỗi xảy ra');
        }
    };

    const calculateDaysRemaining = (createdAt) => {
        const createdDate = new Date(createdAt);
        createdDate.setHours(0, 0, 0, 0);
        const expiryDate = new Date(createdDate);
        expiryDate.setDate(expiryDate.getDate() + 30);
        expiryDate.setHours(0, 0, 0, 0);
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        const timeDiff = expiryDate - currentDate;
        const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24));
        return daysRemaining < 0 ? 0 : daysRemaining;
    };

    const [largestImage, setLargestImage] = useState(null);
    const getImageResolution = (src) => {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve({ src, resolution: img.width * img.height });
            img.src = src;
        });
    };

    useEffect(() => {
        const findLargestImage = async () => {
            const resolutions = await Promise.all(house.property.images.map((img) => getImageResolution(img)));
            const maxResImage = resolutions.reduce((max, current) =>
                current.resolution > max.resolution ? current : max,
            );
            setLargestImage(maxResImage.src);
        };

        if (house?.property?.images.length) findLargestImage();
    }, [house]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await requestGetHouseHeart(token?.userId);
            const postId = res.map((item) => item?.postId);
            setDataFavorite(postId);
        };
        if (!token) {
            return;
        }
        fetchData();
    }, [token?.userId]);

    return (
        <div className={cx('wrapper')} id={cx(house.charged === 1 ? 'border-charged' : '')}>
            <ToastContainer />
            <Link to={`/post/${house?.postId}`}>
                <div className={cx('slide')}>
                    <div className={cx('img')}>
                        <img src={largestImage} alt="" />
                    </div>
                </div>
            </Link>

            <div className={cx('info-home')}>
                {house?.charged === 1 ? (
                    <span id={cx('blog-charged')}>
                        <FontAwesomeIcon icon={faCrown} />
                        Tin được tài trợ
                    </span>
                ) : (
                    <></>
                )}
                <div className={cx('title-home')}>
                    <h4>{house.postTitle}</h4>
                    <button onClick={() => handleHeartHouse(house?.postId)}>
                        <FontAwesomeIcon
                            icon={faHeart}
                            style={{ color: dataFavorite.includes(house?.postId) ? 'red' : 'gray' }}
                        />
                    </button>
                </div>
                <div className={cx('info-home')}>
                    <span>
                        <FontAwesomeIcon style={{ color: '#007aff' }} icon={faFontAwesome} />
                        {`${house.postType === 'for_sale' ? 'Đăng Bán' : 'Cho Thuê'}`}
                    </span>
                    <span>
                        <FontAwesomeIcon style={{ color: '#007aff' }} icon={faSackDollar} />
                        {Number(house?.price).toLocaleString()} VNĐ
                    </span>
                    <span>
                        <FontAwesomeIcon style={{ color: '#007aff' }} icon={faLayerGroup} />
                        {`Diện Tích : ${house.property.area} m²`}
                    </span>
                    <span>
                        <FontAwesomeIcon style={{ color: '#007aff' }} icon={faLocationArrow} />
                        {`${house.property.phuong} - ${house.property.location} - ${house.property.district} - ${house.property.province}`}
                    </span>
                    <span>
                        <strong>{calculateDaysRemaining(house.createdAt)} ngày còn lại</strong>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default CardBody;
