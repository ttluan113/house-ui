import classNames from 'classnames/bind';
import styles from './CardBody.module.scss';

import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown, faLayerGroup, faLocationArrow, faSackDollar } from '@fortawesome/free-solid-svg-icons';
import { faFontAwesome, faHeart } from '@fortawesome/free-regular-svg-icons';
import { requestHeartHouse } from '../../Config';
import decodedJWT from '../../utils/decodeJWT';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const cx = classNames.bind(styles);

function CardBody({ house }) {
    const token = decodedJWT();

    const handleHeartHouse = async (postId) => {
        const data = { postId, userId: token?.userId };
        const res = await requestHeartHouse(data);
        if (res.status === 201) {
            toast.success('Đã thêm vào yêu thích');
        } else {
            toast.error('Đã có lỗi xảy ra');
        }
    };

    const calculateDaysRemaining = (createdAt) => {
        console.log(createdAt);
        const createdDate = new Date(createdAt);
        const expiryDate = new Date(createdDate.setDate(createdDate.getDate() + 30)); // Thêm 30 ngày
        const currentDate = new Date();
        const timeDiff = expiryDate - currentDate; // Tính chênh lệch thời gian
        const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24)); // Chuyển đổi từ milliseconds sang ngày
        return daysRemaining < 0 ? 0 : daysRemaining; // Trả về 0 nếu đã quá hạn
    };

    return (
        <div className={cx('wrapper')} id={cx(house.charged === 1 ? 'border-charged' : '')}>
            <ToastContainer />
            <Link to={`/bds/${house?.postId}`}>
                <div className={cx('slide')}>
                    <div className={cx('img')}>
                        <img src={house?.property?.images[0]} alt="" />
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
                        <FontAwesomeIcon icon={faHeart} />
                    </button>
                </div>
                <div className={cx('info-home')}>
                    <span>
                        <FontAwesomeIcon style={{ color: '#007aff' }} icon={faFontAwesome} />
                        {`${house.postType === 'for_sale' ? 'Đăng Bán' : 'Cho Thuê'}`}
                    </span>

                    <span>
                        <FontAwesomeIcon style={{ color: '#007aff' }} icon={faSackDollar} />{' '}
                        {Number(house?.price).toLocaleString()} VNĐ
                    </span>

                    <span>
                        <FontAwesomeIcon style={{ color: '#007aff' }} icon={faLayerGroup} />
                        {`Diện Tích : ${house.property.area} m²`}
                    </span>

                    <span>
                        <FontAwesomeIcon style={{ color: '#007aff' }} icon={faLocationArrow} />
                        {`${house.property.phuong} - ${house.property.location} - ${house.property.district}  - ${house.property.province}`}
                    </span>

                    {/* Hiển thị số ngày còn lại */}
                    <span>
                        <strong>{calculateDaysRemaining(house.createdAt)} ngày còn lại</strong>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default CardBody;
