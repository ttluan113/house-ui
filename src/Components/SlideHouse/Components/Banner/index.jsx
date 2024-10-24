import classNames from 'classnames/bind';
import styles from './index.module.scss';
const cx = classNames.bind(styles);

import imgGif1 from '../../../../assets/img/banner-gif-1.gif';
import imgGif2 from '../../../../assets/img/banner-gif-2.gif';
import imgGif3 from '../../../../assets/img/banner-gif-3.gif';
import imgGif4 from '../../../../assets/img/banner-gif-4.webp';

function Banner() {
    return (
        <div className={cx('wrapper')}>
            <div>
                <h2>Mua nhà toàn diện cùng OneHousing</h2>
            </div>

            <div>
                <div className={cx('box')}>
                    <img src={imgGif1} alt="" />
                    <span>Dự án từ chủ đầu tư hàng đầu Việt Nam</span>
                    <p>Nguồn hàng Bất động sản từ những chủ đầu tư hàng đầu thị trường</p>
                </div>

                <div className={cx('box')}>
                    <img src={imgGif3} alt="" />
                    <span>Chuyên gia giàu kinh nghiệm</span>
                    <p>Đội ngũ chuyên gia nhiều năm kinh nghiệm trong lĩnh vực bất động sản</p>
                </div>
            </div>

            <div style={{ marginTop: '30px' }}>
                <div className={cx('box')}>
                    <img src={imgGif2} alt="" />
                    <span>Đối tác tài chính uy tín</span>
                    <p>
                        Là đối tác chiến lược của Techcombank, mang lại các giải pháp tài chính giúp hành trình mua nhà
                        dễ dàng hơn
                    </p>
                </div>

                <div className={cx('box')}>
                    <img src={imgGif4} alt="" />
                    <span>Cảm hứng sống chất</span>
                    <p>Truyền cảm hứng biến mọi ngôi nhà thành tổ ấm</p>
                </div>
            </div>
        </div>
    );
}

export default Banner;
