import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Tooltip } from '@douyinfe/semi-ui';
import getSummaryName from '@/utils/nameHelper';
import { AvatarSize } from '@douyinfe/semi-ui/lib/es/avatar';

type AvatarCustomProps = {
    src: string,
    name: string,
    style?: object,
    demention?: AvatarSize,
    size?: number | string,
    color?: string,
};

const AvatarCustom = (props: AvatarCustomProps) => {
    const { src, name, style, color } = props;

    return (
        <>
            {src ? (
                <Avatar src={src} style={{backgroundColor: color, ...style}} />
            ) : (
                <Tooltip title={name} placement="top">
                    <Avatar style={{ backgroundColor: color, ...style }}>
                        {getSummaryName(name)}
                    </Avatar>
                </Tooltip>
            )}
        </>
    );
}

AvatarCustom.propTypes = {
    src: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    style: PropTypes.object,
    demention: PropTypes.string,
    size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    color: PropTypes.string,
};

AvatarCustom.defaultProps = {
    src: '',
    name: '',
    style: {},
    color: '#408ec6',
};

export default AvatarCustom;
