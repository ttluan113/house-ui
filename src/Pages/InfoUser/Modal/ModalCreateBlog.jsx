import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { requestPaymentsMomo, requestPostBlog } from '../../../Config';
import styles from './ModalCreateBlog.module.scss';
import classNames from 'classnames/bind';

import decodedJWT from '../../../utils/decodeJWT';

const cx = classNames.bind(styles);

function CreateBDS({ show, setShow, data }) {
    const handleClose = () => setShow(false);

    const dataToken = decodedJWT();

    const [postTitle, setPostTitle] = useState('');
    const [postContent, setPostContent] = useState('');
    const [charged, setCharged] = useState(0);
    const [postType, setPostType] = useState('');
    const [newPrice, setNewPrice] = useState('');

    const [postIdPayments, setPostIdPayments] = useState('');

    const [checkTypeCharged, setCheckTypeCharged] = useState(false);
    const [checkPostType, setCheckPostType] = useState(false);

    useEffect(() => {
        if (data) {
            // Khi có dữ liệu, cập nhật giá trị cho các state
            setPostTitle(data.title || '');
            setNewPrice(data.price || '');
        }
    }, [data]);

    useEffect(() => {
        if (charged === '1') {
            setCheckTypeCharged(true);
        } else {
            setCheckTypeCharged(false);
        }
    }, [charged]);

    useEffect(() => {
        if (postType === 'for_sale') {
            setCheckPostType(false);
        } else {
            setCheckPostType(true);
        }
    }, [postType]);

    const handlePostBlog = async () => {
        const dataPostBlog = {
            postTitle,
            postContent,
            charged,
            postType,
            userId: dataToken.userId,
            status: 'pending',
            price: newPrice || data.price,
            propertyId: data.propertyId,
        };
        try {
            const res = await requestPostBlog(dataPostBlog);
            if (res.status === 200) {
                toast.success('Tạo Bất Động Sản Thành Công !!!');
                handleClose();
            }
            setShow(false);
        } catch (error) {
            toast.error('Đã có lỗi xảy ra vui lòng thử lại !!!');
        }
    };

    useEffect(() => {
        const uploadData = async () => {
            const dataPostBlog = {
                postTitle,
                postContent: '123',
                charged,
                postType,
                userId: dataToken.userId,
                status: 'pending',
                price: newPrice || data.price,
                propertyId: data.propertyId,
            };
            try {
                const res = await requestPostBlog(dataPostBlog);
                setPostIdPayments(res.postId);
            } catch (error) {
                toast.error('Đã có lỗi xảy ra vui lòng thử lại !!!');
            }
        };

        // Chỉ upload data nếu charged = 1 và show = true
        if (charged === '1' && show === true) {
            uploadData();
        }
    }, [charged, show]);

    const handlePayment = async () => {
        const res = await requestPaymentsMomo(postIdPayments);
        if (res) {
            window.open(res);
        }
    };

    return (
        <>
            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Tạo Bài Đăng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {data ? (
                        <>
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="floatingInput"
                                    placeholder="Địa Điểm"
                                    value={`${data.location} - ${data.phuong} - ${data.district} - ${data.province}`}
                                    readOnly
                                />
                                <label htmlFor="floatingInput">Địa Điểm</label>
                            </div>

                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="floatingInput"
                                    placeholder="Tiêu Đề Bài Đăng"
                                    value={postTitle}
                                    onChange={(e) => setPostTitle(e.target.value)}
                                />
                                <label htmlFor="floatingInput">Tiêu Đề Bài Đăng</label>
                            </div>

                            <select
                                className="form-select mb-3"
                                aria-label="Loại Bất Động Sản"
                                onChange={(e) => setPostType(e.target.value)}
                            >
                                <option value="">Loại Bất Động Sản</option>
                                <option value="for_sale">Cho Thuê</option>
                                <option value="for_rent">Đăng Bán</option>
                            </select>

                            <select
                                className="form-select mb-3"
                                aria-label="Loại Bài Đăng"
                                onChange={(e) => setCharged(e.target.value)}
                            >
                                <option value="">Loại Bài Đăng</option>
                                <option value="0">Miễn Phí</option>
                                <option value="1">Trả Phí</option>
                            </select>

                            {!checkPostType && (
                                <div className="form-floating mb-3">
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="floatingInput"
                                        placeholder="Giá Bất Động Sản"
                                        value={newPrice}
                                        onChange={(e) => setNewPrice(e.target.value)}
                                    />
                                    <label htmlFor="floatingInput">Giá Bất Động Sản</label>
                                </div>
                            )}

                            {checkTypeCharged && (
                                <div className={cx('btn-payment')}>
                                    <img src="https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png" alt="" />
                                    <button onClick={handlePayment}>Thanh Toán Qua Momo</button>
                                </div>
                            )}
                        </>
                    ) : (
                        <div>Loading...</div> // Hiển thị thông báo khi chưa có data
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={handlePostBlog}>
                        Đăng Bài
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default CreateBDS;
