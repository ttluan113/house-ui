import classNames from 'classnames/bind';
import styles from './ManagerUtils.module.scss';
import { useEffect, useState } from 'react';
import { requestGetAllUtils } from '../../../../Config';

import Button from '@mui/material/Button';

const cx = classNames.bind(styles);

function ManagerUtils() {
    const [dataUtils, setDataUtils] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await requestGetAllUtils();
            setDataUtils(res);
        };
        fetchData();
    }, []);

    console.log(dataUtils);

    return (
        <div className={cx('wrapper')}>
            <h4>Quản Lý Tiện Ích</h4>
            <table class="table table-bordered border-primary">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Tên Tiện Ích</th>
                        <th scope="col">Địa Chỉ </th>
                        <th scope="col">Hành Động</th>
                    </tr>
                </thead>
                <tbody>
                    {dataUtils.map((data) => (
                        <tr>
                            <th scope="row">{data.utilityId}</th>
                            <td>
                                {data.utilityTypeId === 1
                                    ? 'Trường Học'
                                    : data.utilityTypeId === 2
                                    ? 'Bệnh Viện'
                                    : data.utilityTypeId === 3
                                    ? 'Công Viên'
                                    : data.utilityTypeId === 4
                                    ? 'Hồ'
                                    : ''}
                            </td>
                            <td>
                                {data.location} - {data.phuong} - {data.province}
                            </td>
                            <td>
                                <Button color="error" variant="contained">
                                    Xóa Tiện Ích
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ManagerUtils;
