import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { requestPostBlog } from '../../../Config';

import decodedJWT from '../../../utils/decodeJWT';

function CreateBDS({ show, setShow, data }) {
    const handleClose = () => setShow(false);

    const dataToken = decodedJWT();

    const [postTitle, setPostTitle] = useState(data?.title);
    const [postContent, setPostContent] = useState('');
    const [charged, setCharged] = useState(0);
    const [postType, setPostType] = useState('');
    const [newPrice, setNewPrice] = useState(data?.price);

    const [checkPostType, setCheckPostType] = useState(false);

    useEffect(() => {
        if (postType === 'for_sale') {
            setCheckPostType(false);
        } else {
            setCheckPostType(true);
        }
    }, [postType]);

    const handlePostBlog = async () => {
        const dataPostBlog = {
            postTitle: postTitle,
            postContent: postContent,
            charged: charged,
            postType: postType,
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

    return (
        <>
            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Tạo Bài Đăng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <select className="form-select mb-3" aria-label="Default select example" value={data.categoryId}>
                        <option selected>Loại Bất Động Sản</option>
                        <option value="4">Nhà Đất</option>
                        <option value="5">Chung Cư</option>
                    </select>

                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="floatingInput"
                            placeholder="name@example.com/"
                            value={`${data.location} - ${data.phuong} - ${data.district} - ${data.province}`}
                        />
                        <label htmlFor="floatingInput">Địa Điểm</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="floatingInput"
                            placeholder="name@example.com/"
                            value={postTitle}
                            onChange={(e) => setPostTitle(e.target.value)}
                        />
                        <label htmlFor="floatingInput">Tiêu Đề Bài Đăng</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="floatingInput"
                            placeholder="name@example.com/"
                            onChange={(e) => setPostContent(e.target.value)}
                        />
                        <label htmlFor="floatingInput">Mô Tả Bài Đăng</label>
                    </div>

                    <select
                        className="form-select mb-3"
                        aria-label="Default select example"
                        onChange={(e) => setCharged(e.target.value)}
                    >
                        <option selected>Loại Bài Đăng</option>
                        <option value="0">Miễn Phí</option>
                        <option value="1">Trả Phí</option>
                    </select>

                    <select
                        className="form-select mb-3"
                        aria-label="Default select example"
                        onChange={(e) => setPostType(e.target.value)}
                    >
                        <option selected>Loại Bất Động Sản</option>
                        <option value="for_sale">Cho Thuê</option>
                        <option value="for_rent">Đang Bán</option>
                    </select>
                    {!checkPostType ? (
                        <div className="form-floating mb-3">
                            <input
                                type="number"
                                className="form-control"
                                id="floatingInput"
                                placeholder="name@example.com/"
                                value={newPrice}
                                onChange={(e) => setNewPrice(e.target.value)}
                            />
                            <label htmlFor="floatingInput">Giá Bất Động Sản</label>
                        </div>
                    ) : (
                        <></>
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
