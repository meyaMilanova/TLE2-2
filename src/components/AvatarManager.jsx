import React, { useState } from 'react';

// Normal avatar imports
import avatar1 from '/src/assets/images/avatars-profiel/blond-hair-girl-avatar-p.png';
import avatar2 from '/src/assets/images/avatars-profiel/ginger-hair-girl-avatar-p.png';
import avatar3 from '/src/assets/images/avatars-profiel/grey-tshirt-girl-avatar-p.png';
import avatar4 from '/src/assets/images/avatars-profiel/pink-hair-avatar-p.png';
import avatar5 from '/src/assets/images/avatars-profiel/yellow-purple-shirt-avatar-p.png';
import avatar6 from '/src/assets/images/avatars-profiel/pink-tshirt-avatar-p.png';
import avatar7 from '/src/assets/images/avatars-profiel/orange-tshirt-boy-avatar-p.png';
import avatar8 from '/src/assets/images/avatars-profiel/ginger-hair-boy-avatar-p.png';
import avatar9 from '/src/assets/images/avatars-profiel/light-blue-boy-avatar-p.png';
import avatar10 from '/src/assets/images/avatars-profiel/red-shirt-boy-avatar-p.png';
import avatar11 from '/src/assets/images/avatars-profiel/blue-hat-avatar-p.png';
import avatar12 from '/src/assets/images/avatars-profiel/red-hat-avatar-p.png';

// 1.png avatar imports
import avatar1Alt from '/src/assets/images/avatars-profiel/blond-hair-girl-avatar.png';
import avatar2Alt from '/src/assets/images/avatars-profiel/ginger-hair-girl-avatar.png';
import avatar3Alt from '/src/assets/images/avatars-profiel/grey-tshirt-girl-avatar.png';
import avatar4Alt from '/src/assets/images/avatars-profiel/pink-hair-avatar.png';
import avatar5Alt from '/src/assets/images/avatars-profiel/yellow-purple-shirt-avatar.png';
import avatar6Alt from '/src/assets/images/avatars-profiel/pink-tshirt-avatar.png';
import avatar7Alt from '/src/assets/images/avatars-profiel/orange-tshirt-boy-avatar.png';
import avatar8Alt from '/src/assets/images/avatars-profiel/ginger-hair-boy-avatar.png';
import avatar9Alt from '/src/assets/images/avatars-profiel/light-blue-boy-avatar.png';
import avatar10Alt from '/src/assets/images/avatars-profiel/red-shirt-boy-avatar.png';
import avatar11Alt from '/src/assets/images/avatars-profiel/blue-hat-avatar.png';
import avatar12Alt from '/src/assets/images/avatars-profiel/red-hat-avatar.png';

const characters = [
    { id: 1, default: avatar1, alt: avatar1Alt, useAlt: false },
    { id: 2, default: avatar2, alt: avatar2Alt, useAlt: false },
    { id: 3, default: avatar3, alt: avatar3Alt, useAlt: false },
    { id: 4, default: avatar4, alt: avatar4Alt, useAlt: false },
    { id: 5, default: avatar5, alt: avatar5Alt, useAlt: false },
    { id: 6, default: avatar6, alt: avatar6Alt, useAlt: false },
    { id: 7, default: avatar7, alt: avatar7Alt, useAlt: false },
    { id: 8, default: avatar8, alt: avatar8Alt, useAlt: false },
    { id: 9, default: avatar9, alt: avatar9Alt, useAlt: false },
    { id: 10, default: avatar10, alt: avatar10Alt, useAlt: false },
    { id: 11, default: avatar11, alt: avatar11Alt, useAlt: false },
    { id: 12, default: avatar12, alt: avatar12Alt, useAlt: false },
];

export default characters

/*
export function useAvatarManager() {
    const [avatarStates, setAvatarStates] = useState(characters);

    const toggleAvatar = (id) => {
        setAvatarStates((prev) =>
            prev.map((avatar) =>
                avatar.id === id ? { ...avatar, useAlt: !avatar.useAlt } : avatar
            )
        );
    };

    const getAvatar = (id) => {
        const avatar = avatarStates.find((avatar) => avatar.id === id);
        return avatar?.useAlt ? avatar.alt : avatar.default;
    };

    return { avatarStates, toggleAvatar, getAvatar };
}


 */