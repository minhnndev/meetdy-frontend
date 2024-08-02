import { AvatarSize } from "@douyinfe/semi-ui/lib/es/avatar";

export const convertAvatarSize = (size?: number): AvatarSize => {
    switch (true) {
        case size < 12: return 'extra-extra-small';
        case size < 20: return 'extra-small';
        case size < 24: return 'small';
        case size < 32: return 'medium';
        case size < 42: return 'large';
        default: return 'default';
    }
};