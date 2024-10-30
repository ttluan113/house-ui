import classNames from 'classnames/bind';
import styles from './ManagerStatistics.module.scss';
import RealEstateReport from './Components/ManagerMonth/ManagerMonth';

const cx = classNames.bind(styles);

function ManagerStatistics() {
    return (
        <div className={cx('wrapper')}>
            <RealEstateReport />
        </div>
    );
}

export default ManagerStatistics;
