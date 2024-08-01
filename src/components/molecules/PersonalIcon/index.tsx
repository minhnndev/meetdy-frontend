import { KeyOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Badge } from '@douyinfe/semi-ui';
import PropTypes from 'prop-types';
import getSummaryName from '@/utils/nameHelper';
import './style.css';
import { AvatarSize } from '@douyinfe/semi-ui/lib/es/avatar';

interface PersonalIconProps {
    avatar?: string;
    isActive?: boolean;
    demention?: AvatarSize;
    common?: boolean;
    isHost?: boolean;
    name?: string;
    color?: string;
    noneUser?: boolean;
}

const PersonalIcon = (props: PersonalIconProps) => {
    const { avatar, isActive, demention, common, isHost, name, color, noneUser } = props;
    return (
        // <div
        //     className={
        //         isActive && common
        //             ? 'user-icon common'
        //             : !isActive && common
        //             ? 'user-icon no-online common'
        //             : isActive && !common
        //             ? 'user-icon'
        //             : 'user-icon no-online'
        //     }
        // >
            <Badge
                dot={isActive}
                style={{ transform: 'none', height: '12px', minWidth: '12px' }}
                type='success'
                position='rightBottom'
                count={
                    isHost ? (
                        <KeyOutlined
                            style={{
                                backgroundColor: 'rgba(0,0,0,0.3)',
                                padding: '0.24rem',
                                borderRadius: '50%',
                                color: 'yellow',
                                fontSize: '1.2rem',
                            }}
                        />
                    ) : (
                        ''
                    )
                }
            >
                {noneUser ? (
                    <Avatar
                        style={{
                            backgroundColor: '#87d068',
                        }}
                        size={demention}
                        icon={<UserOutlined />}
                    />
                ) : avatar ? (
                    <Avatar  size={demention} src={avatar} />
                ) : (
                    <Avatar size={demention} style={{ backgroundColor: color ? color : '#4c92ff' }}>
                        {getSummaryName(name)}
                    </Avatar>
                )}
            </Badge>
        // </div>
    );
};

PersonalIcon.propTypes = {
    avatar: PropTypes.string,
    isActive: PropTypes.bool,
    demention: PropTypes.string,
    common: PropTypes.bool,
    isHost: PropTypes.bool,
    name: PropTypes.string,
    color: PropTypes.string,
    noneUser: PropTypes.bool,
};

PersonalIcon.defaultProps = {
    avatar: '',
    isActive: false,
    demention: 'default',
    common: true,
    isHost: false,
    name: '',
    color: '',
    noneUser: false,
};

export default PersonalIcon;
