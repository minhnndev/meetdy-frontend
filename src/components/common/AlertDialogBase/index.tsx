import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useTranslation } from "react-i18next";

interface AlertDialogBaseProps {
    title: string;
    description: string;
    textAction?: string;
    onAction: () => void;
    textCancel?: string;
    onCancel?: () => void;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

function AlertDialogBase({
    title,
    description,
    textAction,
    onAction,
    textCancel,
    onCancel,
    open,
    onOpenChange,
}: AlertDialogBaseProps) {
    const { t } = useTranslation();
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>{description}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    {onCancel && (
                        <AlertDialogCancel onClick={onCancel}>
                            {textCancel || t("common.cancel")}
                        </AlertDialogCancel>
                    )}
                    <AlertDialogAction onClick={onAction}>
                        {textAction || t("common.confirm")}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default AlertDialogBase;
