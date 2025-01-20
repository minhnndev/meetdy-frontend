import AddFriendDialog from "@/components/common/Dialogs/AddFriendDialog";
import CreateGroupDialog from "@/components/common/Dialogs/CreateGroupDialog";
import { Input } from "@/components/ui/input";
import { memo } from "react";
import { useTranslation } from "react-i18next";

const NavAction = () => {
    const { t } = useTranslation();
    return (
        <div className="flex items-center gap-1 p-2 h-14">
            <Input type="text" placeholder={t("common.search")} className="flex-1" />
            <AddFriendDialog />
            <CreateGroupDialog />
        </div>
    );
};

export default memo(NavAction);
