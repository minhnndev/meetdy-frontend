import { Avatar, Tooltip } from '@douyinfe/semi-ui';
import PropTypes from 'prop-types';
import PersonalIcon from '../PersonalIcon';
import './style.css';
import { IcCloseDefault, IcUserAddGroup } from '@/theme/icons/MDIcons';

type ItemsSelectedProps = {
    items: any[],
    onRemove?: (id: string) => void,
};

const ItemsSelected = (props: ItemsSelectedProps) => {
    const { items, onRemove } = props;

    const handleRemoveSelect = (id) => {
        if (onRemove) {
            onRemove(id);
        }
    };

    return (
        <>
            {items &&
                items.length > 0 &&
                items.map((item, index) => (
                    <div className="item-selected_wrapper">
                        <div className="item-selected--text" key={index}>
                            <div className="item-selected-avatar">
                                {!item.type && (
                                    <PersonalIcon
                                        demention="small"
                                        avatar={item.avatar}
                                        name={item.name}
                                        color={item.avatarColor}
                                    />
                                )}

                                {item.type && typeof item.avatar === 'string' && (
                                    <PersonalIcon
                                        demention="small"
                                        avatar={item.avatar}
                                        name={item.name}
                                        color={item.avatarColor}
                                    />
                                )}

                                {item.type && typeof item.avatar === 'object' && (
                                    <Tooltip>
                                        <Avatar
                                            style={{ backgroundColor: '#f56a00' }}
                                            icon={<IcUserAddGroup />}
                                            size="small"
                                        />
                                    </Tooltip>
                                )}
                            </div>

                            <div className="item-selected-name">
                                <span>{item.name}</span>
                            </div>
                        </div>

                        <div
                            className="item-selected-remove"
                            onClick={() => handleRemoveSelect(item._id)}
                        >
                            <IcCloseDefault />
                        </div>
                    </div>
                ))}
        </>
    );
}

ItemsSelected.propTypes = {
    items: PropTypes.array,
};

ItemsSelected.defaultProps = {
    items: [],
};


export default ItemsSelected;
