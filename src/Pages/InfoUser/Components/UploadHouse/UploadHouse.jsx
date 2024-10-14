import classNames from 'classnames/bind';
import styles from './UploadHouse.module.scss';
import { useState } from 'react';
const cx = classNames.bind(styles);
function UploadHouse() {
    const [postTitle, setPostTitle] = useState('');

    const [postContent, setPostContent] = useState('');

    const [price, setPrice] = useState(0);

    const handlePostHouse = async () => {};

    return (
        <div className={cx('wrapper')}>
            <h3>Đăng Bán Nhà</h3>
            <div className="form-floating mb-3">
                <input
                    type="email"
                    className="form-control"
                    id="floatingInput"
                    placeholder="name@example.com/"
                    onChange={(e) => setPostTitle(e.target.value)}
                />
                <label htmlFor="floatingInput">Tiêu Đề</label>
            </div>
            <div className="form-floating mb-3">
                <input
                    type="email"
                    className="form-control"
                    id="floatingInput"
                    placeholder="name@example.com/"
                    onChange={(e) => setPostContent(e.target.value)}
                />
                <label htmlFor="floatingInput">Mô Tả</label>
            </div>

            <div className="form-floating mb-3">
                <input
                    type="email"
                    className="form-control"
                    id="floatingInput"
                    placeholder="name@example.com/"
                    onChange={(e) => setPrice(e.target.value)}
                />
                <label htmlFor="floatingInput">Giá Nhà</label>
            </div>

            <button onClick={handlePostHouse} type="button" className="btn btn-primary">
                Đăng Bán
            </button>
        </div>
    );
}

export default UploadHouse;
