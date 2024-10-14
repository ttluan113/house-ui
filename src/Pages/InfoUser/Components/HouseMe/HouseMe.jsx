import classNames from 'classnames/bind';
import styles from './HouseMe.module.scss';

import { useEffect, useState } from 'react';
import { requestGetBDS } from '../../../../Config';
import CreateBDS from '../../Modal/ModalCreateBlog';

const cx = classNames.bind(styles);

function HouseMe() {
    const [dataBDS, setDataBDS] = useState([]);

    const [showModalShowModalCreateBDS, setShowModalCreateBDS] = useState(false);
    const [dataCreateBDS, setDataCreateBDS] = useState({});

    const onShowModalCreateBDS = (data) => {
        setDataCreateBDS(data);
        setShowModalCreateBDS(true);
    };

    useEffect(() => {
        const fetchData = async () => {
            const res = await requestGetBDS();
            setDataBDS(res);
        };
        fetchData();
    }, []);

    return (
        <div className={cx('wrapper')}>
            <h4>Căn bán cho OneHousing</h4>
            <div>
                <table className="table table-bordered border-primary">
                    <thead>
                        <tr>
                            <th scope="col">Ảnh</th>
                            <th scope="col">Tiêu Đề</th>
                            <th scope="col">Mô Tả</th>
                            <th scope="col">Giá</th>
                            <th scope="col">Địa chỉ</th>
                            <th scope="col">Số Phòng</th>
                            <th scope="col">Số Tầng</th>
                            <th scope="col">Số Phòng Toilet</th>
                            <th scope="col">Hành Động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataBDS.map((house, index) => (
                            <tr key={index}>
                                <td>
                                    <img
                                        style={{ width: '150px' }}
                                        src={house.images[0]}
                                        alt={`Hình ảnh của ${house.title}`}
                                    />
                                </td>
                                <td>{house.title}</td>
                                <td>
                                    <div dangerouslySetInnerHTML={{ __html: house.description }}></div>
                                </td>
                                <td>{Number(house.price).toLocaleString()} VND</td>
                                <td>
                                    {house.location}, {house.phuong}, {house.district}, {house.province}
                                </td>
                                <td>{house.sophong ? house.sophong : 'Chưa Có'}</td>
                                <td>{house.soTang ? house.soTang : 'Chưa Có'}</td>
                                <td>{house.soToilet ? house.soToilet : 'Chưa Có'}</td>
                                <td>
                                    <button
                                        onClick={() => onShowModalCreateBDS(house)}
                                        type="button"
                                        className="btn btn-primary"
                                        style={{ width: '100%', padding: '10px' }} // Cải thiện kích thước và hiển thị
                                    >
                                        Tạo Bài Đăng
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <CreateBDS show={showModalShowModalCreateBDS} setShow={setShowModalCreateBDS} data={dataCreateBDS} />
        </div>
    );
}

export default HouseMe;
