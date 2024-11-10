import classNames from 'classnames/bind';
import styles from './HouseMe.module.scss';

import { useEffect, useState } from 'react';
import { requestGetBDSByUserId } from '../../../../Config';
import CreateBDS from '../../Modal/ModalCreateBlog';
import { ToastContainer } from 'react-toastify';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import ModalEdit from '../../Modal/ModalEdit';
const cx = classNames.bind(styles);

function HouseMe() {
    const [dataBDS, setDataBDS] = useState([]);
    const navigate = useNavigate();
    const [showModalShowModalCreateBDS, setShowModalCreateBDS] = useState(false);
    const [dataCreateBDS, setDataCreateBDS] = useState({});

    const [showModalEdit, setShowModalEdit] = useState(false);
    const [dataEditBlog, setDataEditBlog] = useState({});

    const onShowModalCreateBDS = (data) => {
        setDataCreateBDS(data);
        setShowModalCreateBDS(true);
    };

    const userId = Cookies.get('userId');

    const handleViewDetails = (id) => {
        window.open(`/house/${id}`, '_blank'); // Mở trang chi tiết trong tab mới
    };

    const handleShowModal = (data) => {
        setShowModalEdit(true);
        setDataEditBlog(data);
    };

    useEffect(() => {
        const fetchData = async () => {
            const res = await requestGetBDSByUserId(userId);
            setDataBDS(res);
        };
        fetchData();
    }, [showModalEdit, dataCreateBDS]);

    return (
        <div className={cx('wrapper')}>
            <ToastContainer />
            <h4>Căn bán cho MasterHome</h4>
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
                                <td>
                                    <span
                                        onClick={() => handleViewDetails(house.propertyId)}
                                        onContextMenu={(e) => {
                                            e.preventDefault();
                                            window.open(`/house/${house.propertyId}`, '_blank');
                                        }}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        {house.title}
                                    </span>
                                </td>
                                <td>
                                    <div
                                        style={{ height: '100px', overflowY: 'scroll' }}
                                        dangerouslySetInnerHTML={{ __html: house.description }}
                                    ></div>
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

                                    <button
                                        onClick={() => handleShowModal(house)}
                                        type="button"
                                        className="btn btn-warning mt-3"
                                        style={{ width: '100%', padding: '10px' }} // Cải thiện kích thước và hiển thị
                                    >
                                        Chỉnh sửa
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <ModalEdit show={showModalEdit} setShow={setShowModalEdit} data={dataEditBlog} />
            <CreateBDS show={showModalShowModalCreateBDS} setShow={setShowModalCreateBDS} data={dataCreateBDS} />
        </div>
    );
}

export default HouseMe;
