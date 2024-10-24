import classNames from 'classnames/bind';
import styles from './Slide2.module.scss';

import Slider from 'react-slick';
import { useState } from 'react';

const cx = classNames.bind(styles);

function Slide2() {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
    };

    const [checkType, setCheckType] = useState(0);

    return (
        <div className={cx('wrapper')}>
            <h2>Phân tích khu vực</h2>
            <div className={cx('btn-search')}>
                <button id={cx(checkType === 0 ? 'active' : '')} onClick={() => setCheckType(0)}>
                    Thành Phố Hà Nội
                </button>
                <button id={cx(checkType === 1 ? 'active' : '')} onClick={() => setCheckType(1)}>
                    Thành Phố Hồ Chí Minh
                </button>
            </div>

            <div>
                <Slider {...settings}>
                    <div>
                        <div className={cx('slide')}>
                            <img
                                src="https://onehousing.vn/image-resize/width=1652,quality=80,format=webp/https://cdn-merchant.vinid.net/images/gallery/omre_mpi/1724820739_Nam_Từ_Liêm.webp"
                                alt=""
                            />
                            <div className={cx('info')}>
                                <h2>Quận Nam Từ Liêm</h2>
                                <span>Thành Phố Hà Nội</span>
                                <p>23.70 - 117.5 triệu /m2</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className={cx('slide')}>
                            <img
                                src="https://onehousing.vn/image-resize/width=1652,quality=80,format=webp/https://cdn-merchant.vinid.net/images/gallery/omre_mpi/1724820739_Nam_Từ_Liêm.webp"
                                alt=""
                            />
                            <div className={cx('info')}>
                                <h2>Quận Nam Từ Liêm</h2>
                                <span>Thành Phố Hà Nội</span>
                                <p>23.70 - 117.5 triệu /m2</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className={cx('slide')}>
                            <img
                                src="https://onehousing.vn/image-resize/width=1652,quality=80,format=webp/https://cdn-merchant.vinid.net/images/gallery/omre_mpi/1724820739_Nam_Từ_Liêm.webp"
                                alt=""
                            />
                            <div className={cx('info')}>
                                <h2>Quận Nam Từ Liêm</h2>
                                <span>Thành Phố Hà Nội</span>
                                <p>23.70 - 117.5 triệu /m2</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className={cx('slide')}>
                            <img
                                src="https://onehousing.vn/image-resize/width=1652,quality=80,format=webp/https://cdn-merchant.vinid.net/images/gallery/omre_mpi/1724820739_Nam_Từ_Liêm.webp"
                                alt=""
                            />
                            <div className={cx('info')}>
                                <h2>Quận Nam Từ Liêm</h2>
                                <span>Thành Phố Hà Nội</span>
                                <p>23.70 - 117.5 triệu /m2</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className={cx('slide')}>
                            <img
                                src="https://onehousing.vn/image-resize/width=1652,quality=80,format=webp/https://cdn-merchant.vinid.net/images/gallery/omre_mpi/1724820739_Nam_Từ_Liêm.webp"
                                alt=""
                            />
                            <div className={cx('info')}>
                                <h2>Quận Nam Từ Liêm</h2>
                                <span>Thành Phố Hà Nội</span>
                                <p>23.70 - 117.5 triệu /m2</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className={cx('slide')}>
                            <img
                                src="https://onehousing.vn/image-resize/width=1652,quality=80,format=webp/https://cdn-merchant.vinid.net/images/gallery/omre_mpi/1724820739_Nam_Từ_Liêm.webp"
                                alt=""
                            />
                            <div className={cx('info')}>
                                <h2>Quận Nam Từ Liêm</h2>
                                <span>Thành Phố Hà Nội</span>
                                <p>23.70 - 117.5 triệu /m2</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className={cx('slide')}>
                            <img
                                src="https://onehousing.vn/image-resize/width=1652,quality=80,format=webp/https://cdn-merchant.vinid.net/images/gallery/omre_mpi/1724820739_Nam_Từ_Liêm.webp"
                                alt=""
                            />
                            <div className={cx('info')}>
                                <h2>Quận Nam Từ Liêm</h2>
                                <span>Thành Phố Hà Nội</span>
                                <p>23.70 - 117.5 triệu /m2</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className={cx('slide')}>
                            <img
                                src="https://onehousing.vn/image-resize/width=1652,quality=80,format=webp/https://cdn-merchant.vinid.net/images/gallery/omre_mpi/1724820739_Nam_Từ_Liêm.webp"
                                alt=""
                            />
                            <div className={cx('info')}>
                                <h2>Quận Nam Từ Liêm</h2>
                                <span>Thành Phố Hà Nội</span>
                                <p>23.70 - 117.5 triệu /m2</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className={cx('slide')}>
                            <img
                                src="https://onehousing.vn/image-resize/width=1652,quality=80,format=webp/https://cdn-merchant.vinid.net/images/gallery/omre_mpi/1724820739_Nam_Từ_Liêm.webp"
                                alt=""
                            />
                            <div className={cx('info')}>
                                <h2>Quận Nam Từ Liêm</h2>
                                <span>Thành Phố Hà Nội</span>
                                <p>23.70 - 117.5 triệu /m2</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className={cx('slide')}>
                            <img
                                src="https://onehousing.vn/image-resize/width=1652,quality=80,format=webp/https://cdn-merchant.vinid.net/images/gallery/omre_mpi/1724820739_Nam_Từ_Liêm.webp"
                                alt=""
                            />
                            <div className={cx('info')}>
                                <h2>Quận Nam Từ Liêm</h2>
                                <span>Thành Phố Hà Nội</span>
                                <p>23.70 - 117.5 triệu /m2</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className={cx('slide')}>
                            <img
                                src="https://onehousing.vn/image-resize/width=1652,quality=80,format=webp/https://cdn-merchant.vinid.net/images/gallery/omre_mpi/1724820739_Nam_Từ_Liêm.webp"
                                alt=""
                            />
                            <div className={cx('info')}>
                                <h2>Quận Nam Từ Liêm</h2>
                                <span>Thành Phố Hà Nội</span>
                                <p>23.70 - 117.5 triệu /m2</p>
                            </div>
                        </div>
                    </div>
                </Slider>
            </div>
        </div>
    );
}

export default Slide2;
