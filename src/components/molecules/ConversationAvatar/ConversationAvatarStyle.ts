const COVERSATION_STYLE = {
    styleGroup3: (demension) => {
        return {
            position: 'relative',
            left: '70%',
            transform: 'translateX(0%)',
            marginTop: (demension / 6) * -11.5,
        };
    },


    styleGroup2: {
        display: 'flex',
        alignItems: 'center',
    },

    friendCardAvatar: (size) => {
        const demesion = size * 2 - 8;
        return {
            display: `flex`,
            height: `${demesion}px`,
            width: `${demesion}px`,
        };
    },

    friendCardAvatarMixStyle2: (size) => {
        const demesion = size * 2 - 8;
        return {
            display: 'flex',
            alignItems: 'center',
            height: `${demesion}px`,
            width: `${demesion}px`,
        };
    },
};

export default COVERSATION_STYLE;
