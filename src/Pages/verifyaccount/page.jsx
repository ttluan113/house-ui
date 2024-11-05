import classNames from 'classnames/bind';
import styles from './VerifyAccount.module.scss';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import Header from '../../Components/Header/Header';
import { useNavigate } from 'react-router-dom';
import { requestVerify } from '../../Config/index';
import Cookies from 'js-cookie';

const cx = classNames.bind(styles);

function VerifyAccount() {
    const navigate = useNavigate();
    const [code, setCode] = useState(Array(6).fill(''));
    const email = Cookies.get('email');
    const handleChange = (index, value) => {
        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        if (value && index < code.length - 1) {
            const nextInput = document.querySelector(`input[name='otp-${index + 1}']`);
            if (nextInput) {
                nextInput.focus();
            }
        }
    };

    const handleSubmit = async () => {
        const otpString = code.join('');
        console.log(otpString);
        try {
            const res = await requestVerify(email, otpString);
            toast.success(res.message);
            setTimeout(() => {
                navigate('/'); // Chuyển hướng về trang chủ
            }, 1000);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    const handleReSendCode = async () => {
        try {
            // const res = await requestReSendCode();
            toast.success(res.message);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <Header />
            <ToastContainer />
            <div className={cx('form')}>
                <h4>Xác Thực Tài Khoản</h4>
                <p>Nhập mã xác minh gồm 6 chữ số đã được gửi đến email của bạn.</p>
                <div className={cx('form-input')}>
                    {code.map((value, index) => (
                        <input
                            key={index}
                            type="text"
                            maxLength={1}
                            name={`otp-${index}`}
                            value={value}
                            onChange={(e) => handleChange(index, e.target.value)}
                            onFocus={(e) => e.target.select()}
                        />
                    ))}
                </div>
                <button id={cx('btn-verify')} onClick={handleSubmit}>
                    Xác Thực
                </button>
                {/* <p>
                    Bạn chưa nhận được mã xác minh?
                    <span onClick={handleReSendCode} id={cx('btn-resend')}>
                        Gửi Lại
                    </span>
                </p> */}
            </div>
        </div>
    );
}

export default VerifyAccount;
