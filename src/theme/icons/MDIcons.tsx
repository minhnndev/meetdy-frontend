import { 
    IconArrowLeft,
    IconHash,
    IconIndentLeft, 
    IconIndentRight, 
    IconSize,
    IconUser,
    IconUserGroup
} from "@douyinfe/semi-icons"

type IconProps = {
    color?: string,
    size?: IconSize
}

export const IcCloseDrawer = (props: IconProps) => <IconIndentLeft style={{ color: props.color }} size={ props.size ? props.size : 'default' }/>
export const IcOpenDrawer = (props: IconProps) => <IconIndentRight style={{ color: props.color }} size={ props.size ? props.size : 'default' }/>
export const IcDefaultUser = (props: IconProps) => <IconUser style={{ color: props.color }} size={ props.size ? props.size : 'default' }/>
export const IcUserAddGroup = (props: IconProps) => <IconUserGroup style={{ color: props.color }} size={ props.size ? props.size : 'default' }/>
export const IcBack = (props: IconProps) => <IconArrowLeft style={{ color: props.color }} size={ props.size ? props.size : 'default' }/>
export const IcChannel = (props: IconProps) => <IconHash style={{ color: props.color }} size={ props.size ? props.size : 'default' }/>

const MDIcons = {
    IcCloseDrawer,
    IcOpenDrawer,
    IcDefaultUser,
    IcUserAddGroup,
    IcBack,
    IcChannel
}

export default MDIcons;