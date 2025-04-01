import * as S from './Sidebar.style';
import { useProfileStore } from '@/stores/profileStore';
import { useState } from 'react';
import emptyProfile from '@/assets/images/emptyProfile.svg';
const Profile = () => {
  const { profile } = useProfileStore();
  const [avatarSrc, setAvatarSrc] = useState(profile.profileUrl);
  return (
    <S.ProfileLayout>
      <div className="avartar">
        <S.ProfileAvatar
          alt="police avatar"
          src={avatarSrc || emptyProfile}
          onError={() => {
            if (avatarSrc !== emptyProfile) {
              setAvatarSrc(emptyProfile);
            }
          }}
        />
      </div>
      <S.InfoDiv>
        <div>
          <S.InfoText type="name">{profile.name}</S.InfoText>
          <S.InfoText type="rank">{profile.rank}</S.InfoText>
        </div>
        <S.InfoText type="officeName">{profile.officeName}</S.InfoText>
      </S.InfoDiv>
    </S.ProfileLayout>
  );
};

export default Profile;
