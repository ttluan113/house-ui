import classNames from 'classnames/bind';
import styles from './ManagerStatusBDS.module.scss';
import { useEffect, useState } from 'react';
import { requestGetStatusHouse } from '../../../../Config';

const cx = classNames.bind(styles);

function ManagerStatusBDS() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await requestGetStatusHouse();
            setData(res);
        };
        fetchData();
    }, []);

    return <div className={cx('wrapper')}></div>;
}

export default ManagerStatusBDS;
