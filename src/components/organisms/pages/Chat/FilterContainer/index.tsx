import { Tabs } from '@douyinfe/semi-ui';
import { ConverMutipleSearch, ConverPersonalSearch } from '@/components/molecules';
import PropTypes from 'prop-types';
import './style.css';
import { Conversation } from '@/redux/slice/chat/chatSlice';
import { useEffect } from 'react';

type FilterContainerProps = {
    dataSingle: Conversation[],
    dataMutiple: any[],
    valueText?: string,
};

const FilterContainer = (props: FilterContainerProps) => {
    const {dataSingle, dataMutiple} = props;
    useEffect(() => {
        console.log("🚀 ~ FilterContainer ~ dataSingle:", dataSingle)
    }, [dataSingle])

    
    const { TabPane } = Tabs;

    return (
        <div className="filter-container">
            <Tabs type='line'>
                <TabPane tab="Cá nhân" itemKey="1">
                    <ConverPersonalSearch data={dataSingle} />
                </TabPane>
                <TabPane tab="Nhóm" itemKey="2">
                    <ConverMutipleSearch data={dataMutiple} />
                </TabPane>
            </Tabs>
        </div>
    );
}

FilterContainer.propTypes = {
    dataSingle: PropTypes.array,
    dataMutiple: PropTypes.array,
};

FilterContainer.defaultProps = {
    dataMutiple: [],
    dataSingle: [],
};

export default FilterContainer;
