import classNames from 'classnames/bind';
import styles from './Footer.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLink, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);

function Footer() {
    return (
        <div className={cx('wrapper')}>
            <div>
                <ul>
                    <span id={cx('logo')}>MasterHome</span>
                    <li style={{ color: 'black' }}>
                        <FontAwesomeIcon icon={faLocationDot} />
                        Tầng 1, Tòa văn phòng T26, KĐT Times City, 458 Minh Khai, Phường Vĩnh Tuy, Quận Hai Bà Trưng,
                        Thành phố Hà Nội
                    </li>
                    <li style={{ color: 'black' }}>
                        <FontAwesomeIcon icon={faEnvelope} />
                        Hotline: 1800 646 466
                    </li>

                    <li style={{ color: 'black' }}>
                        <FontAwesomeIcon icon={faPhone} />
                        SĐT doanh nghiệp: 02471056788
                    </li>
                </ul>
            </div>

            <div>
                <ul>
                    <span id={cx('item-1')}>Dịch vụ</span>
                    <li>Tư vấn bán</li>
                    <li>Vay thế chấp</li>
                    <li>Định giá căn nhà</li>
                    <li>Thông tin dự án</li>
                </ul>
            </div>

            <div>
                <ul>
                    <span id={cx('item-1')}>Cửa Sổ BĐ </span>
                    <li>Phân tích thị trường</li>
                    <li>Dự án</li>
                    <li>Giải pháp tài chính</li>
                    <li>Nghề BĐS</li>
                </ul>
            </div>

            <div>
                <ul>
                    <span id={cx('item-1')}>Chính sách sàn thương mại điện tử</span>
                    <li>Quy chế hoạt động website cung cấp dịch vụ thương mại điện tử</li>
                    <li>Điều khoản và điều kiện giao dịch</li>
                    <li>Chính sách bảo vệ và xử lý dữ liệu</li>
                    <li>Điều khoản và điều kiện chung dịch vụ môi giới bán tài sản</li>
                </ul>
            </div>

            <div>
                <ul>
                    <span id={cx('item-1')}>Cửa Sổ BĐ </span>
                    <li>Phân tích thị trường</li>
                    <li>Dự án</li>
                    <li>Giải pháp tài chính</li>
                    <li>Nghề BĐS</li>
                </ul>
            </div>

            <div>
                <ul>
                    <span id={cx('item-1')}>Dịch vụ</span>
                    <li>Tư vấn bán</li>
                    <li>Vay thế chấp</li>
                    <li>Định giá căn nhà</li>
                    <li>Thông tin dự án</li>
                </ul>
            </div>
        </div>
    );
}

export default Footer;
