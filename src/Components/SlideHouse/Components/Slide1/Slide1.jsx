import classNames from 'classnames/bind';
import styles from './Slide1.module.scss';

import Slider from 'react-slick';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function Slide1({ dataHouseAll }) {
    const [district, setDistrict] = useState([]);
    const [checkDistrict, setCheckDistrict] = useState('');
    const [checkType, setCheckType] = useState(0);

    const onClickButton = (index, item) => {
        setCheckType(index);
        setCheckDistrict(item);
    };

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
    };

    useEffect(() => {
        let uniqueDistricts;
        if (dataHouseAll.length > 0) {
            const dataDistrict = dataHouseAll.map((item) => item?.property?.district);
            uniqueDistricts = [...new Set(dataDistrict)];
        }

        setDistrict(uniqueDistricts);
    }, [dataHouseAll]);

    return (
        <div className={cx('wrapper')}>
            <h2>Dự án nổi bật</h2>
            <div style={{ display: 'flex', gap: '20px' }}>
                <button className={cx('btn-reset')} id={cx('active')} onClick={() => onClickButton(0, '')}>
                    Tất Cả
                </button>
                {district?.map((item, index) => (
                    <div className={cx('btn-search')}>
                        <button id={cx(checkType === index ? 'active' : '')} onClick={() => onClickButton(index, item)}>
                            Quận {item}
                        </button>
                    </div>
                ))}
            </div>

            <div>
                <Slider {...settings}>
                    {dataHouseAll.length > 0 &&
                        dataHouseAll
                            .filter((item) => item?.property?.district === checkDistrict || checkDistrict === '')
                            .map((item) => (
                                <div>
                                    <div className={cx('slide')}>
                                        <img src={item?.property?.images[0]} alt="" />
                                        <div className={cx('info')}>
                                            <h2>{item?.property?.location}</h2>
                                            <span>{item?.property?.phuong}</span>
                                            <p>{item.property?.price.toLocaleString() + ' VND'}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                </Slider>
            </div>
        </div>
    );
}

export default Slide1;
