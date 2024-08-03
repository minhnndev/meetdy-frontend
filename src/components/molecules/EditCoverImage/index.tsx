import './style.css'
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { IcEdit } from '@/theme/icons/MDIcons';

type EditCoverImageProps = {
    coverImg?: string,
    getFile?: (file: File) => void,
    isClear?: boolean,
}

const EditCoverImage = (props: EditCoverImageProps) => {
    const { coverImg, getFile, isClear } = props;
    const [imagePreview, setImagePreview] = useState('');

    useEffect(() => {
        if (isClear) {
            setImagePreview('');
        }
    }, [isClear]);


    const handleOnChange = (e: HTMLInputElement) => {
        const files = e.files;

        const fileImage = files[0];
        const reader = new FileReader();
        if (fileImage && fileImage.type.match('image.*')) {
            reader.readAsDataURL(fileImage);
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };

            if (getFile) {
                getFile(fileImage);
            }
        }
    }


    return (
        <div className="upload-cover_wrapper">
            <div className="upload-cover_img">
                {coverImg || imagePreview ? (
                    <img src={imagePreview ? imagePreview : coverImg} alt="" />
                ) : (
                    <label className="upload-cover_text-select" htmlFor="upload-cover_custom">
                        Chọn hình ảnh
                    </label>
                )}
            </div>

            <div className="upload-cover_icon">
                <label htmlFor="upload-cover_custom">
                    <IcEdit style={{ fontSize: '13px' }} />
                </label>
                <input
                    id="upload-cover_custom"
                    type="file"
                    hidden
                    onChange={(e) => handleOnChange(e.target)}
                    accept="image/*"
                />
            </div>
        </div>
    );
}

EditCoverImage.propTypes = {
  coverImg: PropTypes.string,
  getFile: PropTypes.func,
  isClear: PropTypes.bool,
};

EditCoverImage.defaultProps = {
  coverImg: '',
  getFile: null,
  isClear: false,
};

export default EditCoverImage