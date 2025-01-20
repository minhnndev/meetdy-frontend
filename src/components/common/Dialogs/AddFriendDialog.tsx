import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { UserPlus } from "lucide-react";
import { memo } from "react";
import { useTranslation } from "react-i18next";

const AddFriendDialog = () => {
    const { t } = useTranslation();
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size="icon" variant="ghost">
                    <UserPlus />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{t("common.addFriend")}</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Input
                            id="contact"
                            placeholder={t("form.placeholder.contact")}
                            className="col-span-full"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="button" variant="ghost">
                        {t("common.cancel")}
                    </Button>
                    <Button type="submit">{t("common.search")}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default memo(AddFriendDialog);
