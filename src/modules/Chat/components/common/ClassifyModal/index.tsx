import React, { useState } from "react";
import ListClassifyModal from "./ListClassifyModal";
import ModifyClassifyModal from "./ModifyClassifyModal";
import { TClassify } from "@/models/classify.model";

const ClassifyModal = ({ visible, onOpen, onCancel }) => {
    const [showModifyModal, setShowModifyModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [selectedTag, setSelectedTag] = useState<TClassify>(null);

    const openAddModal = () => {
        setShowModifyModal(true);
        onCancel();
    };

    const openEditModal = (classify: TClassify) => {
        setIsEdit(true);
        setShowModifyModal(true);
        setSelectedTag(classify);
        onCancel();
    };

    return (
        <>
            <ListClassifyModal
                visible={visible}
                onCancel={onCancel}
                openAddModal={openAddModal}
                openEditModal={openEditModal}
            />
            <ModifyClassifyModal
                onOpen={onOpen}
                isEdit={isEdit}
                setIsEdit={setIsEdit}
                showModifyModal={showModifyModal}
                setShowModifyModal={setShowModifyModal}
                selectedTag={selectedTag}
                setSelectedTag={setSelectedTag}
            />
        </>
    );
};

export { ClassifyModal };
