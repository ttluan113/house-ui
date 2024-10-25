import classNames from 'classnames/bind';
import styles from './SlideHouse.module.scss';
import Slide1 from './Components/Slide1/Slide1';
import Banner from './Components/Banner';

const cx = classNames.bind(styles);

function SlideHouse({ dataHouseAll }) {
    return (
        <div className={cx('wrapper')}>
            <div>
                <Slide1 dataHouseAll={dataHouseAll} />
            </div>
            <div>
                <Banner />
            </div>
        </div>
    );
}

export default SlideHouse;
