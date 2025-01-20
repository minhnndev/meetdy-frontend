import AlertDialogBase from "@/components/common/AlertDialogBase";
import ChangePasswordForm, {
    ChangePasswordValuesProps,
} from "@/components/common/Form/ChangePasswordForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useChangePassword } from "@/hooks/me/useChangePassword";
import { useRevokeToken } from "@/hooks/me/useRevokeToken";
import { useToastify } from "@/hooks/utils/useToastify";
import { setLoading } from "@/redux/slice/accountSlice";
import { useAppDispatch } from "@/redux/store";
import generateCode from "@/utils/generateCode";
import { memo, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

interface ChangePasswordDialogProps {
    visible: boolean;
    onCancel: () => void;
}

const ChangePasswordDialog = ({ visible, onCancel }: ChangePasswordDialogProps) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const { toast } = useToastify();

    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    const [newPassword, setNewPassword] = useState("");

    const { mutateAsync: changePassword } = useChangePassword();
    const { mutateAsync: revokeToken } = useRevokeToken();

    const handleSubmit = useCallback(
        async ({ currentPassword, newPassword }: ChangePasswordValuesProps) => {
            try {
                dispatch(setLoading(true));
                await changePassword({ oldPassword: currentPassword, newPassword });
                toast({
                    variant: "success",
                    title: t("success.changePasswordSuccess"),
                });
                setNewPassword(newPassword);
                setOpenConfirmDialog(true);
                onCancel();
            } catch (error) {
                toast({
                    variant: "error",
                    title: t("error.wrongPassword"),
                });
            } finally {
                dispatch(setLoading(false));
            }
        },
        [changePassword, dispatch, onCancel, t, toast]
    );

    const handleRevokeToken = useCallback(async () => {
        try {
            const key = generateCode(20);
            const { token, refreshToken } = await revokeToken({
                password: newPassword,
                key,
            });
            localStorage.setItem("token", token);
            localStorage.setItem("refreshToken", refreshToken);
            toast({
                variant: "success",
                title: t("success.logoutOtherDevices"),
            });
        } catch (error) {
            toast({
                variant: "error",
                title: t("error.errorOccurred"),
            });
        }
    }, [newPassword, revokeToken, t, toast]);

    return (
        <>
            <Dialog open={visible} onOpenChange={onCancel}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>{t("common.changePassword")}</DialogTitle>
                    </DialogHeader>
                    <ChangePasswordForm onSubmit={handleSubmit} onCancel={onCancel} />
                </DialogContent>
            </Dialog>
            <AlertDialogBase
                title={t("common.logoutOtherDevicesQuestion")}
                description={t("common.logoutOtherDevicesExplanation")}
                textAction={t("common.yes")}
                onAction={handleRevokeToken}
                textCancel={t("common.no")}
                open={openConfirmDialog}
                onOpenChange={setOpenConfirmDialog}
                onCancel={() => setOpenConfirmDialog(false)}
            />
        </>
    );
};

export default memo(ChangePasswordDialog);
