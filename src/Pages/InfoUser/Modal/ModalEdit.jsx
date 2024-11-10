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

    const handleClose = () => {
        setShow(false);
    };

    useEffect(() => {
        setPrice(data.price);
        setDescription(data.description);
        setId(data.propertyId);
    }, [data]);

    const handleEdit = async () => {
        try {
            const data = {
                price,
                description,
                id,
            };
            await requestEditBlog(data);
            toast.success('Chình Sửa Bài Đăng Thành Công !!!');
            setShow(false);
        } catch (error) {
            toast.success('Chình Sửa Bài Đăng Thất Bại !!!');
        }
    };

    return (
        <div>
            <Modal show={show} size="lg">
                <ToastContainer limit={1} />
                <Modal.Header closeButton onClose={handleClose}>
                    <Modal.Title>Chỉnh Sửa Bài Đăng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <>
                        <div class="form-floating mb-3">
                            <input
                                type="number"
                                class="form-control"
                                id="floatingInput"
                                placeholder="name@example.com"
                                onChange={(e) => setPrice(e.target.value)}
                                value={price}
                            />
                            <label for="floatingInput">Giá </label>
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
