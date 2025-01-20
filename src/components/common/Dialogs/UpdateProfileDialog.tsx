import UpdateProfileForm, {
    UpdateProfileValuesProps,
} from "@/components/common/Form/UpdateProfileForm";
import UploadAvatar from "@/components/common/UploadAvatar";
import UploadCoverImage from "@/components/common/UploadCoverImage";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useUpdateAvatar } from "@/hooks/me/useUpdateAvatar";
import { useUpdateCoverImage } from "@/hooks/me/useUpdateCoverImage";
import { useUpdateProfile } from "@/hooks/me/useUpdateProfile";
import { useToastify } from "@/hooks/utils/useToastify";
import { setLoading } from "@/redux/slice/accountSlice";
import { setAvatarProfile, updateUserProfile } from "@/redux/slice/globalSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { isEqual, pick } from "lodash";
import { Loader2 } from "lucide-react";
import { memo, useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

interface UpdateProfileDialogProps {
    visible: boolean;
    onCancel: () => void;
}

const UpdateProfileDialog = ({ visible, onCancel }: UpdateProfileDialogProps) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const { isLoading } = useAppSelector((state) => state.account);
    const { toast } = useToastify();
    const { user } = useAppSelector((state) => state.global);
    const [coverImg, setCoverImg] = useState<File | string | null>(user?.coverImage || null);
    const [avatar, setAvatar] = useState<File | string | null>(user?.avatar || null);
    const userProfile = useMemo(() => pick(user, ["name", "dateOfBirth", "gender"]), [user]);

    const { mutateAsync: updateProfile } = useUpdateProfile();
    const { mutateAsync: updateCoverImage } = useUpdateCoverImage();
    const { mutateAsync: updateAvatar } = useUpdateAvatar();

    const defaultValues: UpdateProfileValuesProps = useMemo(
        () => ({
            name: userProfile.name || "",
            dob: userProfile.dateOfBirth
                ? `${userProfile.dateOfBirth.year}-${String(userProfile.dateOfBirth.month).padStart(2, "0")}-${String(userProfile.dateOfBirth.day).padStart(2, "0")}`
                : "",
            gender: (userProfile.gender ? "1" : "0") as "1" | "0",
        }),
        [userProfile.dateOfBirth, userProfile.gender, userProfile.name]
    );

    const handleOnOpenChange = useCallback(() => {
        setCoverImg(user?.coverImage || null);
        setAvatar(user?.avatar || null);
        onCancel();
    }, [onCancel, user?.avatar, user?.coverImage]);

    const handleSubmit = useCallback(
        async (values: UpdateProfileValuesProps) => {
            try {
                dispatch(setLoading(true));
                if (!isEqual(defaultValues, values)) {
                    await updateProfile({
                        name: values.name,
                        dateOfBirth: {
                            year: Number(values.dob.split("-")[0]),
                            month: Number(values.dob.split("-")[1]),
                            day: Number(values.dob.split("-")[2]),
                        },
                        gender: values.gender === "1",
                    });

                    dispatch(
                        updateUserProfile({
                            name: values.name,
                            dateOfBirth: {
                                year: Number(values.dob.split("-")[0]),
                                month: Number(values.dob.split("-")[1]),
                                day: Number(values.dob.split("-")[2]),
                            },
                            gender: values.gender === "1",
                        })
                    );
                }

                if (coverImg && coverImg instanceof File) {
                    const formData = new FormData();
                    formData.append("file", coverImg);
                    await updateCoverImage(formData);
                    dispatch(
                        updateUserProfile({
                            coverImage: URL.createObjectURL(coverImg),
                        })
                    );
                }

                if (avatar && avatar instanceof File) {
                    const formData = new FormData();
                    formData.append("file", avatar);
                    const response = await updateAvatar(formData);
                    dispatch(setAvatarProfile(response.avatar));
                }

                handleOnOpenChange();
            } catch (error) {
                toast({
                    variant: "error",
                    title: t("error.errorOccurred"),
                });
            } finally {
                dispatch(setLoading(false));
            }
        },
        [
            avatar,
            coverImg,
            defaultValues,
            dispatch,
            handleOnOpenChange,
            t,
            toast,
            updateAvatar,
            updateCoverImage,
            updateProfile,
        ]
    );

    return (
        <Dialog open={visible} onOpenChange={handleOnOpenChange}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>{t("common.updateProfile")}</DialogTitle>
                </DialogHeader>
                <UploadCoverImage coverImg={coverImg} setCoverImg={setCoverImg} />
                <UploadAvatar avatar={user?.avatar || null} setAvatar={setAvatar} />
                <UpdateProfileForm onSubmit={handleSubmit} userProfile={defaultValues} />

                <DialogFooter>
                    <Button variant="outline" onClick={onCancel}>
                        {t("common.cancel")}
                    </Button>
                    <Button type="submit" form="update-profile-form" disabled={isLoading}>
                        {isLoading ? (
                            <Loader2 className="animate-spin h-5 w-5" />
                        ) : (
                            t("common.confirm")
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default memo(UpdateProfileDialog);
