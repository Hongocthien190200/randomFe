import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getText, createText, deleteText } from '../../redux/apiRequest';
import styles from './Home.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Home() {
    const dispatch = useDispatch();
    const state = useSelector((state) => state.texts?.texts); // Lấy dữ liệu từ Redux store
    const [textname, setInputText] = useState(''); // Dùng để lưu văn bản nhập từ người dùng
    const [randomText, setRandomText] = useState(''); // Văn bản được chọn ngẫu nhiên
    const [isVisible, setIsVisible] = useState(true); // Trạng thái ẩn/hiển danh sách

    // Lấy danh sách văn bản từ Redux store
    let listtexts = [];
    if (state && state.listtexts) {
        listtexts = state.listtexts;
    }

    // Xử lý khi người dùng nhập văn bản
    const handleInputChange = (e) => {
        setInputText(e.target.value);
    };

    // Thêm văn bản mới
    const handleAddText = async () => {
        if (textname.trim()) {
            const newData = {
                textname
            };
            await createText(dispatch, newData); // Gọi API thêm văn bản mới
            setInputText(''); // Reset lại ô input
            await getText(dispatch);
        }
    };

    // Xử lý nhấn phím "Enter"
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleAddText();
        }
    };

    // Xóa văn bản
    const handleDeleteText = async (id) => {
        await deleteText(id, dispatch); // Gọi API xóa văn bản
        await getText(dispatch);
    };

    // Chọn ngẫu nhiên một văn bản
    const handleRandomText = () => {
        if (listtexts.length > 0) {
            const randomIndex = Math.floor(Math.random() * listtexts.length);
            setRandomText(listtexts[randomIndex].textname); // Chọn và hiển thị văn bản ngẫu nhiên
        }
    };

    // Lấy dữ liệu văn bản khi component được mount
    useEffect(() => {
        getText(dispatch);
    }, [dispatch]);

    // Ẩn/hiển danh sách
    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    return (
        <div className={cx('home')}>
            <h1 className={cx('title')}>App For Hoàng Khánh</h1>
            <div className={cx('input-container')}>
                <input
                    type="text"
                    value={textname}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress} // Lắng nghe sự kiện nhấn phím
                    placeholder="Nhập văn bản của bạn"
                    className={cx('input')}
                />
                <button onClick={handleAddText} className={cx('button')}>
                    Thêm
                </button>
            </div>

            <button onClick={toggleVisibility} className={cx('button', 'toggle-button')}>
                {isVisible ? 'Ẩn danh sách' : 'Hiển thị danh sách'}
            </button>

            {isVisible && (
                <div className={cx('text-list')}>
                    <h3 className={cx('list-title')}>Danh sách văn bản:</h3>
                    <ul>
                        {listtexts.map((text) => (
                            <li key={text._id} className={cx('list-item')}>
                                {text.textname}
                                <button onClick={() => handleDeleteText(text._id)} className={cx('delete-button')}>
                                    Xóa
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <button onClick={handleRandomText} className={cx('button', 'random-button')}>
                Random
            </button>

            {randomText && (
                <div className={cx('result')}>
                    <h3>Văn bản được chọn:</h3>
                    <p className={cx('selected-text')}>{randomText}</p>
                </div>
            )}
        </div>
    );
}

export default Home;
