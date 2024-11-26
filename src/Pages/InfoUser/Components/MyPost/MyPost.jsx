import { useEffect, useState } from 'react';
import CardBody from '../../../../Components/CardBody/CardBody.jsx';
import { requestGetPostByUserId } from '../../../../Config/index.js';
import styles from './MyPost.module.scss'; // Optional styling
import classNames from 'classnames/bind';
import decodedJWT from '../../../../utils/decodeJWT.js';

const cx = classNames.bind(styles);

function MyPost() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentTab, setCurrentTab] = useState('approved'); // Default tab is 'approved'
    const data = decodedJWT();
    const userId = data.userId; // Replace with the actual userId from your context or authentication logic

    const fetchPosts = async (status) => {
        setLoading(true);
        try {
            const response = await requestGetPostByUserId(userId, status);
            console.log(response);
            setPosts(response); // Assuming API response structure
        } catch (error) {
            console.error('Error fetching posts:', error);
            setPosts([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts(currentTab);
    }, [currentTab, userId]);

    const handleTabClick = (status) => {
        setCurrentTab(status);
    };

    return (
        <div className={cx('my-posts')}>
            {/* Tab Navigation */}
            <div className={cx('tabs')}>
                {['approved', 'pending', 'expired'].map((status) => (
                    <button
                        key={status}
                        className={cx('tab', { active: currentTab === status })}
                        onClick={() => handleTabClick(status)}
                    >
                        {status === 'approved' && 'Đã duyệt'}
                        {status === 'pending' && 'Chờ duyệt'}
                        {status === 'expired' && 'Đã hết hạn'}
                    </button>
                ))}
            </div>

            {/* Content */}
            {loading ? (
                <div className={cx('loading')}>
                    <p>Đang tải dữ liệu...</p>
                </div>
            ) : posts?.length > 0 ? (
                <div className={cx('result')}>
                    {posts.map((post) => (
                        <CardBody house={post} key={post.postId} />
                    ))}
                </div>
            ) : (
                <div className={cx('loading')}>
                    <p>Không có bài viết nào trong trạng thái này</p>
                </div>
            )}
        </div>
    );
}

export default MyPost;
