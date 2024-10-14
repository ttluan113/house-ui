import classNames from 'classnames/bind';
import styles from './CardBody.module.scss';

import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Slider from 'react-slick';
import { faLayerGroup, faLocationArrow, faSackDollar } from '@fortawesome/free-solid-svg-icons';
import { faFontAwesome, faHeart } from '@fortawesome/free-regular-svg-icons';
import { requestHeartHouse } from '../../Config';
import decodedJWT from '../../utils/decodeJWT';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const cx = classNames.bind(styles);

function CardBody({ house }) {
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
    };

    const token = decodedJWT();

    const handleHeartHouse = async (postId) => {
        const data = { postId, userId: token?.userId };
        const res = await requestHeartHouse(data);
        if (res.status === 201) {
            toast.success('Đã thêm vào yêu thích');
        } else {
            toast.error('Đã có lỗi xảy ra');
        }
    };

    return (
        <div className={cx('wrapper')}>
            <ToastContainer />
            <Link to={`/bds/${house?.postId}`}>
                <div className={cx('slide')}>
                    <Slider {...settings}>
                        {house?.property?.images.map((img) => (
                            <div className={cx('img')}>
                                <img src={img} alt="" />
                            </div>
                        ))}
                    </Slider>
                </div>
            </Link>

            <div className={cx('info-home')}>
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
                </div>
            </div>
        </div>
    );
}

export default CardBody;
