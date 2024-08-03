import { 
    IcAddUser, 
    IcChannel, 
    IcDefaultUser, 
    IcDelete, 
    IcEdit, 
    IcImage, 
    IcKey, 
    IcPin, 
    IcPlayVideo 
} from '@/theme/icons/MDIcons';
import PropTypes from 'prop-types';
import { FcBarChart } from 'react-icons/fc';
import { useSelector } from 'react-redux';

type ShortMessageProps = {
    message: any,
    type: boolean,
};

const ShortMessage = (props: ShortMessageProps) => {
    const { message, type } = props;
    const { userProfile } = useSelector((state: any) => state.account);
    const { content, isDeleted } = message;

    const renderName = () => {
        if (type) {
            if (message.user._id === userProfile._id) {
                return 'Bạn: ';
            } else {
                return message.user.name + ': ';
            }
        } else {
            if (message.user._id === userProfile._id) {
                return 'Bạn: ';
            } else {
                return '';
            }
        }
    };

    return (
        <>
            {isDeleted ? (
                <span>{renderName()} đã thu hồi một tin nhắn</span>
            ) : (
                <>
                    {message.type === 'TEXT' && (
                        <span>
                            {renderName()}
                            {content}
                        </span>
                    )}

                    {message.type === 'HTML' && <span>{renderName()}đã gửi một văn bản</span>}

                    {message.type === 'IMAGE' && (
                        <span>
                            {renderName()}
                            <IcImage />
                            &nbsp;đã gửi một hình ảnh
                        </span>
                    )}

                    {message.type === 'VIDEO' && (
                        <span>
                            {renderName()}
                            <IcPlayVideo />
                            &nbsp;đã gửi một Video
                        </span>
                    )}

                    {message.type === 'FILE' && (
                        <span>
                            {renderName()}
                            <IcImage />
                            &nbsp;đã gửi một tệp
                        </span>
                    )}

                    {message.type === 'NOTIFY' && message.content === 'PIN_MESSAGE' && (
                        <span>
                            {renderName()}
                            <IcPin />
                            &nbsp;đã ghim một tin nhắn
                        </span>
                    )}

                    {message.type === 'NOTIFY' && message.content === 'NOT_PIN_MESSAGE' && (
                        <span>
                            {renderName()}
                            <IcPin />
                            &nbsp;đã ghim bỏ ghim một tin nhắn
                        </span>
                    )}

                    {message.type === 'NOTIFY' && message.content === 'Đã thêm vào nhóm' && (
                        <span>
                            {renderName()}
                            <IcAddUser />
                            &nbsp;đã thêm thành viên vào nhóm
                        </span>
                    )}

                    {message.type === 'NOTIFY' && message.content === 'Đã xóa ra khỏi nhóm' && (
                        <span>
                            {renderName()}
                            <IcDelete />
                            &nbsp;đã xóa thành viên ra khỏi nhóm
                        </span>
                    )}

                    {message.type === 'NOTIFY' && message.content === 'Đã rời khỏi nhóm' && (
                        <span>{renderName()}đã rời khỏi nhóm</span>
                    )}

                    {message.type === 'NOTIFY' &&
                        message.content.startsWith('Đã đổi tên nhóm thành') && (
                            <span>
                                {renderName()}
                                <IcEdit />
                                &nbsp;đã đổi tên nhóm thành
                            </span>
                        )}

                    {message.type === 'NOTIFY' && message.content.startsWith('Đã là bạn bè') && (
                        <span>
                            {renderName()}
                            <IcDefaultUser />
                            &nbsp;đã trở thành bạn bè
                        </span>
                    )}

                    {message.type === 'NOTIFY' && message.content === 'UPDATE_CHANNEL' && (
                        <span>
                            {renderName()}
                            <IcChannel />
                            &nbsp;đã đổi tên Channel
                        </span>
                    )}

                    {message.type === 'NOTIFY' && message.content === 'DELETE_CHANNEL' && (
                        <span>
                            {renderName()}
                            <IcChannel />
                            &nbsp;đã xóa Channel
                        </span>
                    )}

                    {message.type === 'NOTIFY' && message.content === 'CREATE_CHANNEL' && (
                        <span>
                            {renderName()}
                            <IcChannel />
                            &nbsp;đã tạo Channel
                        </span>
                    )}

                    {message.type === 'NOTIFY' && message.content === 'Tham gia từ link' && (
                        <span>{renderName()} đã tham gia nhóm </span>
                    )}

                    {message.type === 'STICKER' && (
                        <span>
                            {renderName()}
                            <IcPin />
                            &nbsp;đã gửi một sticker
                        </span>
                    )}

                    {message.type === 'NOTIFY' &&
                        message.content === 'Ảnh đại diện nhóm đã thay đổi' && (
                            <span>
                                {renderName()}
                                <IcEdit />
                                &nbsp;đã đổi ảnh nhóm
                            </span>
                        )}

                    {message.type === 'NOTIFY' && message.content === 'ADD_MANAGERS' && (
                        <span>
                            {renderName()}
                            <IcKey />
                            &nbsp;đã thêm phó nhóm
                        </span>
                    )}

                    {message.type === 'NOTIFY' && message.content === 'DELETE_MANAGERS' && (
                        <span>
                            {renderName()}
                            <IcKey />
                            &nbsp;đã xóa phó nhóm
                        </span>
                    )}

                    {message.type === 'VOTE' && (
                        <span>
                            {renderName()}
                            <FcBarChart />
                            &nbsp;bình chọn
                        </span>
                    )}
                </>
            )}
        </>
    );
}

ShortMessage.propTypes = {
    message: PropTypes.object,
    type: PropTypes.bool,
};

ShortMessage.defaultProps = {
    message: {},
    type: PropTypes.bool,
};

export default ShortMessage;
