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
    const data = decodedJWT();
    const userId = data.userId; // Replace with the actual userId from your context or authentication logic

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await requestGetPostByUserId(userId);
                console.log(response);
                setPosts(response); // Assuming API response structure
            } catch (error) {
                console.error('Error fetching posts:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [userId]);

    return (
        <div className={cx('my-posts')}>
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
                    <p>Bạn chưa đăng bài viết nào</p>
                </div>
            )}
        </div>
    );
}

export default MyPost;
