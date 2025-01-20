import AvatarBase from "@/components/common/AvatarBase";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAppSelector } from "@/redux/store";
import { Users, X } from "lucide-react";
import { memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const CreateGroupDialog = () => {
    const { t } = useTranslation();
    const { friends } = useAppSelector((state) => state.friend);
    const [friendList, setFriendList] = useState<any[]>([]);

    useEffect(() => {
        setFriendList(
            friends?.map((friend) => ({
                id: friend._id,
                name: friend.name,
                avatar: friend.avatar,
                avatarColor: friend.avatarColor,
                selected: false,
            }))
        );
    }, [friends]);

    const toggleSelection = (id: string) => {
        setFriendList((prevList) =>
            prevList.map((friend) =>
                friend.id === id ? { ...friend, selected: !friend.selected } : friend
            )
        );
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size="icon" variant="ghost">
                    <Users />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[650px] w-full">
                <DialogHeader>
                    <DialogTitle>{t("common.createGroup")}</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <Input
                        id="groupName"
                        placeholder={t("form.placeholder.groupName")}
                        className="col-span-full"
                    />

                    <div className="flex flex-col sm:flex-row border rounded-md divide-y sm:divide-y-0 sm:divide-x divide-border">
                        <div className="sm:w-1/2 w-full flex flex-col min-h-[300px] max-h-[400px]">
                            <div className="p-2 flex-shrink-0">
                                <Input
                                    id="username"
                                    placeholder={t("form.placeholder.search")}
                                    className="mb-2"
                                />
                            </div>
                            <ScrollArea className="flex-grow min-h-0">
                                <div className="p-2 space-y-2">
                                    {friendList.map((friend) => (
                                        <label
                                            key={friend.id}
                                            className="flex items-center justify-between p-2 hover:bg-secondary rounded-md cursor-pointer"
                                        >
                                            <div className="flex items-center gap-2">
                                                <Checkbox
                                                    checked={friend.selected}
                                                    onCheckedChange={() =>
                                                        toggleSelection(friend.id)
                                                    }
                                                />
                                                <AvatarBase src={friend.avatar} alt={friend.name} />
                                                <span className="truncate">{friend.name}</span>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </ScrollArea>
                        </div>
                        <div className="sm:w-1/2 w-full flex flex-col min-h-[300px] max-h-[400px]">
                            <div className="p-2 flex-shrink-0">
                                <h3 className="text-sm font-medium mb-2">{t("common.choosen")}</h3>
                            </div>
                            <ScrollArea className="flex-grow min-h-0">
                                <div className="p-2 space-y-2">
                                    {friendList
                                        .filter((friend) => friend.selected)
                                        .map((friend) => (
                                            <div
                                                key={friend.id}
                                                className="flex items-center justify-between p-2 hover:bg-secondary rounded-md"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <AvatarBase
                                                        src={friend.avatar}
                                                        alt={friend.name}
                                                    />
                                                    <span className="truncate">{friend.name}</span>
                                                </div>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => toggleSelection(friend.id)}
                                                >
                                                    <X />
                                                </Button>
                                            </div>
                                        ))}
                                </div>
                            </ScrollArea>
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button type="button" variant="ghost">
                        {t("common.cancel")}
                    </Button>
                    <Button type="submit">{t("common.createGroup")}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default memo(CreateGroupDialog);
