import PropTypes from 'prop-types';
import { Tag } from '@douyinfe/semi-ui'

type BasicTagProps = {
  title?: string,
};

const BasicTag = (props: BasicTagProps) => {
    const { title } = props;

    return (
        <Tag  color={"amber"} style={{ fontWeight: 'bold' }}>
              {title}
        </Tag>
    )
}

BasicTag.propTypes = {
  title: PropTypes.string,
  color: PropTypes.string,
};

BasicTag.defaultProps = {
  title: '',
  color: 'success',
};

export default BasicTag