import classNames from 'classnames/bind';
import styles from './ManagerBlog.module.scss';
import { requestGetStatusHouse, requestUpdateStatus } from '../../../../Config';

import { useState, useEffect } from 'react';

const cx = classNames.bind(styles);

function ManagerBlog() {
    const [dataBDS, setDataBDS] = useState([]);

    const handleSuccessBlog = async (id) => {
        const res = await requestUpdateStatus(id);
        const updatedData = await requestGetStatusHouse();
        setDataBDS(updatedData || []);
    };

    useEffect(() => {
        const fetchData = async () => {
            const res = await requestGetStatusHouse();
            setDataBDS(res || []);
        };
        fetchData();
    }, []);
    return (
        <div className={cx('wrapper')}>
            <div>
                <table className="table table-bordered border-primary">
                    <thead>
                        <tr>
                            <th scope="col">Ảnh</th>
                            <th scope="col">Tiêu Đề</th>
                            <th scope="col">Mô Tả</th>
                            <th scope="col">Giá</th>
                            <th scope="col">Loại Bài Đăng</th>
                            <th scope="col">Trạng Thái</th>
                            <th scope="col">Hành Động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataBDS.map((house) => (
                            <tr>
                                <td>
                                    <img
                                        style={{ width: '200px' }}
                                        src="https://onehousing.vn/image-resize/width=384,quality=80,format=webp/https://cdn.onehousing.vn/media/RESIDENTIAL/f67f6222-594e-4ff6-bb6f-7b5c60a74894/2c9429d891db5f1d019203c28ad918ca_CLONE/LOCAL_STREET/image_picker_7CF1C09C-80C2-47DD-A776-AEC94CE2DC33-27550-000011E647CC38EC_1726640360704.jpg"
                                        alt=""
                                    />
                                </td>
                                <td>{house.postTitle}</td>
                                <td>{house.postContent}</td>
                                <td>{Number(house.price).toLocaleString()} VND</td>
                                <td>{house.charged === 0 ? 'Miễn Phí' : 'Mất Phí'}</td>
                                <td>{house.status}</td>
                                <td>
                                    <button
                                        onClick={() => handleSuccessBlog(house.postId)}
                                        type="button"
                                        className="btn btn-primary"
                                    >
                                        Duyệt Tin
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ManagerBlog;
