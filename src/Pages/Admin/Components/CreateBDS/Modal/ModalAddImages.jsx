import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';

function ModalAddImages({ show, dataBlogNoImage, handleUploadImg }) {
    const [imgTest, setImgTest] = useState({});

    return (
        <>
            <Modal size="lg" show={show}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm ảnh bất động sản</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <table className="table table-bordered border-primary">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Ảnh</th>
                                <th scope="col">Tiêu Đề Bài Viết</th>
                                <th scope="col">Hành Động</th>
                            </tr>
                        </thead>
                        {dataBlogNoImage.map((item) => (
                            <tbody>
                                <tr>
                                    <th scope="row">{item.propertyId}</th>
                                    <td>
                                        {item.images.length <= 0 ? (
                                            <div>
                                                <input
                                                    type="file"
                                                    onChange={(e) => setImgTest(e.target.files)}
                                                    multiple
                                                />
                                            </div>
                                        ) : (
                                            <img />
                                        )}
                                    </td>
                                    <td>{item.title}</td>
                                    <td>
                                        <button
                                            onClick={() =>
                                                handleUploadImg({
                                                    postId: item.propertyId,
                                                    img: imgTest,
                                                })
                                            }
                                            type="button"
                                            class="btn btn-primary"
                                        >
                                            Xác Nhận
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        ))}
                    </table>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ModalAddImages;
