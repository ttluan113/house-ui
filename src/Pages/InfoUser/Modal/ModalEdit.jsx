import { Editor } from '@tinymce/tinymce-react';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast, ToastContainer } from 'react-toastify';
import { requestEditBlog } from '../../../Config';

function ModalEdit({ show, setShow, data }) {
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [id, setId] = useState();
    const [title, setTitle] = useState();
    const [rooms, setRooms] = useState('');
    const [floors, setFloors] = useState('');
    const [toilets, setToilets] = useState('');

    const handleClose = () => {
        setShow(false);
    };

    useEffect(() => {
        if (data) {
            console.log(data);
            setPrice(data.price || '');
            setDescription(data.description || '');
            setTitle(data.title || '');
            setId(data.propertyId);
            setRooms(data.sophong || '');
            setFloors(data.soTang || '');
            setToilets(data.soToilet || '');
        }
    }, [data]);

    const handleEdit = async () => {
        try {
            const updatedData = {
                title,
                price,
                description,
                id,
                rooms,
                floors,
                toilets,
            };
            await requestEditBlog(updatedData);
            toast.success('Chỉnh Sửa Bài Đăng Thành Công !!!');
            setShow(false);
        } catch (error) {
            toast.error('Chỉnh Sửa Bài Đăng Thất Bại !!!');
        }
    };

    return (
        <div>
            <Modal show={show} size="lg">
                <ToastContainer limit={1} />
                <Modal.Header closeButton onClick={handleClose}>
                    <Modal.Title>Chỉnh Sửa Bài Đăng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <>
                        <div className="form-floating mb-3">
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Giá"
                                onChange={(e) => setPrice(e.target.value)}
                                value={price}
                            />
                            <label>Giá</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Tiêu đề"
                                onChange={(e) => setTitle(e.target.value)}
                                value={title}
                            />
                            <label>Tiêu đề</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Số phòng"
                                onChange={(e) => setRooms(e.target.value)}
                                value={rooms}
                            />
                            <label>Số phòng</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Số tầng"
                                onChange={(e) => setFloors(e.target.value)}
                                value={floors}
                            />
                            <label>Số tầng</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Số toilet"
                                onChange={(e) => setToilets(e.target.value)}
                                value={toilets}
                            />
                            <label>Số toilet</label>
                        </div>
                        <Editor
                            onEditorChange={(value) => setDescription(value)}
                            apiKey="n4hxnmi16uwk9dmdgfx6nscsf8oc30528dlcub1mzsk8deqy"
                            initialValue={description}
                            init={{
                                plugins:
                                    'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
                            }}
                        />
                    </>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClose} variant="secondary">
                        Đóng
                    </Button>
                    <Button onClick={handleEdit} variant="primary">
                        Chỉnh Sửa
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ModalEdit;
