import classNames from 'classnames/bind';
import styles from './HouseHeart.module.scss';

import CardBody from '../../../../Components/CardBody/CardBody';
import { useEffect, useState } from 'react';
import { requestGetHouseHeart } from '../../../../Config';
import decodedJWT from '../../../../utils/decodeJWT';

const cx = classNames.bind(styles);

function HouseHeart() {
    const token = decodedJWT();

    const [dataHouse, setDataHouse] = useState([]);
    const [favoritePostIds, setFavoritePostIds] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await requestGetHouseHeart(token.userId);

            setDataHouse(res);
            setFavoritePostIds(res.map((house) => house.postId)); // Extract post IDs
        };
        fetchData();
    }, []);

    return (
        <div className={cx('wrapper')}>
            {dataHouse.map((house) => (
                <CardBody house={house} />
            ))}
        </div>
    );
}

export default HouseHeart;
