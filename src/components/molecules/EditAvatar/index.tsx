import './style.css'
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { IcCamera } from '@/theme/icons/MDIcons';

type EditAvatarProps = {
  avatar?: string,
  getFile?: (file: File) => void,
  isClear?: boolean
}

const EditAvatar = (props: EditAvatarProps) => {
    const { avatar, getFile, isClear } = props;
    const [imagePreview, setImagePreview] = useState('');

    useEffect(() => {
        if (isClear) {
            console.log('clear');
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
      <div className="upload-avatar">
          <div className="upload-avatar_default-avatar">
              <div className="upload-avatar_image">
                  {avatar || imagePreview ? (
                      <img src={imagePreview ? imagePreview : avatar} alt="" />
                  ) : (
                      <label className="upload-avatar_text-select" htmlFor="upload-photo_custom">
                          Chọn hình ảnh
                      </label>
                  )}
              </div>

              <div className="upload-avatar_icon">
                  <label htmlFor="upload-photo_custom">
                      <IcCamera style={{ fontSize: '13px' }} />
                  </label>
                  <input
                      id="upload-photo_custom"
                      type="file"
                      hidden
                      onChange={(e) => handleOnChange(e.target)}
                      accept="image/*"
                  />
              </div>
          </div>
      </div>
    );
}

EditAvatar.propTypes = {
    avatar: PropTypes.string,
    getFile: PropTypes.func,
    isClear: PropTypes.bool,
};

EditAvatar.defaultProps = {
    getFile: null,
    avatar: '',
    isClear: false,
};

export default EditAvatar