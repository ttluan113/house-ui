import classNames from 'classnames/bind';
import styles from './ManagerBDS.module.scss';
import { useEffect, useState } from 'react';
import { requestGetBDS } from '../../../../Config';

const cx = classNames.bind(styles);

function ManagerBDS() {
    const [dataBDS, setDataBDS] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await requestGetBDS();
            setDataBDS(res);
        };
        fetchData();
    }, []);

    return (
        <div className={cx('wrapper')}>
            <h4>Danh sách BDS</h4>
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
                        </tr>
                    </thead>
                    <tbody>
                        {dataBDS.map((house) => (
                            <tr>
                                <td>
                                    <img style={{ width: '150px' }} src={house.images} alt="" />
                                </td>
                                <td>{house.title}</td>
                                <td>
                                    <div dangerouslySetInnerHTML={{ __html: house.description }}></div>
                                </td>
                                <td>{Number(house.price).toLocaleString()} VND</td>
                                <td>
                                    {house.location} - {house.phuong} - {house.district} - {house.province}
                                </td>
                                <td>{house.sophong || 'Chưa Có'}</td>
                                <td>{house.soTang || 'Chưa Có'}</td>
                                <td>{house.soToilet || 'Chưa Có'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ManagerBDS;
