import { useEffect, useState } from 'react';
import CardBody from '../../../../Components/CardBody/CardBody.jsx';
import { requestGetPostsByPropertyId } from '../../../../Config/index.js';
import styles from './PostByProperty.module.scss'; // Optional styling
import classNames from 'classnames/bind';
import { useParams } from 'react-router-dom';

const cx = classNames.bind(styles);

function PostByProperty() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { propertyId } = useParams(); // Replace with the actual userId from your context or authentication logic

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await requestGetPostsByPropertyId(propertyId);
                console.log(response);
                setPosts(response); // Assuming API response structure
            } catch (error) {
                console.error('Error fetching posts:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [propertyId]);

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

export default PostByProperty;
