import * as S from './Sidebar.style';
import { useProfileStore } from '@/stores/profileStore';
const Profile = () => {
  const { profile } = useProfileStore();
  return (
    <S.ProfileLayout>
      <div>
        <S.InfoText type="name">{profile.name}</S.InfoText>
        <S.InfoText type="rank">{profile.rank}</S.InfoText>
      </div>
      <S.InfoText type="officeName">{profile.officeName}</S.InfoText>
    </S.ProfileLayout>
  );
};

export default Profile;
