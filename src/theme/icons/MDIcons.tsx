import { 
    IconAlertCircle,
    IconAlignLeft,
    IconAppCenter,
    IconArrowLeft,
    IconCamera,
    IconCheckboxTick,
    IconChevronDown,
    IconChevronLeft,
    IconClose,
    IconComment,
    IconCustomize,
    IconDelete,
    IconDoubleChevronLeft,
    IconEdit,
    IconEmoji,
    IconExit,
    IconHash,
    IconHelpCircle,
    IconImage,
    IconIndentLeft, 
    IconIndentRight, 
    IconInfoCircle, 
    IconKey, 
    IconLock, 
    IconPlus, 
    IconPriceTag, 
    IconSearch, 
    IconSetting, 
    IconSize,
    IconStar,
    IconUser,
    IconUserAdd,
    IconUserGroup,
    IconVideo,
} from "@douyinfe/semi-icons"

import {
    IconTag
} from "@douyinfe/semi-icons-lab"

type IconProps = {
    color?: string,
    size?: IconSize,
    style?: React.CSSProperties
}

export const IcCloseDefault = (props: IconProps) => <IconClose style={{ color: props.color, ...props.style }} size={ props.size ? props.size : 'default' }/>
export const IcCloseDrawer = (props: IconProps) => <IconIndentLeft style={{ color: props.color, ...props.style }} size={ props.size ? props.size : 'default' }/>
export const IcOpenDrawer = (props: IconProps) => <IconIndentRight style={{ color: props.color, ...props.style }} size={ props.size ? props.size : 'default' }/>
export const IcUserDefault = (props: IconProps) => <IconUser style={{ color: props.color, ...props.style }} size={ props.size ? props.size : 'default' }/>
export const IcUserAddGroup = (props: IconProps) => <IconCustomize style={{ color: props.color, ...props.style }} size={ props.size ? props.size : 'default' }/>
export const IcAddGroup = (props: IconProps) => <IconCustomize style={{ color: props.color, ...props.style }} size={ props.size ? props.size : 'default' }/>
export const IcAddUser = (props: IconProps) => <IconUserAdd style={{ color: props.color, ...props.style }} size={ props.size ? props.size : 'default' }/>
export const IcBack = (props: IconProps) => <IconArrowLeft style={{ color: props.color, ...props.style }} size={ props.size ? props.size : 'default' }/>
export const IcChannel = (props: IconProps) => <IconHash style={{ color: props.color, ...props.style }} size={ props.size ? props.size : 'default' }/>
export const IcLogout = (props: IconProps) => <IconExit style={{ color: props.color, ...props.style }} size={ props.size ? props.size : 'default' }/>
export const IcListConversations = (props: IconProps) => <IconComment style={{ color: props.color, ...props.style }} size={ props.size ? props.size : 'default' }/>
export const IcListFriends = (props: IconProps) => <IconUserGroup style={{ color: props.color, ...props.style }} size={ props.size ? props.size : 'default' }/>
export const IcLock = (props: IconProps) => <IconLock style={{ color: props.color, ...props.style }} size={ props.size ? props.size : 'default' }/>
export const IcSolution = (props: IconProps) => <IconStar style={{ color: props.color, ...props.style }} size={ props.size ? props.size : 'default' }/>
export const IcSetting = (props: IconProps) => <IconSetting style={{ color: props.color, ...props.style }} size={ props.size ? props.size : 'default' }/>
export const IcWarning = (props: IconProps) => <IconAlertCircle style={{ color: props.color, ...props.style }} size={ props.size ? props.size : 'default' }/>
export const IcHelper = (props: IconProps) => <IconHelpCircle style={{ color: props.color, ...props.style }} size={ props.size ? props.size : 'default' }/>
export const IcInfo = (props: IconProps) => <IconInfoCircle style={{ color: props.color, ...props.style }} size={ props.size ? props.size : 'default' }/>
export const IcEdit = (props: IconProps) => <IconEdit style={{ color: props.color, ...props.style }} size={ props.size ? props.size : 'default' }/> 
export const IcImage = (props: IconProps) => <IconImage style={{ color: props.color, ...props.style }} size={ props.size ? props.size : 'default' }/> 
export const IcPlayVideo = (props: IconProps) => <IconVideo style={{ color: props.color, ...props.style }} size={ props.size ? props.size : 'default' }/> 
export const IcPin = (props: IconProps) => <IconCheckboxTick style={{ color: props.color, ...props.style }} size={ props.size ? props.size : 'default' }/>
export const IcSmile = (props: IconProps) => <IconEmoji style={{ color: props.color, ...props.style }} size={ props.size ? props.size : 'default' }/>
export const IcDelete = (props: IconProps) => <IconDelete style={{ color: props.color, ...props.style }} size={ props.size ? props.size : 'default' }/>
export const IcKey = (props: IconProps) => <IconKey style={{ color: props.color, ...props.style }} size={ props.size ? props.size : 'default' }/>
export const IcSearch = (props: IconProps) => <IconSearch style={{ color: props.color, ...props.style }} size={ props.size ? props.size : 'default' }/>
export const IcTag = (props: IconProps) => <IconPriceTag style={{ color: props.color, ...props.style }} size={ props.size ? props.size : 'default' }/>
export const IcTagColor = (props: IconProps) => <IconTag style={{ color: props.color, ...props.style }} size={ props.size ? props.size : 'default' }/>
export const IcLeft = (props: IconProps) => <IconChevronLeft style={{ color: props.color, ...props.style }} size={ props.size ? props.size : 'default' }/>
export const IcDoubleLeft = (props: IconProps) => <IconDoubleChevronLeft style={{ color: props.color, ...props.style }} size={ props.size ? props.size : 'default' }/>
export const IcPlus = (props: IconProps) => <IconPlus style={{ color: props.color, ...props.style }} size={ props.size ? props.size : 'default' }/>
export const IcCamera = (props: IconProps) => <IconCamera style={{ color: props.color, ...props.style }} size={ props.size ? props.size : 'default' }/>
export const IcApp = (props: IconProps) => <IconAppCenter style={{ color: props.color, ...props.style }} size={ props.size ? props.size : 'default' }/>
export const IcAlignLeft = (props: IconProps) => <IconAlignLeft style={{ color: props.color, ...props.style }} size={ props.size ? props.size : 'default' }/>
export const IcDown = (props: IconProps) => <IconChevronDown style={{ color: props.color, ...props.style }} size={ props.size ? props.size : 'default' }/>

const MDIcons = {
    IcCloseDrawer,
    IcOpenDrawer,
    IcUserDefault,
    IcUserAddGroup,
    IcBack,
    IcChannel,
    IcLogout,
    IcListConversations,
    IcLock,
    IcSolution,
    IcSetting,
    IcWarning,
    IcHelper
}

export default MDIcons;